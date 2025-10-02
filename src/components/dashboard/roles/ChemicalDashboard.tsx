import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, AlertTriangle, CheckCircle, FileText } from "lucide-react";

export default function ChemicalDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chemical Safety Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage chemical inventory and safety compliance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Chemicals</CardTitle>
            <Beaker className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Under my oversight</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Full documentation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hazardous</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Special handling</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MSDS Updates</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Chemical Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 rounded border">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm">Titanium Dioxide - TiO2</h4>
                  <p className="text-xs text-muted-foreground">CAS: 13463-67-7</p>
                </div>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs mt-2">REACH registered, TSCA listed</p>
            </div>
            <div className="p-3 rounded border">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm">Xylene (mixed isomers)</h4>
                  <p className="text-xs text-muted-foreground">CAS: 1330-20-7</p>
                </div>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
              <p className="text-xs mt-2">MSDS update required</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
