import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const riskLevels = [
  { probability: 4, impact: 5, count: 2, label: "Critical" },
  { probability: 3, impact: 4, count: 8, label: "High" },
  { probability: 4, impact: 3, count: 5, label: "High" },
  { probability: 2, impact: 4, count: 12, label: "Medium" },
  { probability: 3, impact: 3, count: 18, label: "Medium" },
  { probability: 1, impact: 5, count: 3, label: "Low" },
  { probability: 4, impact: 2, count: 15, label: "Medium" },
  { probability: 2, impact: 3, count: 22, label: "Low" },
  { probability: 3, impact: 2, count: 19, label: "Low" },
  { probability: 1, impact: 4, count: 7, label: "Low" },
  { probability: 2, impact: 2, count: 28, label: "Low" },
  { probability: 1, impact: 3, count: 14, label: "Low" },
  { probability: 3, impact: 1, count: 9, label: "Low" },
  { probability: 2, impact: 1, count: 17, label: "Low" },
  { probability: 1, impact: 2, count: 24, label: "Low" },
  { probability: 1, impact: 1, count: 31, label: "Low" },
];

const getRiskColor = (probability: number, impact: number) => {
  const score = probability * impact;
  if (score >= 16) return "bg-destructive/80 hover:bg-destructive";
  if (score >= 12) return "bg-destructive/60 hover:bg-destructive/70";
  if (score >= 8) return "bg-warning/60 hover:bg-warning/70";
  if (score >= 4) return "bg-warning/40 hover:bg-warning/50";
  return "bg-success/40 hover:bg-success/50";
};

export default function RiskHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Heatmap</CardTitle>
        <CardDescription>Visual representation of risk probability vs impact</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive/80"></div>
              <span>Critical (16-20)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning/60"></div>
              <span>High (8-15)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning/40"></div>
              <span>Medium (4-7)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-success/40"></div>
              <span>Low (1-3)</span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="relative">
            {/* Y-axis label */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90">
              <span className="text-sm font-medium text-muted-foreground">Impact →</span>
            </div>
            
            <div className="grid grid-cols-[auto_1fr] gap-4">
              {/* Y-axis */}
              <div className="flex flex-col-reverse justify-between py-2">
                {[5, 4, 3, 2, 1].map((val) => (
                  <div key={val} className="h-16 flex items-center">
                    <span className="text-sm font-medium text-muted-foreground">{val}</span>
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div>
                <div className="grid grid-rows-5 gap-2">
                  {[5, 4, 3, 2, 1].map((impact) => (
                    <div key={impact} className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((probability) => {
                        const cell = riskLevels.find(
                          (r) => r.probability === probability && r.impact === impact
                        );
                        return (
                          <div
                            key={`${probability}-${impact}`}
                            className={`h-16 rounded-lg ${getRiskColor(probability, impact)} 
                              flex flex-col items-center justify-center cursor-pointer 
                              transition-all duration-200 border border-border/50`}
                            title={`Probability: ${probability}, Impact: ${impact}\nRisks: ${cell?.count || 0}`}
                          >
                            <span className="text-lg font-bold text-primary-foreground">
                              {cell?.count || 0}
                            </span>
                            <span className="text-xs text-primary-foreground/80">
                              risks
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* X-axis */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[1, 2, 3, 4].map((val) => (
                    <div key={val} className="text-center">
                      <span className="text-sm font-medium text-muted-foreground">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-1">
                  <span className="text-sm font-medium text-muted-foreground">← Probability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}