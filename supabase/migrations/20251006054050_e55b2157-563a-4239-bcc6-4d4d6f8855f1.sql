-- Create audit findings table
CREATE TABLE IF NOT EXISTS public.audit_findings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid REFERENCES public.audits(id) ON DELETE CASCADE NOT NULL,
  finding_number text NOT NULL,
  title text NOT NULL,
  description text,
  severity text NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  category text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  root_cause text,
  recommendation text,
  management_response text,
  owner_id uuid,
  due_date date,
  resolution_date date,
  evidence_url text,
  organization_id uuid REFERENCES public.organizations(id) NOT NULL,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create audit logs table for tracking audit activities
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid REFERENCES public.audits(id) ON DELETE CASCADE NOT NULL,
  log_type text NOT NULL CHECK (log_type IN ('note', 'evidence', 'test_execution', 'finding', 'meeting', 'communication', 'status_change')),
  title text NOT NULL,
  description text,
  reference_id uuid,
  evidence_url text,
  test_result text,
  logged_by uuid NOT NULL,
  logged_at timestamp with time zone DEFAULT now(),
  organization_id uuid REFERENCES public.organizations(id) NOT NULL,
  metadata jsonb
);

-- Enable RLS
ALTER TABLE public.audit_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audit_findings
CREATE POLICY "Users can view findings in their organization"
  ON public.audit_findings FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Auditors can create findings"
  ON public.audit_findings FOR INSERT
  WITH CHECK (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Auditors and owners can update findings"
  ON public.audit_findings FOR UPDATE
  USING (
    organization_id = get_user_organization(auth.uid()) AND
    (owner_id = auth.uid() OR 
     has_role(auth.uid(), 'regional_grc_manager'::app_role) OR
     has_role(auth.uid(), 'global_grc_director'::app_role))
  );

-- RLS Policies for audit_logs
CREATE POLICY "Users can view audit logs in their organization"
  ON public.audit_logs FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Auditors can create audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (
    organization_id = get_user_organization(auth.uid()) AND
    logged_by = auth.uid()
  );

CREATE POLICY "Auditors can update their own logs"
  ON public.audit_logs FOR UPDATE
  USING (
    organization_id = get_user_organization(auth.uid()) AND
    logged_by = auth.uid()
  );

-- Create indexes for performance
CREATE INDEX idx_audit_findings_audit_id ON public.audit_findings(audit_id);
CREATE INDEX idx_audit_findings_status ON public.audit_findings(status);
CREATE INDEX idx_audit_logs_audit_id ON public.audit_logs(audit_id);
CREATE INDEX idx_audit_logs_logged_at ON public.audit_logs(logged_at DESC);