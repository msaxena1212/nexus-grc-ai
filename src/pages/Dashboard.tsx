import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileCheck, 
  Search, 
  Scale, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    title: "Risk Management",
    description: "Identify, assess, and mitigate organizational risks",
    icon: Shield,
    href: "/risk",
    stats: { total: 127, high: 8, medium: 23, low: 96 },
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Compliance",
    description: "Manage regulatory compliance and control frameworks",
    icon: FileCheck,
    href: "/compliance",
    stats: { total: 89, passed: 76, failed: 4, pending: 9 },
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Audit Management",
    description: "Plan, execute, and track internal and external audits",
    icon: Search,
    href: "/audit",
    stats: { total: 12, active: 3, completed: 8, planning: 1 },
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Litigation",
    description: "Manage legal matters and discovery processes",
    icon: Scale,
    href: "/litigation",
    stats: { total: 5, active: 2, settled: 3, pending: 0 },
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
  {
    title: "Policy Management",
    description: "Create, distribute, and track organizational policies",
    icon: FileText,
    href: "/policy",
    stats: { total: 45, current: 42, expiring: 3, draft: 2 },
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    title: "Incident Management",
    description: "Track and respond to operational incidents",
    icon: AlertTriangle,
    href: "/incidents",
    stats: { total: 23, open: 5, resolved: 18, escalated: 2 },
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "risk",
    title: "New high-risk identified: Data breach vulnerability",
    time: "2 hours ago",
    icon: Shield,
    status: "high"
  },
  {
    id: 2,
    type: "audit",
    title: "SOX audit fieldwork completed",
    time: "4 hours ago",
    icon: Search,
    status: "success"
  },
  {
    id: 3,
    type: "compliance",
    title: "GDPR control testing due in 3 days",
    time: "6 hours ago",
    icon: FileCheck,
    status: "warning"
  },
  {
    id: 4,
    type: "incident",
    title: "Security incident resolved: Unauthorized access",
    time: "1 day ago",
    icon: AlertTriangle,
    status: "resolved"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">8 high</span> • <span className="text-warning">23 medium</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              12 total this year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Control Tests</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">76 passed</span> • <span className="text-destructive">4 failed</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">2 escalated</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GRC Modules */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>GRC Modules</CardTitle>
              <CardDescription>
                Access your governance, risk, and compliance modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((module) => (
                  <Link key={module.title} to={module.href}>
                    <div className="module-card group cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${module.bgColor}`}>
                          <module.icon className={`w-6 h-6 ${module.color}`} />
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View
                        </Button>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                      
                      {/* Module-specific stats */}
                      <div className="flex flex-wrap gap-2">
                        {module.title === "Risk Management" && (
                          <>
                            <Badge variant="secondary" className="text-xs">
                              {module.stats.total} total
                            </Badge>
                            <Badge className="status-high text-xs">
                              {module.stats.high} high
                            </Badge>
                          </>
                        )}
                        {module.title === "Compliance" && (
                          <>
                            <Badge className="status-low text-xs">
                              {module.stats.passed} passed
                            </Badge>
                            <Badge className="status-high text-xs">
                              {module.stats.failed} failed
                            </Badge>
                          </>
                        )}
                        {module.title === "Audit Management" && (
                          <>
                            <Badge className="status-info text-xs">
                              {module.stats.active} active
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {module.stats.completed} completed
                            </Badge>
                          </>
                        )}
                        {module.title === "Litigation" && (
                          <>
                            <Badge className="status-medium text-xs">
                              {module.stats.active} active
                            </Badge>
                            <Badge className="status-low text-xs">
                              {module.stats.settled} settled
                            </Badge>
                          </>
                        )}
                        {module.title === "Policy Management" && (
                          <>
                            <Badge className="status-low text-xs">
                              {module.stats.current} current
                            </Badge>
                            <Badge className="status-medium text-xs">
                              {module.stats.expiring} expiring
                            </Badge>
                          </>
                        )}
                        {module.title === "Incident Management" && (
                          <>
                            <Badge className="status-high text-xs">
                              {module.stats.open} open
                            </Badge>
                            <Badge className="status-low text-xs">
                              {module.stats.resolved} resolved
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across all GRC modules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'high' ? 'bg-destructive/10' :
                    activity.status === 'success' ? 'bg-success/10' :
                    activity.status === 'warning' ? 'bg-warning/10' :
                    'bg-primary/10'
                  }`}>
                    <activity.icon className={`w-4 h-4 ${
                      activity.status === 'high' ? 'text-destructive' :
                      activity.status === 'success' ? 'text-success' :
                      activity.status === 'warning' ? 'text-warning' :
                      'text-primary'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Create New Risk
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Schedule Audit
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Incident
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Create Policy
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}