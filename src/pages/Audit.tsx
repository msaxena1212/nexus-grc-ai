import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AddAuditForm } from "@/components/forms/AddAuditForm";
import { AddAuditLogForm } from "@/components/forms/AddAuditLogForm";
import { AddFindingForm } from "@/components/forms/AddFindingForm";
import { AuditDetailsDialog } from "@/components/dialogs/AuditDetailsDialog";
import { 
  Search, 
  Plus, 
  Calendar,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const auditEngagements = [
  {
    id: "A-2024-001",
    name: "SOX 404 Annual Audit",
    type: "Internal",
    status: "In Progress",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-03-31",
    auditors: ["Sarah Johnson", "Mike Davis"],
    findings: 3,
    riskRating: "Medium"
  },
  {
    id: "A-2024-002",
    name: "IT Security Assessment", 
    type: "External",
    status: "Planning",
    progress: 25,
    startDate: "2024-02-01",
    endDate: "2024-04-15",
    auditors: ["External Firm"],
    findings: 0,
    riskRating: "High"
  },
  {
    id: "A-2024-003",
    name: "Vendor Management Review",
    type: "Internal",
    status: "Completed",
    progress: 100,
    startDate: "2023-11-01",
    endDate: "2024-01-15",
    auditors: ["Lisa Chen", "David Wilson"],
    findings: 2,
    riskRating: "Low"
  },
  {
    id: "A-2024-004",
    name: "Revenue Recognition Audit",
    type: "External", 
    status: "Fieldwork",
    progress: 40,
    startDate: "2024-01-20",
    endDate: "2024-03-20",
    auditors: ["External Firm", "John Smith"],
    findings: 1,
    riskRating: "Medium"
  }
];

const auditFindings = [
  {
    id: "F-001",
    title: "Inadequate User Access Controls",
    audit: "SOX 404 Annual Audit",
    severity: "High",
    category: "Internal Controls",
    owner: "IT Security Team",
    dueDate: "2024-02-15",
    status: "Open",
    description: "Segregation of duties not properly enforced in financial systems"
  },
  {
    id: "F-002",
    title: "Missing Vendor Contracts",
    audit: "Vendor Management Review", 
    severity: "Medium",
    category: "Operational",
    owner: "Procurement Team",
    dueDate: "2024-02-01",
    status: "In Progress",
    description: "Several key vendor relationships lack current contracts"
  },
  {
    id: "F-003",
    title: "Revenue Cut-off Testing Exception",
    audit: "Revenue Recognition Audit",
    severity: "Low",
    category: "Financial Reporting",
    owner: "Finance Team",
    dueDate: "2024-02-28",
    status: "Resolved",
    description: "Minor timing differences in revenue recognition identified"
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'resolved':
      return 'status-low';
    case 'in progress':
    case 'fieldwork':
      return 'status-medium';
    case 'planning':
      return 'status-info';
    case 'open':
      return 'status-high';
    default:
      return 'status-info';
  }
};

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'high':
      return 'status-high';
    case 'medium':
      return 'status-medium';
    case 'low':
      return 'status-low';
    default:
      return 'status-info';
  }
};

export default function Audit() {
  const [audits, setAudits] = useState<any[]>([]);
  const [findings, setFindings] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: auditsData } = await supabase
        .from('audits')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: findingsData } = await supabase
        .from('audit_findings')
        .select('*, audits(title)')
        .order('created_at', { ascending: false });

      const { data: logsData } = await supabase
        .from('audit_logs')
        .select('*')
        .order('logged_at', { ascending: false })
        .limit(10);

      setAudits(auditsData || []);
      setFindings(findingsData || []);
      setLogs(logsData || []);
    } catch (error) {
      console.error('Error fetching audit data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (audit: any) => {
    setSelectedAudit(audit);
    setDetailsOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading audits...</p>
        </div>
      </div>
    );
  }

  const activeAudits = audits.filter(a => a.status !== 'completed');
  const openFindings = findings.filter(f => f.status === 'open' || f.status === 'in_progress');
  const completedThisYear = audits.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-6">
      <AuditDetailsDialog 
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        audit={selectedAudit}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Audit Management</h1>
          <p className="text-muted-foreground">Plan, execute, and track internal and external audits</p>
        </div>
        <AddAuditForm onSuccess={fetchData} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAudits.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Findings</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{openFindings.length}</div>
            <p className="text-xs text-muted-foreground">
              Requiring action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed YTD</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completedThisYear}</div>
            <p className="text-xs text-muted-foreground">
              This year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{audits.length}</div>
            <p className="text-xs text-muted-foreground">
              All engagements
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagements">Audit Engagements</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="engagements" className="space-y-6">
          {/* Audit Engagements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {audits.length > 0 ? audits.map((audit) => (
              <Card key={audit.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{audit.title}</CardTitle>
                      <CardDescription>Type: {audit.audit_type}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(audit.status)}>
                        {audit.status}
                      </Badge>
                      {audit.risk_rating && (
                        <Badge className={getRiskColor(audit.risk_rating)}>
                          {audit.risk_rating} Risk
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Start Date</div>
                      <div className="text-sm font-medium">
                        {audit.start_date || 'Not set'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">End Date</div>
                      <div className="text-sm font-medium">
                        {audit.end_date || 'Not set'}
                      </div>
                    </div>
                  </div>

                  {audit.budget && (
                    <div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                      <div className="text-sm font-medium">
                        ${Number(audit.budget).toLocaleString()}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t gap-2">
                    <div className="flex gap-2">
                      <AddAuditLogForm auditId={audit.id} onSuccess={fetchData} />
                      <AddFindingForm auditId={audit.id} onSuccess={fetchData} />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(audit)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-2 text-center py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No audits found. Create your first audit to get started.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-6">
          {/* Audit Findings */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Findings</CardTitle>
              <CardDescription>
                Track and manage audit findings across all engagements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {findings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Finding #</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Audit</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {findings.map((finding) => (
                      <TableRow key={finding.id} className="hover:bg-accent/50">
                        <TableCell className="font-medium">{finding.finding_number}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{finding.title}</div>
                            {finding.description && (
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {finding.description}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {finding.audits?.title || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(finding.severity)}>
                            {finding.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{finding.category}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {finding.due_date || 'Not set'}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(finding.status)}>
                            {finding.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No findings recorded yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Logs</CardTitle>
              <CardDescription>
                Activity log for all audit engagements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {logs.length > 0 ? (
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium">{log.title}</p>
                            <Badge variant="outline" className="mt-1">{log.log_type}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(log.logged_at).toLocaleDateString()}
                          </p>
                        </div>
                        {log.description && (
                          <p className="text-sm text-muted-foreground mt-2">{log.description}</p>
                        )}
                        {log.test_result && (
                          <Badge className="mt-2" variant={log.test_result === 'passed' ? 'default' : 'destructive'}>
                            Test: {log.test_result}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No audit logs yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Schedule</CardTitle>
              <CardDescription>
                Annual audit plan and timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Audit schedule timeline</p>
                  <p className="text-sm text-muted-foreground">Gantt chart view would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}