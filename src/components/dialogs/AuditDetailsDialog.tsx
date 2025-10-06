import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Users, FileText, Target, DollarSign, AlertTriangle, CheckCircle, Clock, Edit } from "lucide-react";
import { format } from "date-fns";

interface AuditDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  audit: any;
  onEdit?: () => void;
}

export function AuditDetailsDialog({ open, onOpenChange, audit, onEdit }: AuditDetailsDialogProps) {
  if (!audit) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'status-low';
      case 'fieldwork':
      case 'in_progress':
        return 'status-medium';
      case 'planning':
        return 'status-info';
      default:
        return 'status-info';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'status-high';
      case 'medium':
        return 'status-medium';
      case 'low':
        return 'status-low';
      default:
        return 'status-info';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{audit.title}</DialogTitle>
              <DialogDescription>
                Audit Type: {audit.audit_type} • Created {audit.created_at ? format(new Date(audit.created_at), 'MMM dd, yyyy') : 'N/A'}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(audit.status)}>{audit.status}</Badge>
              {audit.risk_rating && (
                <Badge className={getRiskColor(audit.risk_rating)}>{audit.risk_rating} Risk</Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scope">Scope & Objectives</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] mt-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Start Date</p>
                        <p className="text-sm font-medium">
                          {audit.start_date ? format(new Date(audit.start_date), 'MMM dd, yyyy') : 'Not set'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">End Date</p>
                        <p className="text-sm font-medium">
                          {audit.end_date ? format(new Date(audit.end_date), 'MMM dd, yyyy') : 'Not set'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Budget</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${audit.budget ? Number(audit.budget).toLocaleString() : '0'}
                    </div>
                    <p className="text-xs text-muted-foreground">Allocated budget</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Audit Progress</CardTitle>
                  <CardDescription>Overall completion status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span className="font-bold">
                        {audit.status === 'completed' ? '100' : audit.status === 'fieldwork' ? '60' : '30'}%
                      </span>
                    </div>
                    <Progress 
                      value={audit.status === 'completed' ? 100 : audit.status === 'fieldwork' ? 60 : 30} 
                      className="h-2" 
                    />
                  </div>
                </CardContent>
              </Card>

              {audit.findings_summary && (
                <Card>
                  <CardHeader>
                    <CardTitle>Findings Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{audit.findings_summary}</p>
                  </CardContent>
                </Card>
              )}

              {audit.recommendations && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{audit.recommendations}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="scope" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Audit Scope
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">
                    {audit.scope || 'No scope defined'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">
                    {audit.objectives || 'No objectives defined'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="findings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Audit Findings
                  </CardTitle>
                  <CardDescription>
                    Detailed findings and observations from this audit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No findings recorded yet</p>
                    <p className="text-sm">Findings will appear here as they are documented</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Audit Team
                  </CardTitle>
                  <CardDescription>
                    Team members assigned to this audit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {audit.lead_auditor_id && (
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Lead Auditor</p>
                            <p className="text-sm text-muted-foreground">Primary responsibility</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Lead</Badge>
                      </div>
                    )}
                    
                    <div className="text-center py-6 text-muted-foreground">
                      <p className="text-sm">Additional team members will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          {onEdit && (
            <Button onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Audit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}