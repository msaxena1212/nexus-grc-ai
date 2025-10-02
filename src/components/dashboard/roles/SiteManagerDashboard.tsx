import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, AlertTriangle, Users, ClipboardCheck } from "lucide-react";

export default function SiteManagerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Manager Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Operational oversight and site compliance management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Tasks</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Pending completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Rating</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Compliance score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assigned Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 rounded border">
                <span className="text-sm">Safety Inspections</span>
                <span className="font-bold">5 pending</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded border">
                <span className="text-sm">Equipment Maintenance</span>
                <span className="font-bold">3 overdue</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded border">
                <span className="text-sm">Training Sessions</span>
                <span className="font-bold">2 scheduled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded border">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm">Minor Chemical Spill</h4>
                    <p className="text-xs text-muted-foreground">Area B, Production Floor</p>
                  </div>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <p className="text-xs mt-2">Status: Under investigation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
