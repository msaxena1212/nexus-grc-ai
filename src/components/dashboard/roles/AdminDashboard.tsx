import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Building2, Activity, AlertTriangle, CheckCircle, TrendingUp, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

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
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{item.high} High</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{item.medium} Med</Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{item.low} Low</Badge>
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
                { title: "Chemical Spill - Texas Plant", severity: "High", status: "Open", org: "Americas" },
                { title: "Unauthorized Access Attempt", severity: "Critical", status: "Investigating", org: "Europe" },
                { title: "Environmental Permit Expiry", severity: "Medium", status: "Resolved", org: "Asia Pacific" }
              ].map((incident, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded border">
                  <div>
                    <div className="font-medium text-sm">{incident.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{incident.org}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary" className="text-xs">{incident.severity}</Badge>
                    <Badge className={incident.status === 'Resolved' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'}>
                      {incident.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/incidents')}>
              View All Incidents
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Compliance & User Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status by Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { framework: "ISO 14001", compliant: 85, total: 100 },
                { framework: "SOX 404", compliant: 92, total: 100 },
                { framework: "GDPR", compliant: 78, total: 100 },
                { framework: "OSHA", compliant: 88, total: 100 }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.framework}</span>
                    <span className="text-muted-foreground">{item.compliant}%</span>
                  </div>
                  <Progress value={item.compliant} className="h-2" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/compliance')}>
              View Compliance Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity & Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded bg-muted">
                <div>
                  <div className="text-sm font-medium">Active Users (Last 7 Days)</div>
                  <div className="text-xs text-muted-foreground">Daily average</div>
                </div>
                <div className="text-2xl font-bold">1,247</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded bg-muted">
                <div>
                  <div className="text-sm font-medium">New Registrations</div>
                  <div className="text-xs text-muted-foreground">This month</div>
                </div>
                <div className="text-2xl font-bold text-green-600">+42</div>
              </div>
              <div className="flex justify-between items-center p-3 rounded bg-muted">
                <div>
                  <div className="text-sm font-medium">Pending Approvals</div>
                  <div className="text-xs text-muted-foreground">Requires action</div>
                </div>
                <div className="text-2xl font-bold text-yellow-600">8</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/user-management')}>
              Manage Users
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Database */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>System Performance</CardTitle>
              <Activity className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: "API Response Time", value: "142ms", status: "good" },
                { metric: "Database Query Time", value: "38ms", status: "good" },
                { metric: "Error Rate", value: "0.02%", status: "good" },
                { metric: "Storage Usage", value: "67%", status: "warning" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.value}</span>
                    <CheckCircle className={`h-4 w-4 ${item.status === 'good' ? 'text-green-600' : 'text-yellow-600'}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Database Statistics</CardTitle>
              <Database className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-muted">
                  <div className="text-xs text-muted-foreground">Total Risks</div>
                  <div className="text-xl font-bold">1,247</div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <div className="text-xs text-muted-foreground">Total Audits</div>
                  <div className="text-xl font-bold">156</div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <div className="text-xs text-muted-foreground">Compliance Controls</div>
                  <div className="text-xl font-bold">892</div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <div className="text-xs text-muted-foreground">Active Policies</div>
                  <div className="text-xl font-bold">234</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Administrator Privileges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded border bg-muted">
              <Shield className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Full System Access</h3>
              <p className="text-xs text-muted-foreground">
                Manage all users, organizations, and system configurations
              </p>
            </div>
            <div className="p-4 rounded border bg-muted">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-semibold mb-1">User Management</h3>
              <p className="text-xs text-muted-foreground">
                Create, modify, and assign roles across all organizations
              </p>
            </div>
            <div className="p-4 rounded border bg-muted">
              <TrendingUp className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Analytics & Reports</h3>
              <p className="text-xs text-muted-foreground">
                Access system-wide reports and analytics dashboards
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
