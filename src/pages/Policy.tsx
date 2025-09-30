import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AddPolicyForm } from "@/components/forms/AddPolicyForm";
import { 
  FileText, 
  Plus, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  BookOpen,
  Calendar,
  Edit
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

const policies = [
  {
    id: "POL-001",
    title: "Information Security Policy",
    category: "Security",
    version: "3.2",
    status: "Current",
    owner: "CISO",
    effectiveDate: "2024-01-01",
    reviewDate: "2024-12-31",
    acknowledgments: 847,
    totalEmployees: 950,
    acknowledgedPercent: 89
  },
  {
    id: "POL-002",
    title: "Code of Conduct",
    category: "Ethics",
    version: "2.1", 
    status: "Current",
    owner: "Chief Compliance Officer",
    effectiveDate: "2023-07-01",
    reviewDate: "2024-06-30",
    acknowledgments: 932,
    totalEmployees: 950,
    acknowledgedPercent: 98
  },
  {
    id: "POL-003",
    title: "Remote Work Policy",
    category: "HR",
    version: "1.5",
    status: "Under Review",
    owner: "Head of HR",
    effectiveDate: "2023-03-15",
    reviewDate: "2024-03-15",
    acknowledgments: 723,
    totalEmployees: 950,
    acknowledgedPercent: 76
  },
  {
    id: "POL-004",
    title: "Data Privacy Policy",
    category: "Privacy",
    version: "2.0",
    status: "Expiring Soon",
    owner: "Data Protection Officer",
    effectiveDate: "2023-02-01",
    reviewDate: "2024-02-29",
    acknowledgments: 898,
    totalEmployees: 950,
    acknowledgedPercent: 95
  }
];

const policyExceptions = [
  {
    id: "EXC-001",
    policy: "Information Security Policy",
    requestor: "John Smith",
    department: "Sales",
    reason: "Client-specific security requirements",
    status: "Approved",
    dateRequested: "2024-01-15",
    expiryDate: "2024-06-15",
    approver: "CISO"
  },
  {
    id: "EXC-002",
    policy: "Remote Work Policy", 
    requestor: "Sarah Johnson",
    department: "Engineering",
    reason: "International relocation",
    status: "Pending",
    dateRequested: "2024-01-20",
    expiryDate: "2024-12-31",
    approver: "Head of HR"
  },
  {
    id: "EXC-003",
    policy: "Data Privacy Policy",
    requestor: "Mike Davis",
    department: "Marketing",
    reason: "Third-party integration requirements",
    status: "Rejected",
    dateRequested: "2024-01-10",
    expiryDate: "N/A",
    approver: "Data Protection Officer"
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'current':
    case 'approved':
      return 'status-low';
    case 'under review':
    case 'pending':
      return 'status-medium';
    case 'expiring soon':
    case 'rejected':
      return 'status-high';
    case 'draft':
      return 'status-info';
    default:
      return 'status-info';
  }
};

export default function Policy() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Policy Management</h1>
          <p className="text-muted-foreground">Create, distribute, and track organizational policies</p>
        </div>
        <AddPolicyForm />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              3 expiring soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledgment Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">92%</div>
            <p className="text-xs text-muted-foreground">
              Average across all policies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Exceptions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">3</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Reviews</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
            <p className="text-xs text-muted-foreground">
              Need immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="policies" className="space-y-6">
        <TabsList>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-6">
          {/* Policy Library */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Library</CardTitle>
              <CardDescription>
                Manage organizational policies and track compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Review Date</TableHead>
                    <TableHead>Acknowledgments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.map((policy) => (
                    <TableRow key={policy.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{policy.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{policy.title}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{policy.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">v{policy.version}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(policy.status)}>
                          {policy.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{policy.owner}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {policy.reviewDate}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={policy.acknowledgedPercent} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground">
                            {policy.acknowledgedPercent}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Policy Status Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Acknowledgment Status</CardTitle>
                <CardDescription>Employee acknowledgment rates by policy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium truncate">{policy.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {policy.acknowledgments}/{policy.totalEmployees}
                      </span>
                    </div>
                    <Progress value={policy.acknowledgedPercent} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Policy Categories</CardTitle>
                <CardDescription>Distribution of policies by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Security', 'Ethics', 'HR', 'Privacy', 'Finance', 'Operations'].map((category, index) => {
                    const counts = [12, 8, 10, 6, 4, 2];
                    const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-destructive', 'bg-secondary', 'bg-muted'];
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                          <span className="text-sm font-medium">{category}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{counts[index]} policies</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exceptions" className="space-y-6">
          {/* Policy Exceptions */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Exceptions</CardTitle>
              <CardDescription>
                Track and manage policy exception requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exception ID</TableHead>
                    <TableHead>Policy</TableHead>
                    <TableHead>Requestor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Requested</TableHead>
                    <TableHead>Approver</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policyExceptions.map((exception) => (
                    <TableRow key={exception.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{exception.id}</TableCell>
                      <TableCell className="text-sm">{exception.policy}</TableCell>
                      <TableCell className="text-sm">{exception.requestor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{exception.department}</Badge>
                      </TableCell>
                      <TableCell className="text-sm max-w-48 truncate" title={exception.reason}>
                        {exception.reason}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(exception.status)}>
                          {exception.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {exception.dateRequested}
                      </TableCell>
                      <TableCell className="text-sm">{exception.approver}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Acknowledgment Trends</CardTitle>
                <CardDescription>Policy acknowledgment rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Acknowledgment trend chart</p>
                    <p className="text-sm text-muted-foreground">Interactive chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Policy Lifecycle</CardTitle>
                <CardDescription>Upcoming policy reviews and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-destructive" />
                      <div>
                        <div className="font-medium text-sm">Data Privacy Policy</div>
                        <div className="text-xs text-muted-foreground">Review due Feb 29</div>
                      </div>
                    </div>
                    <Badge className="status-high">Overdue</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Edit className="w-4 h-4 text-warning" />
                      <div>
                        <div className="font-medium text-sm">Remote Work Policy</div>
                        <div className="text-xs text-muted-foreground">Review due Mar 15</div>
                      </div>
                    </div>
                    <Badge className="status-medium">Due Soon</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <div>
                        <div className="font-medium text-sm">Code of Conduct</div>
                        <div className="text-xs text-muted-foreground">Review due Jun 30</div>
                      </div>
                    </div>
                    <Badge className="status-low">On Track</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}