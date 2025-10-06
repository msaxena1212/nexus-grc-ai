export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_findings: {
        Row: {
          audit_id: string
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          evidence_url: string | null
          finding_number: string
          id: string
          management_response: string | null
          organization_id: string
          owner_id: string | null
          recommendation: string | null
          resolution_date: string | null
          root_cause: string | null
          severity: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          audit_id: string
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          evidence_url?: string | null
          finding_number: string
          id?: string
          management_response?: string | null
          organization_id: string
          owner_id?: string | null
          recommendation?: string | null
          resolution_date?: string | null
          root_cause?: string | null
          severity: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          audit_id?: string
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          evidence_url?: string | null
          finding_number?: string
          id?: string
          management_response?: string | null
          organization_id?: string
          owner_id?: string | null
          recommendation?: string | null
          resolution_date?: string | null
          root_cause?: string | null
          severity?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_findings_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_findings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          audit_id: string
          description: string | null
          evidence_url: string | null
          id: string
          log_type: string
          logged_at: string | null
          logged_by: string
          metadata: Json | null
          organization_id: string
          reference_id: string | null
          test_result: string | null
          title: string
        }
        Insert: {
          audit_id: string
          description?: string | null
          evidence_url?: string | null
          id?: string
          log_type: string
          logged_at?: string | null
          logged_by: string
          metadata?: Json | null
          organization_id: string
          reference_id?: string | null
          test_result?: string | null
          title: string
        }
        Update: {
          audit_id?: string
          description?: string | null
          evidence_url?: string | null
          id?: string
          log_type?: string
          logged_at?: string | null
          logged_by?: string
          metadata?: Json | null
          organization_id?: string
          reference_id?: string | null
          test_result?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_team_members: {
        Row: {
          assigned_at: string | null
          audit_id: string
          id: string
          role: string | null
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          audit_id: string
          id?: string
          role?: string | null
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          audit_id?: string
          id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_team_members_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_trail: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          organization_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          organization_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          organization_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_trail_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      audits: {
        Row: {
          audit_type: string
          budget: number | null
          created_at: string | null
          created_by: string | null
          end_date: string | null
          findings_summary: string | null
          id: string
          lead_auditor_id: string | null
          objectives: string | null
          organization_id: string
          recommendations: string | null
          risk_rating: string | null
          scope: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["audit_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          audit_type: string
          budget?: number | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          findings_summary?: string | null
          id?: string
          lead_auditor_id?: string | null
          objectives?: string | null
          organization_id: string
          recommendations?: string | null
          risk_rating?: string | null
          scope?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["audit_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          audit_type?: string
          budget?: number | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          findings_summary?: string | null
          id?: string
          lead_auditor_id?: string | null
          objectives?: string | null
          organization_id?: string
          recommendations?: string | null
          risk_rating?: string | null
          scope?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["audit_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audits_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      chemicals: {
        Row: {
          cas_number: string | null
          chemical_name: string
          created_at: string | null
          created_by: string | null
          hazard_classification: string | null
          id: string
          msds_url: string | null
          organization_id: string
          reach_registered: boolean | null
          regulatory_status: string | null
          restrictions: string | null
          supplier: string | null
          trade_name: string | null
          tsca_listed: boolean | null
          updated_at: string | null
          voc_content: number | null
        }
        Insert: {
          cas_number?: string | null
          chemical_name: string
          created_at?: string | null
          created_by?: string | null
          hazard_classification?: string | null
          id?: string
          msds_url?: string | null
          organization_id: string
          reach_registered?: boolean | null
          regulatory_status?: string | null
          restrictions?: string | null
          supplier?: string | null
          trade_name?: string | null
          tsca_listed?: boolean | null
          updated_at?: string | null
          voc_content?: number | null
        }
        Update: {
          cas_number?: string | null
          chemical_name?: string
          created_at?: string | null
          created_by?: string | null
          hazard_classification?: string | null
          id?: string
          msds_url?: string | null
          organization_id?: string
          reach_registered?: boolean | null
          regulatory_status?: string | null
          restrictions?: string | null
          supplier?: string | null
          trade_name?: string | null
          tsca_listed?: boolean | null
          updated_at?: string | null
          voc_content?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chemicals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_records: {
        Row: {
          control_description: string | null
          control_name: string
          created_at: string | null
          created_by: string | null
          criticality: string | null
          department: string | null
          evidence_url: string | null
          findings: string | null
          framework: Database["public"]["Enums"]["compliance_framework"]
          frequency: string | null
          id: string
          last_assessment_date: string | null
          next_assessment_date: string | null
          organization_id: string
          owner_id: string | null
          status: Database["public"]["Enums"]["compliance_status"] | null
          testing_procedure: string | null
          updated_at: string | null
        }
        Insert: {
          control_description?: string | null
          control_name: string
          created_at?: string | null
          created_by?: string | null
          criticality?: string | null
          department?: string | null
          evidence_url?: string | null
          findings?: string | null
          framework: Database["public"]["Enums"]["compliance_framework"]
          frequency?: string | null
          id?: string
          last_assessment_date?: string | null
          next_assessment_date?: string | null
          organization_id: string
          owner_id?: string | null
          status?: Database["public"]["Enums"]["compliance_status"] | null
          testing_procedure?: string | null
          updated_at?: string | null
        }
        Update: {
          control_description?: string | null
          control_name?: string
          created_at?: string | null
          created_by?: string | null
          criticality?: string | null
          department?: string | null
          evidence_url?: string | null
          findings?: string | null
          framework?: Database["public"]["Enums"]["compliance_framework"]
          frequency?: string | null
          id?: string
          last_assessment_date?: string | null
          next_assessment_date?: string | null
          organization_id?: string
          owner_id?: string | null
          status?: Database["public"]["Enums"]["compliance_status"] | null
          testing_procedure?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_records_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      environmental_monitoring: {
        Row: {
          compliant: boolean | null
          created_at: string | null
          id: string
          location: string | null
          measurement_date: string | null
          monitoring_type: string
          notes: string | null
          organization_id: string
          parameter: string
          recorded_by: string | null
          regulatory_limit: number | null
          unit: string | null
          value: number | null
        }
        Insert: {
          compliant?: boolean | null
          created_at?: string | null
          id?: string
          location?: string | null
          measurement_date?: string | null
          monitoring_type: string
          notes?: string | null
          organization_id: string
          parameter: string
          recorded_by?: string | null
          regulatory_limit?: number | null
          unit?: string | null
          value?: number | null
        }
        Update: {
          compliant?: boolean | null
          created_at?: string | null
          id?: string
          location?: string | null
          measurement_date?: string | null
          monitoring_type?: string
          notes?: string | null
          organization_id?: string
          parameter?: string
          recorded_by?: string | null
          regulatory_limit?: number | null
          unit?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "environmental_monitoring_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          affected_systems: string | null
          assigned_to: string | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          impact_assessment: string | null
          organization_id: string
          reported_at: string | null
          reported_by: string | null
          resolution_notes: string | null
          resolved_at: string | null
          severity: Database["public"]["Enums"]["incident_severity"]
          status: Database["public"]["Enums"]["incident_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          affected_systems?: string | null
          assigned_to?: string | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          impact_assessment?: string | null
          organization_id: string
          reported_at?: string | null
          reported_by?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          severity: Database["public"]["Enums"]["incident_severity"]
          status?: Database["public"]["Enums"]["incident_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          affected_systems?: string | null
          assigned_to?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          impact_assessment?: string | null
          organization_id?: string
          reported_at?: string | null
          reported_by?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["incident_severity"]
          status?: Database["public"]["Enums"]["incident_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incidents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      litigation_cases: {
        Row: {
          actual_cost: number | null
          case_number: string
          counsel_id: string | null
          court_name: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          estimated_cost: number | null
          filing_date: string | null
          id: string
          jurisdiction: string | null
          organization_id: string
          outcome: string | null
          priority: Database["public"]["Enums"]["litigation_priority"] | null
          status: Database["public"]["Enums"]["litigation_status"] | null
          title: string
          trial_date: string | null
          updated_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          case_number: string
          counsel_id?: string | null
          court_name?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          filing_date?: string | null
          id?: string
          jurisdiction?: string | null
          organization_id: string
          outcome?: string | null
          priority?: Database["public"]["Enums"]["litigation_priority"] | null
          status?: Database["public"]["Enums"]["litigation_status"] | null
          title: string
          trial_date?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          case_number?: string
          counsel_id?: string | null
          court_name?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          estimated_cost?: number | null
          filing_date?: string | null
          id?: string
          jurisdiction?: string | null
          organization_id?: string
          outcome?: string | null
          priority?: Database["public"]["Enums"]["litigation_priority"] | null
          status?: Database["public"]["Enums"]["litigation_status"] | null
          title?: string
          trial_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "litigation_cases_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          country: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          organization_type: string
          parent_id: string | null
          region: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          organization_type: string
          parent_id?: string | null
          region?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          organization_type?: string
          parent_id?: string | null
          region?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      policies: {
        Row: {
          acknowledgment_required: boolean | null
          approval_date: string | null
          approver_id: string | null
          created_at: string | null
          created_by: string | null
          department_scope: string | null
          description: string | null
          document_url: string | null
          effective_date: string | null
          id: string
          organization_id: string
          owner_id: string | null
          review_date: string | null
          status: Database["public"]["Enums"]["policy_status"] | null
          title: string
          updated_at: string | null
          version: string | null
        }
        Insert: {
          acknowledgment_required?: boolean | null
          approval_date?: string | null
          approver_id?: string | null
          created_at?: string | null
          created_by?: string | null
          department_scope?: string | null
          description?: string | null
          document_url?: string | null
          effective_date?: string | null
          id?: string
          organization_id: string
          owner_id?: string | null
          review_date?: string | null
          status?: Database["public"]["Enums"]["policy_status"] | null
          title: string
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          acknowledgment_required?: boolean | null
          approval_date?: string | null
          approver_id?: string | null
          created_at?: string | null
          created_by?: string | null
          department_scope?: string | null
          description?: string | null
          document_url?: string | null
          effective_date?: string | null
          id?: string
          organization_id?: string
          owner_id?: string | null
          review_date?: string | null
          status?: Database["public"]["Enums"]["policy_status"] | null
          title?: string
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          lifecycle_stage: string | null
          market_regions: string[] | null
          organization_id: string
          product_code: string
          product_name: string
          product_type: string | null
          regulatory_approvals: Json | null
          steward_id: string | null
          sustainability_metrics: Json | null
          updated_at: string | null
          voc_content: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          lifecycle_stage?: string | null
          market_regions?: string[] | null
          organization_id: string
          product_code: string
          product_name: string
          product_type?: string | null
          regulatory_approvals?: Json | null
          steward_id?: string | null
          sustainability_metrics?: Json | null
          updated_at?: string | null
          voc_content?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          lifecycle_stage?: string | null
          market_regions?: string[] | null
          organization_id?: string
          product_code?: string
          product_name?: string
          product_type?: string | null
          regulatory_approvals?: Json | null
          steward_id?: string | null
          sustainability_metrics?: Json | null
          updated_at?: string | null
          voc_content?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          organization_id: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          organization_id?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          organization_id?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_assessments: {
        Row: {
          assessment_date: string | null
          assessor_id: string
          completed_at: string | null
          created_at: string | null
          findings: string | null
          id: string
          impact: Database["public"]["Enums"]["risk_impact"] | null
          probability: Database["public"]["Enums"]["risk_probability"] | null
          recommendations: string | null
          risk_id: string
          risk_score: number | null
          status: string | null
        }
        Insert: {
          assessment_date?: string | null
          assessor_id: string
          completed_at?: string | null
          created_at?: string | null
          findings?: string | null
          id?: string
          impact?: Database["public"]["Enums"]["risk_impact"] | null
          probability?: Database["public"]["Enums"]["risk_probability"] | null
          recommendations?: string | null
          risk_id: string
          risk_score?: number | null
          status?: string | null
        }
        Update: {
          assessment_date?: string | null
          assessor_id?: string
          completed_at?: string | null
          created_at?: string | null
          findings?: string | null
          id?: string
          impact?: Database["public"]["Enums"]["risk_impact"] | null
          probability?: Database["public"]["Enums"]["risk_probability"] | null
          recommendations?: string | null
          risk_id?: string
          risk_score?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risk_assessments_risk_id_fkey"
            columns: ["risk_id"]
            isOneToOne: false
            referencedRelation: "risks"
            referencedColumns: ["id"]
          },
        ]
      }
      risks: {
        Row: {
          category: Database["public"]["Enums"]["risk_category"]
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          identified_date: string | null
          impact: Database["public"]["Enums"]["risk_impact"] | null
          inherent_risk_score: number | null
          mitigation_plan: string | null
          organization_id: string
          owner_id: string | null
          probability: Database["public"]["Enums"]["risk_probability"] | null
          residual_risk_score: number | null
          review_date: string | null
          status: Database["public"]["Enums"]["risk_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          identified_date?: string | null
          impact?: Database["public"]["Enums"]["risk_impact"] | null
          inherent_risk_score?: number | null
          mitigation_plan?: string | null
          organization_id: string
          owner_id?: string | null
          probability?: Database["public"]["Enums"]["risk_probability"] | null
          residual_risk_score?: number | null
          review_date?: string | null
          status?: Database["public"]["Enums"]["risk_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["risk_category"]
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          identified_date?: string | null
          impact?: Database["public"]["Enums"]["risk_impact"] | null
          inherent_risk_score?: number | null
          mitigation_plan?: string | null
          organization_id?: string
          owner_id?: string | null
          probability?: Database["public"]["Enums"]["risk_probability"] | null
          residual_risk_score?: number | null
          review_date?: string | null
          status?: Database["public"]["Enums"]["risk_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "risks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_organization: {
        Args: { _user_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "global_grc_director"
        | "regional_grc_manager"
        | "environmental_compliance_officer"
        | "product_stewardship_manager"
        | "chemical_safety_specialist"
        | "regulatory_affairs_manager"
        | "site_manager"
        | "plant_safety_coordinator"
        | "quality_assurance_lead"
        | "ehs_officer"
        | "production_supervisor"
        | "operator_technician"
        | "rd_manager"
        | "formulation_chemist"
        | "analytical_chemist"
        | "product_developer"
        | "external_auditor"
        | "environmental_auditor"
        | "safety_auditor"
        | "regulatory_compliance_auditor"
      audit_status: "planned" | "in_progress" | "completed" | "cancelled"
      compliance_framework:
        | "sox"
        | "gdpr"
        | "iso_27001"
        | "iso_14001"
        | "osha"
        | "epa"
        | "reach"
        | "tsca"
        | "ghs"
      compliance_status:
        | "compliant"
        | "non_compliant"
        | "partially_compliant"
        | "not_assessed"
        | "in_progress"
      incident_severity: "low" | "medium" | "high" | "critical"
      incident_status: "reported" | "investigating" | "resolved" | "closed"
      litigation_priority: "low" | "medium" | "high" | "critical"
      litigation_status:
        | "filed"
        | "discovery"
        | "pre_trial"
        | "trial"
        | "settled"
        | "closed"
      policy_status:
        | "draft"
        | "under_review"
        | "approved"
        | "active"
        | "archived"
      risk_category:
        | "environmental"
        | "chemical"
        | "product"
        | "supply_chain"
        | "operational"
        | "regulatory"
      risk_impact: "negligible" | "minor" | "moderate" | "major" | "critical"
      risk_probability: "very_low" | "low" | "medium" | "high" | "very_high"
      risk_status:
        | "identified"
        | "assessing"
        | "assessed"
        | "mitigating"
        | "monitoring"
        | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "global_grc_director",
        "regional_grc_manager",
        "environmental_compliance_officer",
        "product_stewardship_manager",
        "chemical_safety_specialist",
        "regulatory_affairs_manager",
        "site_manager",
        "plant_safety_coordinator",
        "quality_assurance_lead",
        "ehs_officer",
        "production_supervisor",
        "operator_technician",
        "rd_manager",
        "formulation_chemist",
        "analytical_chemist",
        "product_developer",
        "external_auditor",
        "environmental_auditor",
        "safety_auditor",
        "regulatory_compliance_auditor",
      ],
      audit_status: ["planned", "in_progress", "completed", "cancelled"],
      compliance_framework: [
        "sox",
        "gdpr",
        "iso_27001",
        "iso_14001",
        "osha",
        "epa",
        "reach",
        "tsca",
        "ghs",
      ],
      compliance_status: [
        "compliant",
        "non_compliant",
        "partially_compliant",
        "not_assessed",
        "in_progress",
      ],
      incident_severity: ["low", "medium", "high", "critical"],
      incident_status: ["reported", "investigating", "resolved", "closed"],
      litigation_priority: ["low", "medium", "high", "critical"],
      litigation_status: [
        "filed",
        "discovery",
        "pre_trial",
        "trial",
        "settled",
        "closed",
      ],
      policy_status: [
        "draft",
        "under_review",
        "approved",
        "active",
        "archived",
      ],
      risk_category: [
        "environmental",
        "chemical",
        "product",
        "supply_chain",
        "operational",
        "regulatory",
      ],
      risk_impact: ["negligible", "minor", "moderate", "major", "critical"],
      risk_probability: ["very_low", "low", "medium", "high", "very_high"],
      risk_status: [
        "identified",
        "assessing",
        "assessed",
        "mitigating",
        "monitoring",
        "closed",
      ],
    },
  },
} as const
