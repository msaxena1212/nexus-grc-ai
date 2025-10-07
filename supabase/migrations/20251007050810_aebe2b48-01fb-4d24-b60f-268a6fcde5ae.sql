-- Create role permissions table to manage feature access per role
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role app_role NOT NULL,
  feature_key TEXT NOT NULL,
  can_view BOOLEAN DEFAULT false,
  can_create BOOLEAN DEFAULT false,
  can_update BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(role, feature_key)
);

-- Enable RLS
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage role permissions"
ON public.role_permissions
FOR ALL
USING (has_role(auth.uid(), 'super_admin') OR has_role(auth.uid(), 'global_grc_director'));

CREATE POLICY "Users can view permissions for their role"
ON public.role_permissions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND user_roles.role = role_permissions.role
  )
);

-- Insert default permissions for regional_grc_manager role (acts as auditor)
INSERT INTO public.role_permissions (role, feature_key, can_view, can_create, can_update, can_delete) VALUES
('regional_grc_manager', 'audits', true, true, true, false),
('regional_grc_manager', 'audit_logs', true, true, true, false),
('regional_grc_manager', 'audit_findings', true, true, true, false),
('regional_grc_manager', 'risks', true, true, true, false),
('regional_grc_manager', 'compliance', true, true, true, false),
('regional_grc_manager', 'analytics', true, false, false, false),
('regional_grc_manager', 'incidents', true, false, false, false),
('regional_grc_manager', 'policies', true, false, false, false),
('regional_grc_manager', 'litigation', true, false, false, false),
('regional_grc_manager', 'chemicals', false, false, false, false),
('regional_grc_manager', 'products', false, false, false, false),
('regional_grc_manager', 'environmental', false, false, false, false),
('regional_grc_manager', 'organizations', false, false, false, false),
('regional_grc_manager', 'users', false, false, false, false);

-- Function to check if user has permission for a feature
CREATE OR REPLACE FUNCTION public.has_feature_permission(
  _user_id UUID,
  _feature_key TEXT,
  _permission_type TEXT -- 'view', 'create', 'update', 'delete'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_role app_role;
  _has_permission BOOLEAN;
BEGIN
  -- Get user's role
  SELECT role INTO _user_role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1;

  -- Super admins have all permissions
  IF _user_role = 'super_admin' OR _user_role = 'global_grc_director' THEN
    RETURN true;
  END IF;

  -- Check specific permission
  CASE _permission_type
    WHEN 'view' THEN
      SELECT can_view INTO _has_permission
      FROM public.role_permissions
      WHERE role = _user_role AND feature_key = _feature_key;
    WHEN 'create' THEN
      SELECT can_create INTO _has_permission
      FROM public.role_permissions
      WHERE role = _user_role AND feature_key = _feature_key;
    WHEN 'update' THEN
      SELECT can_update INTO _has_permission
      FROM public.role_permissions
      WHERE role = _user_role AND feature_key = _feature_key;
    WHEN 'delete' THEN
      SELECT can_delete INTO _has_permission
      FROM public.role_permissions
      WHERE role = _user_role AND feature_key = _feature_key;
    ELSE
      RETURN false;
  END CASE;

  RETURN COALESCE(_has_permission, false);
END;
$$;

-- Trigger for updated_at
CREATE TRIGGER update_role_permissions_updated_at
BEFORE UPDATE ON public.role_permissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();