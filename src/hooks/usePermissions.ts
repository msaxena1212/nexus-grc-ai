import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Permission {
  can_view: boolean;
  can_create: boolean;
  can_update: boolean;
  can_delete: boolean;
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<Record<string, Permission>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setPermissions({});
          setLoading(false);
          return;
        }

        const { data: userRoleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!userRoleData) {
          setPermissions({});
          setLoading(false);
          return;
        }

        // Super admins and global directors have all permissions
        if (userRoleData.role === 'super_admin' || userRoleData.role === 'global_grc_director') {
          setPermissions({
            audits: { can_view: true, can_create: true, can_update: true, can_delete: true },
            risks: { can_view: true, can_create: true, can_update: true, can_delete: true },
            compliance: { can_view: true, can_create: true, can_update: true, can_delete: true },
            incidents: { can_view: true, can_create: true, can_update: true, can_delete: true },
            policies: { can_view: true, can_create: true, can_update: true, can_delete: true },
            litigation: { can_view: true, can_create: true, can_update: true, can_delete: true },
            chemicals: { can_view: true, can_create: true, can_update: true, can_delete: true },
            products: { can_view: true, can_create: true, can_update: true, can_delete: true },
            environmental: { can_view: true, can_create: true, can_update: true, can_delete: true },
            organizations: { can_view: true, can_create: true, can_update: true, can_delete: true },
            users: { can_view: true, can_create: true, can_update: true, can_delete: true },
            analytics: { can_view: true, can_create: true, can_update: true, can_delete: true },
          });
          setLoading(false);
          return;
        }

        const { data: permissionsData } = await supabase
          .from('role_permissions')
          .select('*')
          .eq('role', userRoleData.role);

        if (permissionsData) {
          const permsMap: Record<string, Permission> = {};
          permissionsData.forEach((perm) => {
            permsMap[perm.feature_key] = {
              can_view: perm.can_view,
              can_create: perm.can_create,
              can_update: perm.can_update,
              can_delete: perm.can_delete,
            };
          });
          setPermissions(permsMap);
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const canView = (feature: string) => permissions[feature]?.can_view || false;
  const canCreate = (feature: string) => permissions[feature]?.can_create || false;
  const canUpdate = (feature: string) => permissions[feature]?.can_update || false;
  const canDelete = (feature: string) => permissions[feature]?.can_delete || false;

  return { permissions, loading, canView, canCreate, canUpdate, canDelete };
}
