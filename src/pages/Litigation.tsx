import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  Plus, 
  DollarSign,
  Calendar,
  FileText,
  Users,
  Clock,
  Gavel,
  AlertTriangle,
  Search
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

const legalMatters = [
  {
    id: "LM-2024-001",
    title: "Employment Discrimination Claim",
    type: "Employment",
    status: "Active",
    priority: "High",
    plaintiff: "Former Employee",
    counsel: "External Law Firm A",
    dateOpened: "2024-01-10",
    trialDate: "2024-06-15",
    estimatedCost: 250000,
    actualCost: 45000,
    description: "Discrimination and wrongful termination claim"
  },
  {
    id: "LM-2024-002", 
    title: "Contract Dispute - Vendor XYZ",
    type: "Commercial",
    status: "Settlement",
    priority: "Medium",
    plaintiff: "Vendor XYZ Corp",
    counsel: "Internal Legal",
    dateOpened: "2023-11-20",
    trialDate: "2024-03-01",
    estimatedCost: 150000,
    actualCost: 89000,
    description: "Breach of contract claim over service delivery"
  },
  {
    id: "LM-2024-003",
    title: "Intellectual Property Infringement",
    type: "IP",
    status: "Discovery",
    priority: "High", 
    plaintiff: "TechCorp Industries",
    counsel: "External Law Firm B",
    dateOpened: "2024-01-05",
    trialDate: "2024-08-20",
    estimatedCost: 500000,
    actualCost: 125000,
    description: "Patent infringement lawsuit"
  },
  {
    id: "LM-2023-015",
    title: "Regulatory Investigation",
    type: "Regulatory",
    status: "Closed", 
    priority: "Low",
    plaintiff: "State Regulatory Agency",
    counsel: "Internal Legal",
    dateOpened: "2023-06-15",
    trialDate: "N/A",
    estimatedCost: 75000,
    actualCost: 68000,
    description: "Compliance investigation resolved"
  }
];

const legalHolds = [
  {
    id: "LH-001",
    matter: "Employment Discrimination Claim",
    custodians: ["John Smith", "Jane Doe", "Mike Johnson"],
    dateIssued: "2024-01-12",
    status: "Active",
    documentsPreserved: 1247,
    acknowledgments: 3,
    totalCustodians: 3
  },
  {
    id: "LH-002",
    matter: "Contract Dispute - Vendor XYZ", 
    custodians: ["Sarah Wilson", "David Chen"],
    dateIssued: "2023-11-22",
    status: "Released",
    documentsPreserved: 892,
    acknowledgments: 2,
    totalCustodians: 2
  },
  {
    id: "LH-003",
    matter: "Intellectual Property Infringement",
    custodians: ["Lisa Park", "Robert Taylor", "Emily Brown", "Tom Anderson"],
    dateIssued: "2024-01-07",
    status: "Active",
    documentsPreserved: 2156,
    acknowledgments: 4,
    totalCustodians: 4
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'status-high';
    case 'settlement':
    case 'discovery':
      return 'status-medium';
    case 'closed':
    case 'released':
      return 'status-low';
    default:
      return 'status-info';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
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

export default function Litigation() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Litigation Management</h1>
          <p className="text-muted-foreground">Manage legal matters and discovery processes</p>
        </div>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Matter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Matters</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 high priority
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Legal Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$259K</div>
            <p className="text-xs text-muted-foreground">
              $900K budgeted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Holds</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              9 custodians
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Preserved</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4K</div>
            <p className="text-xs text-muted-foreground">
              Across all holds
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matters" className="space-y-6">
        <TabsList>
          <TabsTrigger value="matters">Legal Matters</TabsTrigger>
          <TabsTrigger value="holds">Legal Holds</TabsTrigger>
          <TabsTrigger value="discovery">E-Discovery</TabsTrigger>
        </TabsList>

        <TabsContent value="matters" className="space-y-6">
          {/* Legal Matters */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Matters</CardTitle>
              <CardDescription>
                Track active litigation, settlements, and legal proceedings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Matter ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Counsel</TableHead>
                    <TableHead>Trial Date</TableHead>
                    <TableHead>Estimated Cost</TableHead>
                    <TableHead>Actual Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {legalMatters.map((matter) => (
                    <TableRow key={matter.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{matter.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{matter.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {matter.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{matter.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(matter.status)}>
                          {matter.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(matter.priority)}>
                          {matter.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{matter.counsel}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {matter.trialDate}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        ${matter.estimatedCost.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        ${matter.actualCost.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Cost Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Legal Spend Analysis</CardTitle>
                <CardDescription>Budget vs actual costs by matter type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Cost breakdown chart</p>
                    <p className="text-sm text-muted-foreground">Interactive chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Matter Timeline</CardTitle>
                <CardDescription>Upcoming deadlines and key dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium text-sm">Contract Dispute Trial</div>
                        <div className="text-xs text-muted-foreground">March 1, 2024</div>
                      </div>
                    </div>
                    <Badge className="status-medium">15 days</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Gavel className="w-4 h-4 text-destructive" />
                      <div>
                        <div className="font-medium text-sm">Employment Case Trial</div>
                        <div className="text-xs text-muted-foreground">June 15, 2024</div>
                      </div>
                    </div>
                    <Badge className="status-high">120 days</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-warning" />
                      <div>
                        <div className="font-medium text-sm">IP Infringement Trial</div>
                        <div className="text-xs text-muted-foreground">August 20, 2024</div>
                      </div>
                    </div>
                    <Badge className="status-medium">185 days</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="holds" className="space-y-6">
          {/* Legal Holds */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Holds</CardTitle>
              <CardDescription>
                Manage document preservation and custodian notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hold ID</TableHead>
                    <TableHead>Related Matter</TableHead>
                    <TableHead>Date Issued</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Custodians</TableHead>
                    <TableHead>Acknowledgments</TableHead>
                    <TableHead>Documents</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {legalHolds.map((hold) => (
                    <TableRow key={hold.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{hold.id}</TableCell>
                      <TableCell className="text-sm">{hold.matter}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {hold.dateIssued}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(hold.status)}>
                          {hold.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex -space-x-1">
                          {hold.custodians.slice(0, 3).map((custodian, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground border-2 border-background"
                              title={custodian}
                            >
                              {custodian.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {hold.custodians.length > 3 && (
                            <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs border-2 border-background">
                              +{hold.custodians.length - 3}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {hold.acknowledgments}/{hold.totalCustodians}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {hold.documentsPreserved.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discovery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>E-Discovery</CardTitle>
              <CardDescription>
                Document review and discovery management tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Search className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">E-Discovery platform</p>
                  <p className="text-sm text-muted-foreground">Document search and review tools would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}