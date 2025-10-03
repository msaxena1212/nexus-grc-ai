import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchRole = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) {
          if (isMounted) {
            setRole(null);
            setLoading(false);
          }
          return;
        }
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();
        if (error) throw error;
        if (isMounted) {
          setRole(data?.role ?? null);
          setLoading(false);
        }
      } catch (e: any) {
        if (isMounted) {
          setError(e?.message ?? 'Failed to load role');
          setRole(null);
          setLoading(false);
        }
      }
    };
    fetchRole();
    return () => { isMounted = false; };
  }, []);

  return { role, loading, error };
}
