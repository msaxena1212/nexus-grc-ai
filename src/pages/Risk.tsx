import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  TrendingUp,
  AlertTriangle,
  Users,
  Calendar
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

const riskData = [
  {
    id: "R-001",
    title: "Data Breach Vulnerability",
    category: "Cybersecurity",
    owner: "John Smith",
    inherentRisk: "High",
    residualRisk: "Medium",
    probability: 3,
    impact: 4,
    lastReviewed: "2024-01-15",
    nextReview: "2024-04-15",
    status: "Active"
  },
  {
    id: "R-002", 
    title: "Regulatory Compliance Gap",
    category: "Compliance",
    owner: "Sarah Johnson",
    inherentRisk: "High",
    residualRisk: "Low",
    probability: 2,
    impact: 4,
    lastReviewed: "2024-01-10",
    nextReview: "2024-04-10",
    status: "Mitigated"
  },
  {
    id: "R-003",
    title: "Third-Party Vendor Risk",
    category: "Operational",
    owner: "Mike Davis",
    inherentRisk: "Medium",
    residualRisk: "Low",
    probability: 2,
    impact: 3,
    lastReviewed: "2024-01-12",
    nextReview: "2024-04-12",
    status: "Active"
  },
  {
    id: "R-004",
    title: "Market Volatility Impact",
    category: "Financial",
    owner: "Lisa Chen",
    inherentRisk: "Medium",
    residualRisk: "Medium",
    probability: 3,
    impact: 3,
    lastReviewed: "2024-01-08",
    nextReview: "2024-04-08",
    status: "Monitoring"
  },
  {
    id: "R-005",
    title: "Key Personnel Departure",
    category: "Strategic",
    owner: "David Wilson",
    inherentRisk: "High",
    residualRisk: "Medium",
    probability: 2,
    impact: 4,
    lastReviewed: "2024-01-05",
    nextReview: "2024-04-05",
    status: "Active"
  }
];

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

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'status-high';
    case 'mitigated':
      return 'status-low';
    case 'monitoring':
      return 'status-medium';
    default:
      return 'status-info';
  }
};

export default function Risk() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRisks = riskData.filter(risk =>
    risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    risk.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    risk.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Risk Management</h1>
          <p className="text-muted-foreground">Identify, assess, and mitigate organizational risks</p>
        </div>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Risk
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">8</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Owners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Reviews</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">5</div>
            <p className="text-xs text-muted-foreground">
              Need immediate review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Register */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Risk Register</CardTitle>
              <CardDescription>
                Complete list of identified risks with assessments and mitigation status
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search risks..."
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
                <TableHead>Risk ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Inherent Risk</TableHead>
                <TableHead>Residual Risk</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Review</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRisks.map((risk) => (
                <TableRow key={risk.id} className="hover:bg-accent/50">
                  <TableCell className="font-medium">{risk.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{risk.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{risk.category}</Badge>
                  </TableCell>
                  <TableCell>{risk.owner}</TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(risk.inherentRisk)}>
                      {risk.inherentRisk}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(risk.residualRisk)}>
                      {risk.residualRisk}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{risk.probability * risk.impact}</span>
                      <span className="text-muted-foreground text-sm">
                        ({risk.probability}×{risk.impact})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(risk.status)}>
                      {risk.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {risk.nextReview}
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
                        <DropdownMenuItem>Edit Risk</DropdownMenuItem>
                        <DropdownMenuItem>Update Assessment</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Archive Risk
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Risk Heatmap Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
            <CardDescription>Visual representation of risk probability vs impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-success/10 via-warning/10 to-destructive/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Risk heatmap visualization</p>
                <p className="text-sm text-muted-foreground">Interactive chart would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk by Category</CardTitle>
            <CardDescription>Distribution of risks across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Cybersecurity', 'Compliance', 'Operational', 'Financial', 'Strategic'].map((category, index) => {
                const counts = [32, 28, 24, 22, 21];
                const colors = ['bg-destructive', 'bg-warning', 'bg-primary', 'bg-success', 'bg-secondary'];
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                      <span className="text-sm font-medium">{category}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{counts[index]} risks</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}