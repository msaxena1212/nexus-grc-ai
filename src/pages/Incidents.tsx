import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  Plus, 
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const incidents = [
  {
    id: "INC-2024-001",
    title: "Database Connection Timeout",
    category: "System Outage",
    severity: "High",
    status: "Open",
    reporter: "John Smith",
    assignee: "IT Operations Team",
    dateReported: "2024-01-20",
    dateResolved: null,
    slaStatus: "Within SLA",
    description: "Multiple users experiencing timeout errors when accessing customer database",
    impactedUsers: 250
  },
  {
    id: "INC-2024-002",
    title: "Unauthorized Access Attempt",
    category: "Security",
    severity: "Critical",
    status: "Investigating",
    reporter: "Security System",
    assignee: "Security Team",
    dateReported: "2024-01-19",
    dateResolved: null,
    slaStatus: "Escalated",
    description: "Multiple failed login attempts detected from suspicious IP addresses",
    impactedUsers: 0
  },
  {
    id: "INC-2024-003",
    title: "Payment Processing Error",
    category: "Financial",
    severity: "High",
    status: "Resolved",
    reporter: "Customer Service",
    assignee: "Finance Team",
    dateReported: "2024-01-18",
    dateResolved: "2024-01-19",
    slaStatus: "Resolved on Time",
    description: "Credit card processing failing for specific transaction types",
    impactedUsers: 45
  },
  {
    id: "INC-2024-004",
    title: "Email Server Performance",
    category: "Infrastructure",
    severity: "Medium",
    status: "In Progress",
    reporter: "Help Desk",
    assignee: "IT Infrastructure",
    dateReported: "2024-01-17",
    dateResolved: null,
    slaStatus: "Within SLA",
    description: "Email delivery delays reported by multiple departments",
    impactedUsers: 150
  },
  {
    id: "INC-2024-005",
    title: "Mobile App Crash",
    category: "Application",
    severity: "Medium",
    status: "Resolved",
    reporter: "Mobile Team",
    assignee: "Development Team",
    dateReported: "2024-01-15",
    dateResolved: "2024-01-16",
    slaStatus: "Resolved on Time",
    description: "App crashing on iOS devices with version 14.x",
    impactedUsers: 89
  }
];

const incidentMetrics = [
  {
    period: "This Month",
    total: 23,
    open: 5,
    resolved: 18,
    avgResolutionTime: "4.2 hours",
    slaCompliance: 87
  },
  {
    period: "Last Month", 
    total: 19,
    open: 0,
    resolved: 19,
    avgResolutionTime: "3.8 hours",
    slaCompliance: 94
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'resolved':
      return 'status-low';
    case 'investigating':
    case 'in progress':
      return 'status-medium';
    case 'open':
      return 'status-high';
    case 'escalated':
      return 'status-high';
    default:
      return 'status-info';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'status-high';
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

const getSlaColor = (slaStatus: string) => {
  switch (slaStatus.toLowerCase()) {
    case 'resolved on time':
    case 'within sla':
      return 'status-low';
    case 'escalated':
    case 'sla breach':
      return 'status-high';
    default:
      return 'status-medium';
  }
};

export default function Incidents() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIncidents = incidents.filter(incident =>
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.assignee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Incident Management</h1>
          <p className="text-muted-foreground">Track and respond to operational incidents</p>
        </div>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">5</div>
            <p className="text-xs text-muted-foreground">
              2 critical priority
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">18</div>
            <p className="text-xs text-muted-foreground">
              +4 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">
              10% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">87%</div>
            <p className="text-xs text-muted-foreground">
              Target: 95%
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="sla">SLA Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-6">
          {/* Incident List */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Incident Register</CardTitle>
                  <CardDescription>
                    Track all operational incidents and their resolution status
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search incidents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Incident ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Date Reported</TableHead>
                    <TableHead>SLA Status</TableHead>
                    <TableHead>Impacted Users</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.map((incident) => (
                    <TableRow key={incident.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{incident.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{incident.title}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-48" title={incident.description}>
                            {incident.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{incident.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{incident.assignee}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {incident.dateReported}
                      </TableCell>
                      <TableCell>
                        <Badge className={getSlaColor(incident.slaStatus)}>
                          {incident.slaStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {incident.impactedUsers.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Assign</DropdownMenuItem>
                            <DropdownMenuItem>Add Comment</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Incident Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Trends</CardTitle>
                <CardDescription>Incident volume and resolution times over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Incident trend chart</p>
                    <p className="text-sm text-muted-foreground">Interactive chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incidents by Category</CardTitle>
                <CardDescription>Distribution of incidents by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['System Outage', 'Security', 'Infrastructure', 'Application', 'Financial', 'Network'].map((category, index) => {
                    const counts = [8, 5, 4, 3, 2, 1];
                    const colors = ['bg-destructive', 'bg-warning', 'bg-primary', 'bg-success', 'bg-secondary', 'bg-muted'];
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                          <span className="text-sm font-medium">{category}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{counts[index]} incidents</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>
                Comparison of incident metrics across periods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {incidentMetrics.map((metric, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg">{metric.period}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{metric.total}</div>
                        <div className="text-xs text-muted-foreground">Total Incidents</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{metric.resolved}</div>
                        <div className="text-xs text-muted-foreground">Resolved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-destructive">{metric.open}</div>
                        <div className="text-xs text-muted-foreground">Open</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{metric.avgResolutionTime}</div>
                        <div className="text-xs text-muted-foreground">Avg Resolution</div>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">SLA Compliance</span>
                        <span className={`font-bold ${metric.slaCompliance >= 95 ? 'text-success' : 'text-warning'}`}>
                          {metric.slaCompliance}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sla" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SLA Performance</CardTitle>
              <CardDescription>
                Service level agreement compliance and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">SLA performance dashboard</p>
                  <p className="text-sm text-muted-foreground">Performance metrics would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}