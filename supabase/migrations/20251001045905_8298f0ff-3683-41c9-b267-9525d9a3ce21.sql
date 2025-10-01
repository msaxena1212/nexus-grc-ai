-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE app_role AS ENUM (
  'super_admin',
  'global_grc_director',
  'regional_grc_manager',
  'environmental_compliance_officer',
  'product_stewardship_manager',
  'chemical_safety_specialist',
  'regulatory_affairs_manager',
  'site_manager',
  'plant_safety_coordinator',
  'quality_assurance_lead',
  'ehs_officer',
  'production_supervisor',
  'operator_technician',
  'rd_manager',
  'formulation_chemist',
  'analytical_chemist',
  'product_developer',
  'external_auditor',
  'environmental_auditor',
  'safety_auditor',
  'regulatory_compliance_auditor'
);

CREATE TYPE risk_category AS ENUM (
  'environmental',
  'chemical',
  'product',
  'supply_chain',
  'operational',
  'regulatory'
);

CREATE TYPE risk_status AS ENUM (
  'identified',
  'assessing',
  'assessed',
  'mitigating',
  'monitoring',
  'closed'
);

CREATE TYPE risk_probability AS ENUM (
  'very_low',
  'low',
  'medium',
  'high',
  'very_high'
);

CREATE TYPE risk_impact AS ENUM (
  'negligible',
  'minor',
  'moderate',
  'major',
  'critical'
);

CREATE TYPE compliance_framework AS ENUM (
  'sox',
  'gdpr',
  'iso_27001',
  'iso_14001',
  'osha',
  'epa',
  'reach',
  'tsca',
  'ghs'
);

CREATE TYPE compliance_status AS ENUM (
  'compliant',
  'non_compliant',
  'partially_compliant',
  'not_assessed',
  'in_progress'
);

CREATE TYPE audit_status AS ENUM (
  'planned',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE incident_severity AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);

CREATE TYPE incident_status AS ENUM (
  'reported',
  'investigating',
  'resolved',
  'closed'
);

CREATE TYPE litigation_priority AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);

CREATE TYPE litigation_status AS ENUM (
  'filed',
  'discovery',
  'pre_trial',
  'trial',
  'settled',
  'closed'
);

CREATE TYPE policy_status AS ENUM (
  'draft',
  'under_review',
  'approved',
  'active',
  'archived'
);

-- Organizations table (multi-org hierarchy)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  parent_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  organization_type TEXT NOT NULL, -- 'parent', 'regional', 'site'
  description TEXT,
  country TEXT,
  region TEXT,
  address TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  department TEXT,
  job_title TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table (RBAC)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, organization_id, role)
);

-- Risks table
CREATE TABLE risks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category risk_category NOT NULL,
  status risk_status DEFAULT 'identified',
  probability risk_probability,
  impact risk_impact,
  inherent_risk_score INTEGER,
  residual_risk_score INTEGER,
  owner_id UUID REFERENCES auth.users(id),
  mitigation_plan TEXT,
  review_date DATE,
  identified_date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Risk assessments table
CREATE TABLE risk_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  risk_id UUID REFERENCES risks(id) ON DELETE CASCADE NOT NULL,
  assessor_id UUID REFERENCES auth.users(id) NOT NULL,
  assessment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  findings TEXT,
  recommendations TEXT,
  probability risk_probability,
  impact risk_impact,
  risk_score INTEGER,
  status TEXT DEFAULT 'in_progress',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance framework table
CREATE TABLE compliance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  framework compliance_framework NOT NULL,
  control_name TEXT NOT NULL,
  control_description TEXT,
  testing_procedure TEXT,
  frequency TEXT,
  criticality TEXT,
  owner_id UUID REFERENCES auth.users(id),
  department TEXT,
  status compliance_status DEFAULT 'not_assessed',
  last_assessment_date DATE,
  next_assessment_date DATE,
  findings TEXT,
  evidence_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audits table
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  audit_type TEXT NOT NULL,
  scope TEXT,
  objectives TEXT,
  start_date DATE,
  end_date DATE,
  lead_auditor_id UUID REFERENCES auth.users(id),
  status audit_status DEFAULT 'planned',
  budget DECIMAL(15, 2),
  risk_rating TEXT,
  findings_summary TEXT,
  recommendations TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit team assignments
CREATE TABLE audit_team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  audit_id UUID REFERENCES audits(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(audit_id, user_id)
);

-- Litigation table
CREATE TABLE litigation_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  case_number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority litigation_priority DEFAULT 'medium',
  status litigation_status DEFAULT 'filed',
  jurisdiction TEXT,
  court_name TEXT,
  filing_date DATE,
  trial_date DATE,
  estimated_cost DECIMAL(15, 2),
  actual_cost DECIMAL(15, 2),
  counsel_id UUID REFERENCES auth.users(id),
  outcome TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policies table
CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  version TEXT,
  department_scope TEXT,
  status policy_status DEFAULT 'draft',
  owner_id UUID REFERENCES auth.users(id),
  approver_id UUID REFERENCES auth.users(id),
  approval_date DATE,
  effective_date DATE,
  review_date DATE,
  acknowledgment_required BOOLEAN DEFAULT FALSE,
  document_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incidents table
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  severity incident_severity NOT NULL,
  status incident_status DEFAULT 'reported',
  impact_assessment TEXT,
  affected_systems TEXT,
  reported_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chemical management table
CREATE TABLE chemicals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  cas_number TEXT,
  chemical_name TEXT NOT NULL,
  trade_name TEXT,
  supplier TEXT,
  hazard_classification TEXT,
  voc_content DECIMAL(10, 2),
  regulatory_status TEXT,
  reach_registered BOOLEAN DEFAULT FALSE,
  tsca_listed BOOLEAN DEFAULT FALSE,
  msds_url TEXT,
  restrictions TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Environmental monitoring table
CREATE TABLE environmental_monitoring (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  monitoring_type TEXT NOT NULL, -- 'air', 'water', 'waste', 'emissions'
  measurement_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  parameter TEXT NOT NULL,
  value DECIMAL(15, 4),
  unit TEXT,
  regulatory_limit DECIMAL(15, 4),
  compliant BOOLEAN,
  location TEXT,
  notes TEXT,
  recorded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product stewardship table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  product_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_type TEXT,
  voc_content DECIMAL(10, 2),
  regulatory_approvals JSONB,
  market_regions TEXT[],
  lifecycle_stage TEXT,
  sustainability_metrics JSONB,
  steward_id UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit trail table
CREATE TABLE audit_trail (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  organization_id UUID REFERENCES organizations(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE litigation_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE chemicals ENABLE ROW LEVEL SECURITY;
ALTER TABLE environmental_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_trail ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to get user organization
CREATE OR REPLACE FUNCTION public.get_user_organization(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id
  FROM public.profiles
  WHERE id = _user_id
  LIMIT 1
$$;

-- RLS Policies for organizations
CREATE POLICY "Users can view their organization and children"
  ON organizations FOR SELECT
  USING (
    id = get_user_organization(auth.uid())
    OR parent_id = get_user_organization(auth.uid())
    OR has_role(auth.uid(), 'super_admin')
  );

CREATE POLICY "Admins can manage organizations"
  ON organizations FOR ALL
  USING (has_role(auth.uid(), 'super_admin') OR has_role(auth.uid(), 'global_grc_director'));

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their organization"
  ON profiles FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()) OR id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Admins can manage profiles"
  ON profiles FOR ALL
  USING (has_role(auth.uid(), 'super_admin') OR has_role(auth.uid(), 'global_grc_director'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view roles in their organization"
  ON user_roles FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()) OR user_id = auth.uid());

CREATE POLICY "Admins can manage roles"
  ON user_roles FOR ALL
  USING (has_role(auth.uid(), 'super_admin') OR has_role(auth.uid(), 'global_grc_director'));

-- RLS Policies for risks
CREATE POLICY "Users can view risks in their organization"
  ON risks FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Users can create risks in their organization"
  ON risks FOR INSERT
  WITH CHECK (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Risk owners can update their risks"
  ON risks FOR UPDATE
  USING (owner_id = auth.uid() OR has_role(auth.uid(), 'regional_grc_manager'));

-- RLS Policies for risk_assessments
CREATE POLICY "Assessors can view their assessments"
  ON risk_assessments FOR SELECT
  USING (assessor_id = auth.uid() OR has_role(auth.uid(), 'regional_grc_manager'));

CREATE POLICY "Assessors can create assessments"
  ON risk_assessments FOR INSERT
  WITH CHECK (assessor_id = auth.uid());

CREATE POLICY "Assessors can update their assessments"
  ON risk_assessments FOR UPDATE
  USING (assessor_id = auth.uid());

-- RLS Policies for compliance_records
CREATE POLICY "Users can view compliance in their organization"
  ON compliance_records FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Compliance officers can manage records"
  ON compliance_records FOR ALL
  USING (
    organization_id = get_user_organization(auth.uid())
    AND (has_role(auth.uid(), 'environmental_compliance_officer') OR has_role(auth.uid(), 'regional_grc_manager'))
  );

-- RLS Policies for audits
CREATE POLICY "Users can view audits in their organization"
  ON audits FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Audit managers can create audits"
  ON audits FOR INSERT
  WITH CHECK (
    organization_id = get_user_organization(auth.uid())
    AND has_role(auth.uid(), 'regional_grc_manager')
  );

CREATE POLICY "Lead auditors can update their audits"
  ON audits FOR UPDATE
  USING (lead_auditor_id = auth.uid() OR has_role(auth.uid(), 'regional_grc_manager'));

-- RLS Policies for audit_team_members
CREATE POLICY "Team members can view their audit assignments"
  ON audit_team_members FOR SELECT
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'regional_grc_manager'));

CREATE POLICY "Managers can assign audit teams"
  ON audit_team_members FOR ALL
  USING (has_role(auth.uid(), 'regional_grc_manager'));

-- RLS Policies for litigation_cases
CREATE POLICY "Users can view litigation in their organization"
  ON litigation_cases FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Managers can manage litigation"
  ON litigation_cases FOR ALL
  USING (
    organization_id = get_user_organization(auth.uid())
    AND has_role(auth.uid(), 'regional_grc_manager')
  );

-- RLS Policies for policies
CREATE POLICY "Users can view policies in their organization"
  ON policies FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Managers can manage policies"
  ON policies FOR ALL
  USING (
    organization_id = get_user_organization(auth.uid())
    AND has_role(auth.uid(), 'regional_grc_manager')
  );

-- RLS Policies for incidents
CREATE POLICY "Users can view incidents in their organization"
  ON incidents FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Users can report incidents"
  ON incidents FOR INSERT
  WITH CHECK (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Assigned users can update incidents"
  ON incidents FOR UPDATE
  USING (assigned_to = auth.uid() OR has_role(auth.uid(), 'ehs_officer'));

-- RLS Policies for chemicals
CREATE POLICY "Users can view chemicals in their organization"
  ON chemicals FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Chemical specialists can manage chemicals"
  ON chemicals FOR ALL
  USING (
    organization_id = get_user_organization(auth.uid())
    AND (has_role(auth.uid(), 'chemical_safety_specialist') OR has_role(auth.uid(), 'formulation_chemist'))
  );

-- RLS Policies for environmental_monitoring
CREATE POLICY "Users can view environmental data in their organization"
  ON environmental_monitoring FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "EHS officers can manage environmental data"
  ON environmental_monitoring FOR ALL
  USING (
    organization_id = get_user_organization(auth.uid())
    AND (has_role(auth.uid(), 'ehs_officer') OR has_role(auth.uid(), 'environmental_compliance_officer'))
  );

-- RLS Policies for products
CREATE POLICY "Users can view products in their organization"
  ON products FOR SELECT
  USING (organization_id = get_user_organization(auth.uid()));

CREATE POLICY "Product stewards can manage products"
  ON products FOR ALL
  USING (
    organization_id = get_user_organization(auth.uid())
    AND (has_role(auth.uid(), 'product_stewardship_manager') OR has_role(auth.uid(), 'product_developer'))
  );

-- RLS Policies for audit_trail
CREATE POLICY "Admins can view audit trail"
  ON audit_trail FOR SELECT
  USING (
    has_role(auth.uid(), 'super_admin')
    OR has_role(auth.uid(), 'global_grc_director')
  );

CREATE POLICY "System can insert audit trail"
  ON audit_trail FOR INSERT
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_organizations_parent ON organizations(parent_id);
CREATE INDEX idx_profiles_organization ON profiles(organization_id);
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_organization ON user_roles(organization_id);
CREATE INDEX idx_risks_organization ON risks(organization_id);
CREATE INDEX idx_risks_owner ON risks(owner_id);
CREATE INDEX idx_risk_assessments_risk ON risk_assessments(risk_id);
CREATE INDEX idx_compliance_organization ON compliance_records(organization_id);
CREATE INDEX idx_audits_organization ON audits(organization_id);
CREATE INDEX idx_audit_team_audit ON audit_team_members(audit_id);
CREATE INDEX idx_litigation_organization ON litigation_cases(organization_id);
CREATE INDEX idx_policies_organization ON policies(organization_id);
CREATE INDEX idx_incidents_organization ON incidents(organization_id);
CREATE INDEX idx_chemicals_organization ON chemicals(organization_id);
CREATE INDEX idx_environmental_organization ON environmental_monitoring(organization_id);
CREATE INDEX idx_products_organization ON products(organization_id);
CREATE INDEX idx_audit_trail_user ON audit_trail(user_id);
CREATE INDEX idx_audit_trail_entity ON audit_trail(entity_type, entity_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_risks_updated_at BEFORE UPDATE ON risks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_updated_at BEFORE UPDATE ON compliance_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audits_updated_at BEFORE UPDATE ON audits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_litigation_updated_at BEFORE UPDATE ON litigation_cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON policies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chemicals_updated_at BEFORE UPDATE ON chemicals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();