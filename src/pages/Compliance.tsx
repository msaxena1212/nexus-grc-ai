import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  FileCheck, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Users,
  BookOpen
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

const complianceFrameworks = [
  {
    id: "F-001",
    name: "SOX (Sarbanes-Oxley)",
    description: "Financial reporting controls",
    controls: 45,
    tested: 38,
    passed: 35,
    failed: 3,
    compliance: 92,
    lastUpdate: "2024-01-15"
  },
  {
    id: "F-002", 
    name: "GDPR",
    description: "Data protection regulation",
    controls: 32,
    tested: 28,
    passed: 26,
    failed: 2,
    compliance: 89,
    lastUpdate: "2024-01-12"
  },
  {
    id: "F-003",
    name: "ISO 27001",
    description: "Information security management",
    controls: 114,
    tested: 95,
    passed: 88,
    failed: 7,
    compliance: 85,
    lastUpdate: "2024-01-10"
  },
  {
    id: "F-004",
    name: "PCI DSS",
    description: "Payment card industry standards",
    controls: 78,
    tested: 65,
    passed: 61,
    failed: 4,
    compliance: 91,
    lastUpdate: "2024-01-08"
  }
];

const controlTests = [
  {
    id: "CT-001",
    control: "User Access Review",
    framework: "SOX",
    owner: "IT Security Team",
    frequency: "Quarterly",
    lastTest: "2024-01-15",
    nextTest: "2024-04-15",
    status: "Passed",
    evidence: "access-review-q1-2024.xlsx"
  },
  {
    id: "CT-002",
    control: "Data Retention Policy",
    framework: "GDPR",
    owner: "Data Protection Officer",
    frequency: "Semi-Annual",
    lastTest: "2024-01-10",
    nextTest: "2024-07-10",
    status: "Failed",
    evidence: "data-retention-audit.pdf"
  },
  {
    id: "CT-003",
    control: "Vulnerability Assessment",
    framework: "ISO 27001",
    owner: "Cybersecurity Team",
    frequency: "Monthly",
    lastTest: "2024-01-20",
    nextTest: "2024-02-20",
    status: "Passed",
    evidence: "vuln-scan-jan-2024.pdf"
  },
  {
    id: "CT-004",
    control: "Payment Processing Review",
    framework: "PCI DSS",
    owner: "Finance Team",
    frequency: "Quarterly",
    lastTest: "2024-01-05",
    nextTest: "2024-04-05",
    status: "In Progress",
    evidence: ""
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'passed':
      return 'status-low';
    case 'failed':
      return 'status-high';
    case 'in progress':
      return 'status-medium';
    default:
      return 'status-info';
  }
};

const getComplianceColor = (percentage: number) => {
  if (percentage >= 95) return 'text-success';
  if (percentage >= 85) return 'text-warning';
  return 'text-destructive';
};

export default function Compliance() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTests = controlTests.filter(test =>
    test.control.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.framework.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Compliance Management</h1>
          <p className="text-muted-foreground">Manage regulatory compliance and control frameworks</p>
        </div>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Control Test
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Frameworks</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              269 total controls
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Passed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">210</div>
            <p className="text-xs text-muted-foreground">
              89% pass rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Failed</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">16</div>
            <p className="text-xs text-muted-foreground">
              Require remediation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">12</div>
            <p className="text-xs text-muted-foreground">
              Due this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="frameworks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="controls">Control Tests</TabsTrigger>
          <TabsTrigger value="calendar">Test Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-6">
          {/* Compliance Frameworks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {complianceFrameworks.map((framework) => (
              <Card key={framework.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{framework.name}</CardTitle>
                      <CardDescription>{framework.description}</CardDescription>
                    </div>
                    <Badge className="status-info">{framework.id}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Compliance Rate</span>
                    <span className={`text-sm font-bold ${getComplianceColor(framework.compliance)}`}>
                      {framework.compliance}%
                    </span>
                  </div>
                  <Progress value={framework.compliance} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{framework.controls}</div>
                      <div className="text-xs text-muted-foreground">Total Controls</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold">{framework.tested}</div>
                      <div className="text-xs text-muted-foreground">Tests Completed</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex space-x-4">
                      <span className="text-success">✓ {framework.passed} Passed</span>
                      <span className="text-destructive">✗ {framework.failed} Failed</span>
                    </div>
                    <span className="text-muted-foreground">Updated {framework.lastUpdate}</span>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Framework Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="controls" className="space-y-6">
          {/* Control Tests */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Control Testing</CardTitle>
                  <CardDescription>
                    Track control test execution and results across all frameworks
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search control tests..."
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
                    <TableHead>Control ID</TableHead>
                    <TableHead>Control Name</TableHead>
                    <TableHead>Framework</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Last Test</TableHead>
                    <TableHead>Next Test</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTests.map((test) => (
                    <TableRow key={test.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{test.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{test.control}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{test.framework}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{test.owner}</TableCell>
                      <TableCell className="text-sm">{test.frequency}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {test.lastTest}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {test.nextTest}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
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
                            <DropdownMenuItem>Execute Test</DropdownMenuItem>
                            <DropdownMenuItem>Update Evidence</DropdownMenuItem>
                            <DropdownMenuItem>Schedule Test</DropdownMenuItem>
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

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Schedule</CardTitle>
              <CardDescription>
                Upcoming control tests and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Test calendar view</p>
                  <p className="text-sm text-muted-foreground">Interactive calendar would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}