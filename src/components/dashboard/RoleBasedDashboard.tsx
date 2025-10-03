import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminDashboard from "./roles/AdminDashboard";
import DirectorDashboard from "./roles/DirectorDashboard";
import ComplianceDashboard from "./roles/ComplianceDashboard";
import ChemicalDashboard from "./roles/ChemicalDashboard";
import SiteManagerDashboard from "./roles/SiteManagerDashboard";
import AuditorDashboard from "./roles/AuditorDashboard";
import DefaultDashboard from "../Dashboard";

export default function RoleBasedDashboard() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();
        
        setUserRole(roleData?.role || null);
      }
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  switch (userRole) {
    case 'super_admin':
      return <AdminDashboard />;
    case 'global_grc_director':
      return <DirectorDashboard />;
    case 'environmental_compliance_officer':
      return <ComplianceDashboard />;
    case 'chemical_safety_specialist':
      return <ChemicalDashboard />;
    case 'site_manager':
      return <SiteManagerDashboard />;
    case 'audit_manager':
      return <AuditorDashboard />;
    default:
      return <DefaultDashboard />;
  }
}
