import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AddAuditForm } from "@/components/forms/AddAuditForm";
import { 
  Search, 
  Plus, 
  Calendar,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";
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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Audit Management</h1>
          <p className="text-muted-foreground">Plan, execute, and track internal and external audits</p>
        </div>
        <AddAuditForm />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 internal, 1 external
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Findings</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">4</div>
            <p className="text-xs text-muted-foreground">
              2 high priority
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed YTD</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">8</div>
            <p className="text-xs text-muted-foreground">
              +2 from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">
              days per audit
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagements" className="space-y-6">
        <TabsList>
          <TabsTrigger value="engagements">Audit Engagements</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="engagements" className="space-y-6">
          {/* Audit Engagements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {auditEngagements.map((audit) => (
              <Card key={audit.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{audit.name}</CardTitle>
                      <CardDescription>{audit.id}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(audit.status)}>
                        {audit.status}
                      </Badge>
                      <Badge className={getRiskColor(audit.riskRating)}>
                        {audit.riskRating} Risk
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-bold">{audit.progress}%</span>
                  </div>
                  <Progress value={audit.progress} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Start Date</div>
                      <div className="text-sm font-medium">{audit.startDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">End Date</div>
                      <div className="text-sm font-medium">{audit.endDate}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Auditors</div>
                    <div className="flex flex-wrap gap-1">
                      {audit.auditors.map((auditor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {auditor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Type: <strong>{audit.type}</strong></span>
                      <span>Findings: <strong>{audit.findings}</strong></span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Finding ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Audit</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditFindings.map((finding) => (
                    <TableRow key={finding.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{finding.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{finding.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {finding.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{finding.audit}</TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(finding.severity)}>
                          {finding.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{finding.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{finding.owner}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {finding.dueDate}
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