import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Building2, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Administrator Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          System-wide overview and management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,500</div>
            <p className="text-xs text-muted-foreground">Across all organizations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Global entities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <Shield className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* System-Wide Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Risks Across Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { org: "AkzoNobel Europe", high: 12, medium: 28, low: 45 },
                { org: "AkzoNobel Americas", high: 8, medium: 24, low: 38 },
                { org: "AkzoNobel Asia Pacific", high: 6, medium: 19, low: 31 }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded border">
                  <span className="font-medium text-sm">{item.org}</span>
                  <div className="flex gap-2">
                    <Badge className="status-high">{item.high} High</Badge>
                    <Badge className="status-medium">{item.medium} Med</Badge>
                    <Badge className="status-low">{item.low} Low</Badge>
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
            <CardTitle>Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Database Connection Timeout", severity: "High", status: "Open" },
                { title: "Unauthorized Access Attempt", severity: "Critical", status: "Investigating" },
                { title: "Payment Processing Error", severity: "High", status: "Resolved" }
              ].map((incident, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded border">
                  <div>
                    <div className="font-medium text-sm">{incident.title}</div>
                    <Badge variant="secondary" className="mt-1 text-xs">{incident.severity}</Badge>
                  </div>
                  <Badge className={incident.status === 'Resolved' ? 'status-low' : 'status-high'}>
                    {incident.status}
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
          <CardTitle>Admin Privileges</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You have full system access including user management, organization setup, and system configuration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
