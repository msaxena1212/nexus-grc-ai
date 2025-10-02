import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield, AlertTriangle, Activity, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DirectorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global GRC Director Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Strategic oversight and governance management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">26 High Priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">89%</div>
            <p className="text-xs text-muted-foreground">+3% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <p className="text-xs text-muted-foreground">2 escalated</p>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Risks & Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Risks Requiring Attention</CardTitle>
              <Badge className="status-info">8 Total</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "R-001", title: "Data Breach Vulnerability", owner: "John Smith", status: "Active" },
                { id: "R-005", title: "Key Personnel Departure", owner: "David Wilson", status: "Active" },
                { id: "R-012", title: "Supply Chain Disruption", owner: "Maria Garcia", status: "Monitoring" }
              ].map((risk, idx) => (
                <div key={idx} className="p-3 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-sm">{risk.title}</div>
                      <div className="text-xs text-muted-foreground">ID: {risk.id} | Owner: {risk.owner}</div>
                    </div>
                    <Badge className={risk.status === 'Active' ? 'status-high' : 'status-medium'}>
                      {risk.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/risk')}>
              View All Risks
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Active Audits</CardTitle>
              <Badge className="status-info">3 In Progress</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "A-2024-001", name: "SOX 404 Annual Audit", progress: 65, status: "In Progress" },
                { id: "A-2024-004", name: "Revenue Recognition Audit", progress: 40, status: "Fieldwork" },
                { id: "A-2024-002", name: "IT Security Assessment", progress: 25, status: "Planning" }
              ].map((audit, idx) => (
                <div key={idx} className="p-3 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-sm">{audit.name}</div>
                      <div className="text-xs text-muted-foreground">{audit.id}</div>
                    </div>
                    <Badge className="status-medium">{audit.status}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Progress: {audit.progress}%</div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/audit')}>
              View All Audits
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Control Tests & Incidents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Control Tests</CardTitle>
              <Badge className="status-info">12 This Month</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { control: "User Access Review", framework: "SOX", status: "Passed" },
                { control: "Data Retention Policy", framework: "GDPR", status: "Failed" },
                { control: "Vulnerability Assessment", framework: "ISO 27001", status: "Passed" }
              ].map((test, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded border">
                  <div>
                    <div className="font-medium text-sm">{test.control}</div>
                    <Badge variant="secondary" className="mt-1 text-xs">{test.framework}</Badge>
                  </div>
                  <Badge className={test.status === 'Passed' ? 'status-low' : 'status-high'}>
                    {test.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/compliance')}>
              View All Controls
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Open Incidents</CardTitle>
              <Badge className="status-high">5 Open</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "INC-2024-001", title: "Database Connection Timeout", severity: "High" },
                { id: "INC-2024-002", title: "Unauthorized Access Attempt", severity: "Critical" },
                { id: "INC-2024-004", title: "Email Server Performance", severity: "Medium" }
              ].map((incident, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded border">
                  <div>
                    <div className="font-medium text-sm">{incident.title}</div>
                    <div className="text-xs text-muted-foreground">{incident.id}</div>
                  </div>
                  <Badge className={incident.severity === 'Critical' || incident.severity === 'High' ? 'status-high' : 'status-medium'}>
                    {incident.severity}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/incidents')}>
              View All Incidents
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Strategic GRC initiatives and key performance indicators across all business units.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
