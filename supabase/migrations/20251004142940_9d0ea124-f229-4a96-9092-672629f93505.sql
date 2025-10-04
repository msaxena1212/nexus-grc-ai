-- Update RLS policies for audits to allow proper access

-- Drop existing policies
DROP POLICY IF EXISTS "Audit managers can create audits" ON public.audits;
DROP POLICY IF EXISTS "Lead auditors can update their audits" ON public.audits;
DROP POLICY IF EXISTS "Users can view audits in their organization" ON public.audits;
DROP POLICY IF EXISTS "Audit managers and auditors can create audits" ON public.audits;
DROP POLICY IF EXISTS "Audit managers and lead auditors can update audits" ON public.audits;

-- Recreate policies with proper permissions
CREATE POLICY "Users can create audits in their organization"
ON public.audits
FOR INSERT
TO authenticated
WITH CHECK (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Lead auditors and managers can update audits"
ON public.audits
FOR UPDATE
TO authenticated
USING (
  lead_auditor_id = auth.uid() 
  OR has_role(auth.uid(), 'regional_grc_manager'::app_role)
  OR has_role(auth.uid(), 'global_grc_director'::app_role)
);

CREATE POLICY "Users can view audits in their organization"
ON public.audits
FOR SELECT
TO authenticated
USING (organization_id = get_user_organization(auth.uid()));

-- Update audit team members policies
DROP POLICY IF EXISTS "Managers can assign audit teams" ON public.audit_team_members;
DROP POLICY IF EXISTS "Team members can view their audit assignments" ON public.audit_team_members;
DROP POLICY IF EXISTS "Audit managers can assign teams" ON public.audit_team_members;
DROP POLICY IF EXISTS "Users can view audit assignments" ON public.audit_team_members;

CREATE POLICY "Managers can manage audit teams"
ON public.audit_team_members
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'regional_grc_manager'::app_role)
  OR has_role(auth.uid(), 'global_grc_director'::app_role)
);

CREATE POLICY "Users can view relevant audit assignments"
ON public.audit_team_members
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() 
  OR has_role(auth.uid(), 'regional_grc_manager'::app_role)
  OR has_role(auth.uid(), 'global_grc_director'::app_role)
);