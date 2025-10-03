import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Calendar, FileText, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function AuditorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Auditor Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage audit engagements and findings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Audits</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Active engagements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Findings</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Pending resolution</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Drafts pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Audit Engagements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Active Audits</CardTitle>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">8 Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { 
                  title: "ISO 14001 Compliance Audit", 
                  location: "Americas Region - Texas Plant",
                  status: "In Progress",
                  progress: 65,
                  start: "Jan 15, 2025",
                  end: "Feb 28, 2025",
                  findings: 12
                },
                { 
                  title: "Financial Controls Review", 
                  location: "Global HQ",
                  status: "Planning",
                  progress: 20,
                  start: "Feb 1, 2025",
                  end: "Mar 15, 2025",
                  findings: 3
                },
                { 
                  title: "SOX 404 Annual Assessment", 
                  location: "Europe - Amsterdam Office",
                  status: "Fieldwork",
                  progress: 45,
                  start: "Jan 5, 2025",
                  end: "Feb 20, 2025",
                  findings: 8
                }
              ].map((audit, idx) => (
                <div key={idx} className="p-3 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{audit.title}</h4>
                      <p className="text-xs text-muted-foreground">{audit.location}</p>
                    </div>
                    <Badge className={
                      audit.status === 'In Progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                      audit.status === 'Planning' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                      'bg-purple-100 text-purple-800 hover:bg-purple-100'
                    }>
                      {audit.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{audit.progress}%</span>
                    </div>
                    <Progress value={audit.progress} className="h-1.5" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{audit.start} - {audit.end}</span>
                      <span>{audit.findings} findings</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/audit')}>
              View All Audits
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Findings</CardTitle>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">23 Open</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { 
                  id: "F-2024-145",
                  title: "Inadequate Segregation of Duties", 
                  audit: "Financial Controls Review",
                  severity: "High",
                  status: "Open",
                  dueDate: "Feb 15, 2025"
                },
                { 
                  id: "F-2024-132",
                  title: "Missing Environmental Permits", 
                  audit: "ISO 14001 Compliance Audit",
                  severity: "Critical",
                  status: "In Remediation",
                  dueDate: "Feb 10, 2025"
                },
                { 
                  id: "F-2024-128",
                  title: "User Access Control Gaps", 
                  audit: "IT Security Assessment",
                  severity: "Medium",
                  status: "Open",
                  dueDate: "Feb 20, 2025"
                }
              ].map((finding, idx) => (
                <div key={idx} className="p-3 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{finding.title}</h4>
                        <Badge className={
                          finding.severity === 'Critical' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                          finding.severity === 'High' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' :
                          'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                        }>
                          {finding.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{finding.audit}</p>
                      <p className="text-xs text-muted-foreground">ID: {finding.id}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-2">
                    <Badge variant="secondary">{finding.status}</Badge>
                    <span className="text-muted-foreground">Due: {finding.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Schedule & Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming Schedule</CardTitle>
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: "Feb 5, 2025", time: "09:00 AM", event: "Opening Meeting - SOX Audit", location: "Amsterdam" },
                { date: "Feb 8, 2025", time: "02:00 PM", event: "Control Testing - Finance Dept", location: "Remote" },
                { date: "Feb 12, 2025", time: "10:00 AM", event: "Fieldwork Review Session", location: "Texas Plant" },
                { date: "Feb 15, 2025", time: "03:00 PM", event: "Closing Meeting - ISO Audit", location: "Texas Plant" }
              ].map((schedule, idx) => (
                <div key={idx} className="p-3 rounded border bg-muted">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{schedule.event}</div>
                      <div className="text-xs text-muted-foreground mt-1">{schedule.location}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">{schedule.date}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {schedule.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Performance Metrics</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-muted-foreground">On-Time Completion</span>
                  </div>
                  <div className="text-2xl font-bold">94%</div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-muted-foreground">Reports Issued</span>
                  </div>
                  <div className="text-2xl font-bold">18</div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-xs text-muted-foreground">Avg Findings/Audit</span>
                  </div>
                  <div className="text-2xl font-bold">6.5</div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardCheck className="h-4 w-4 text-purple-600" />
                    <span className="text-xs text-muted-foreground">Audit Hours (YTD)</span>
                  </div>
                  <div className="text-2xl font-bold">342</div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Budget Utilization</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Quarterly Audit Plan</span>
                    <span className="font-medium">58%</span>
                  </div>
                  <Progress value={58} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Draft Reports */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Draft Reports Pending Review</CardTitle>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">5 Drafts</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "Q4 2024 SOX 404 Assessment Report", status: "Final Review", progress: 95, dueDate: "Feb 3, 2025" },
              { title: "IT General Controls Audit Report", status: "Draft", progress: 75, dueDate: "Feb 10, 2025" },
              { title: "Environmental Compliance Summary", status: "Peer Review", progress: 85, dueDate: "Feb 8, 2025" }
            ].map((report, idx) => (
              <div key={idx} className="p-3 rounded border">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{report.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">{report.status}</Badge>
                      <span className="text-xs text-muted-foreground">Due: {report.dueDate}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold">{report.progress}%</span>
                </div>
                <Progress value={report.progress} className="h-1.5 mt-2" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Draft Reports
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
