import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Wind, Trash2, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Environmental() {
  const monitoringData = [
    {
      type: "Air Emissions",
      icon: Wind,
      measurements: [
        { parameter: "VOC Emissions", value: 145, limit: 200, unit: "kg/day", compliant: true },
        { parameter: "Particulate Matter", value: 18, limit: 25, unit: "mg/m³", compliant: true },
        { parameter: "NOx", value: 95, limit: 100, unit: "ppm", compliant: true },
      ]
    },
    {
      type: "Water Discharge",
      icon: Droplets,
      measurements: [
        { parameter: "pH Level", value: 7.2, limit: 8.5, unit: "", compliant: true },
        { parameter: "BOD", value: 22, limit: 30, unit: "mg/L", compliant: true },
        { parameter: "Total Suspended Solids", value: 28, limit: 35, unit: "mg/L", compliant: true },
      ]
    },
    {
      type: "Waste Management",
      icon: Trash2,
      measurements: [
        { parameter: "Hazardous Waste", value: 2.4, limit: 5.0, unit: "tons/month", compliant: true },
        { parameter: "Recycling Rate", value: 67, limit: 60, unit: "%", compliant: true },
        { parameter: "Landfill Diversion", value: 72, limit: 70, unit: "%", compliant: true },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Environmental Monitoring</h1>
        <p className="text-muted-foreground mt-2">
          Real-time environmental compliance tracking and reporting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">All parameters within limits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VOC Reduction</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <p className="text-xs text-muted-foreground">vs previous quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Permits</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 renewals due this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Last 365 days</p>
          </CardContent>
        </Card>
      </div>

      {monitoringData.map((category) => (
        <Card key={category.type}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <category.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>{category.type}</CardTitle>
                <CardDescription>Current monitoring parameters and compliance status</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {category.measurements.map((measurement) => {
                const percentage = (measurement.value / measurement.limit) * 100;
                return (
                  <div key={measurement.parameter} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{measurement.parameter}</span>
                        {measurement.compliant ? (
                          <Badge variant="default" className="bg-green-600">
                            Compliant
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            Exceeds Limit
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {measurement.value} / {measurement.limit} {measurement.unit}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}