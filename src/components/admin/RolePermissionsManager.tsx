import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { Shield, Lock } from "lucide-react";

interface RolePermission {
  id: string;
  role: string;
  feature_key: string;
  can_view: boolean;
  can_create: boolean;
  can_update: boolean;
  can_delete: boolean;
}

const FEATURES = [
  { key: 'audits', label: 'Audits', icon: '📋' },
  { key: 'audit_logs', label: 'Audit Logs', icon: '📝' },
  { key: 'audit_findings', label: 'Audit Findings', icon: '🔍' },
  { key: 'risks', label: 'Risks', icon: '⚠️' },
  { key: 'compliance', label: 'Compliance', icon: '✓' },
  { key: 'incidents', label: 'Incidents', icon: '🚨' },
  { key: 'policies', label: 'Policies', icon: '📄' },
  { key: 'litigation', label: 'Litigation', icon: '⚖️' },
  { key: 'chemicals', label: 'Chemicals', icon: '🧪' },
  { key: 'products', label: 'Products', icon: '📦' },
  { key: 'environmental', label: 'Environmental', icon: '🌱' },
  { key: 'organizations', label: 'Organizations', icon: '🏢' },
  { key: 'users', label: 'Users', icon: '👥' },
  { key: 'analytics', label: 'Analytics', icon: '📊' },
];

const ROLES: Array<Database['public']['Enums']['app_role']> = [
  'regional_grc_manager',
  'environmental_compliance_officer',
  'chemical_safety_specialist',
  'site_manager',
  'ehs_officer',
  'product_stewardship_manager',
];

export default function RolePermissionsManager() {
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Database['public']['Enums']['app_role']>(ROLES[0]);

  useEffect(() => {
    fetchPermissions();
  }, [selectedRole]);

  const fetchPermissions = async () => {
    try {
      const { data, error } = await supabase
        .from('role_permissions')
        .select('*')
        .eq('role', selectedRole);

      if (error) throw error;
      setPermissions(data || []);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error('Failed to load permissions');
    } finally {
      setLoading(false);
    }
  };

  const updatePermission = async (
    featureKey: string,
    permissionType: 'can_view' | 'can_create' | 'can_update' | 'can_delete',
    value: boolean
  ) => {
    try {
      const existing = permissions.find(p => p.feature_key === featureKey);

      if (existing) {
        const { error } = await supabase
          .from('role_permissions')
          .update({ [permissionType]: value })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('role_permissions')
          .insert([{
            role: selectedRole,
            feature_key: featureKey,
            can_view: permissionType === 'can_view' ? value : false,
            can_create: permissionType === 'can_create' ? value : false,
            can_update: permissionType === 'can_update' ? value : false,
            can_delete: permissionType === 'can_delete' ? value : false,
          }]);

        if (error) throw error;
      }

      toast.success('Permission updated');
      fetchPermissions();
    } catch (error) {
      console.error('Error updating permission:', error);
      toast.error('Failed to update permission');
    }
  };

  const getPermission = (featureKey: string) => {
    return permissions.find(p => p.feature_key === featureKey) || {
      can_view: false,
      can_create: false,
      can_update: false,
      can_delete: false,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Role-Based Access Control</h2>
      </div>

      {/* Role Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Role</CardTitle>
          <CardDescription>Choose a role to manage its permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <Badge
                key={role}
                variant={selectedRole === role ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedRole(role)}
              >
                {role.replace(/_/g, ' ').toUpperCase()}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permissions Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Permissions for {selectedRole.replace(/_/g, ' ').toUpperCase()}</CardTitle>
          <CardDescription>Control what this role can access and do</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 pb-2 border-b font-semibold text-sm">
              <div>Feature</div>
              <div className="text-center">View</div>
              <div className="text-center">Create</div>
              <div className="text-center">Update</div>
              <div className="text-center">Delete</div>
            </div>

            {/* Permission Rows */}
            {FEATURES.map((feature) => {
              const perm = getPermission(feature.key);
              return (
                <div key={feature.key} className="grid grid-cols-5 gap-4 items-center py-3 border-b last:border-b-0">
                  <div className="flex items-center gap-2">
                    <span>{feature.icon}</span>
                    <span className="font-medium">{feature.label}</span>
                  </div>
                  
                  <div className="flex justify-center">
                    <Switch
                      checked={perm.can_view}
                      onCheckedChange={(checked) =>
                        updatePermission(feature.key, 'can_view', checked)
                      }
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <Switch
                      checked={perm.can_create}
                      onCheckedChange={(checked) =>
                        updatePermission(feature.key, 'can_create', checked)
                      }
                      disabled={!perm.can_view}
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <Switch
                      checked={perm.can_update}
                      onCheckedChange={(checked) =>
                        updatePermission(feature.key, 'can_update', checked)
                      }
                      disabled={!perm.can_view}
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <Switch
                      checked={perm.can_delete}
                      onCheckedChange={(checked) =>
                        updatePermission(feature.key, 'can_delete', checked)
                      }
                      disabled={!perm.can_view}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            <CardTitle className="text-lg">Permission Guidelines</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>• <strong>View</strong>: Allows the role to see the feature and its data</p>
          <p>• <strong>Create</strong>: Allows creating new records (requires View)</p>
          <p>• <strong>Update</strong>: Allows modifying existing records (requires View)</p>
          <p>• <strong>Delete</strong>: Allows removing records (requires View)</p>
          <p className="text-muted-foreground mt-4">Note: Super Admin and Global GRC Director roles have all permissions by default.</p>
        </CardContent>
      </Card>
    </div>
  );
}
