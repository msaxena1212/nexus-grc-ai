import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Target,
  Shield,
  Calendar
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function AuditorDashboard() {
  const [stats, setStats] = useState({
    activeAudits: 0,
    openRisks: 0,
    complianceRecords: 0,
    findings: 0,
  });
  const [audits, setAudits] = useState<any[]>([]);
  const [risks, setRisks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch audits
        const { data: auditsData } = await supabase
          .from('audits')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch risks
        const { data: risksData } = await supabase
          .from('risks')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch compliance records count
        const { count: complianceCount } = await supabase
          .from('compliance_records')
          .select('*', { count: 'exact', head: true });

        setAudits(auditsData || []);
        setRisks(risksData || []);
        setStats({
          activeAudits: auditsData?.filter(a => a.status !== 'completed').length || 0,
          openRisks: risksData?.filter(r => r.status === 'identified' || r.status === 'assessing').length || 0,
          complianceRecords: complianceCount || 0,
          findings: auditsData?.reduce((sum, a) => sum + (a.findings_summary ? 1 : 0), 0) || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'mitigated':
        return 'status-low';
      case 'in_progress':
      case 'planning':
        return 'status-medium';
      case 'identified':
      case 'fieldwork':
        return 'status-high';
      default:
        return 'status-info';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Auditor Dashboard</h2>
          <p className="text-muted-foreground">
            Manage audits, review findings, and track compliance status
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/audit')}>Manage Audits</Button>
          <Button onClick={() => navigate('/compliance')} variant="outline">Compliance</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAudits}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Risks</CardTitle>
            <Shield className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.openRisks}</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Records</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.complianceRecords}</div>
            <p className="text-xs text-muted-foreground">
              Total tracked items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audit Findings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.findings}</div>
            <p className="text-xs text-muted-foreground">
              Documented issues
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Data */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Audits</CardTitle>
            <CardDescription>Latest audit engagements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {audits.length > 0 ? (
                audits.map((audit) => (
                  <div key={audit.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{audit.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {audit.start_date ? new Date(audit.start_date).toLocaleDateString() : 'Not scheduled'}
                        </p>
                      </div>
                      <Badge className={getStatusColor(audit.status)}>
                        {audit.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No audits found</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Risks</CardTitle>
            <CardDescription>Latest identified risks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {risks.length > 0 ? (
                risks.map((risk) => (
                  <div key={risk.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{risk.title}</p>
                      <Badge className={getStatusColor(risk.status)}>
                        {risk.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={risk.inherent_risk_score || 0} className="h-2" />
                      <span className="text-xs text-muted-foreground w-12">
                        {risk.inherent_risk_score || 0}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No risks found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Commonly accessed features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/audit')}>
              <FileCheck className="w-5 h-5" />
              <span className="text-xs">Create Audit</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/risk')}>
              <Shield className="w-5 h-5" />
              <span className="text-xs">View Risks</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/compliance')}>
              <CheckCircle className="w-5 h-5" />
              <span className="text-xs">Compliance</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/analytics')}>
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}