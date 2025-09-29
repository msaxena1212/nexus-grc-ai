import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  AlertTriangle,
  Shield,
  FileCheck,
  Search,
  Scale
} from "lucide-react";

const kpiMetrics = [
  {
    title: "Overall Risk Score",
    value: "3.2",
    change: "-0.3",
    changeType: "decrease",
    description: "Average risk score across all identified risks",
    icon: Shield,
    color: "text-primary"
  },
  {
    title: "Compliance Rate",
    value: "87%",
    change: "+2%",
    changeType: "increase", 
    description: "Control tests passed vs total tests",
    icon: FileCheck,
    color: "text-success"
  },
  {
    title: "Audit Findings",
    value: "12",
    change: "-4",
    changeType: "decrease",
    description: "Open audit findings requiring remediation",
    icon: Search,
    color: "text-warning"
  },
  {
    title: "Legal Matters",
    value: "3",
    change: "0",
    changeType: "neutral",
    description: "Active litigation matters",
    icon: Scale,
    color: "text-destructive"
  }
];

const riskTrends = [
  { category: "Cybersecurity", current: 32, previous: 28, trend: "up" },
  { category: "Operational", current: 24, previous: 26, trend: "down" },
  { category: "Financial", current: 22, previous: 20, trend: "up" },
  { category: "Regulatory", current: 18, previous: 22, trend: "down" },
  { category: "Strategic", current: 16, previous: 15, trend: "up" }
];

const complianceMetrics = [
  { framework: "SOX", compliance: 92, tests: 45, passed: 41, failed: 4 },
  { framework: "GDPR", compliance: 89, tests: 32, passed: 28, failed: 4 },
  { framework: "ISO 27001", compliance: 85, tests: 114, passed: 97, failed: 17 },
  { framework: "PCI DSS", compliance: 91, tests: 78, passed: 71, failed: 7 }
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">GRC Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights across governance, risk, and compliance</p>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {metric.changeType === 'increase' && (
                  <>
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-success">{metric.change}</span>
                  </>
                )}
                {metric.changeType === 'decrease' && (
                  <>
                    <TrendingDown className="h-3 w-3 text-success" />
                    <span className="text-success">{metric.change}</span>
                  </>
                )}
                {metric.changeType === 'neutral' && (
                  <span className="text-muted-foreground">No change</span>
                )}
                <span className="text-muted-foreground">from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
            <CardDescription>Risk distribution by probability and impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-success/10 via-warning/20 to-destructive/30 rounded-lg flex items-center justify-center relative">
              {/* Mock heatmap grid */}
              <div className="absolute inset-4 grid grid-cols-5 grid-rows-5 gap-1">
                {Array.from({ length: 25 }, (_, i) => {
                  const intensity = Math.random();
                  const bgColor = intensity > 0.7 ? 'bg-destructive/60' : 
                                 intensity > 0.4 ? 'bg-warning/60' : 
                                 'bg-success/60';
                  return (
                    <div 
                      key={i} 
                      className={`${bgColor} rounded border border-white/20 hover:scale-110 transition-transform cursor-pointer`}
                      title={`Risk ${i + 1}`}
                    />
                  );
                })}
              </div>
              <div className="absolute bottom-2 left-4 text-xs text-muted-foreground">Low Impact → High Impact</div>
              <div className="absolute top-4 left-2 text-xs text-muted-foreground transform -rotate-90 origin-left">Low Probability</div>
              <div className="absolute bottom-4 left-2 text-xs text-muted-foreground transform -rotate-90 origin-left">High Probability</div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
            <CardDescription>Framework compliance rates and test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceMetrics.map((framework, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{framework.framework}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {framework.passed}/{framework.tests}
                      </span>
                      <span className={`text-sm font-bold ${
                        framework.compliance >= 95 ? 'text-success' :
                        framework.compliance >= 85 ? 'text-warning' :
                        'text-destructive'
                      }`}>
                        {framework.compliance}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        framework.compliance >= 95 ? 'bg-success' :
                        framework.compliance >= 85 ? 'bg-warning' :
                        'bg-destructive'
                      }`}
                      style={{ width: `${framework.compliance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Category Trends</CardTitle>
            <CardDescription>Changes in risk count by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskTrends.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      risk.trend === 'up' ? 'bg-destructive' : 'bg-success'
                    }`} />
                    <span className="text-sm font-medium">{risk.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {risk.previous} → {risk.current}
                    </span>
                    {risk.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Pipeline</CardTitle>
            <CardDescription>Current audit engagements and findings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">SOX 404 Annual Audit</div>
                  <div className="text-xs text-muted-foreground">65% complete</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div className="w-2/3 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-xs font-medium">3 findings</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">IT Security Assessment</div>
                  <div className="text-xs text-muted-foreground">25% complete</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div className="w-1/4 h-2 bg-warning rounded-full" />
                  </div>
                  <span className="text-xs font-medium">0 findings</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">Revenue Recognition Audit</div>
                  <div className="text-xs text-muted-foreground">40% complete</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div className="w-2/5 h-2 bg-success rounded-full" />
                  </div>
                  <span className="text-xs font-medium">1 finding</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Incident Response</CardTitle>
            <CardDescription>Recent incident metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Open Incidents</span>
                <span className="font-bold text-destructive">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Resolution Time</span>
                <span className="font-bold">4.2h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">SLA Compliance</span>
                <span className="font-bold text-warning">87%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Policy Management</CardTitle>
            <CardDescription>Policy compliance status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Policies</span>
                <span className="font-bold">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Acknowledgment Rate</span>
                <span className="font-bold text-success">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Overdue Reviews</span>
                <span className="font-bold text-destructive">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal Matters</CardTitle>
            <CardDescription>Litigation status overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Matters</span>
                <span className="font-bold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Legal Spend</span>
                <span className="font-bold">$259K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Budget Utilization</span>
                <span className="font-bold text-success">29%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}