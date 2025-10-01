import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Globe, Leaf, FileCheck, AlertCircle } from "lucide-react";

export default function ProductStewardship() {
  const products = [
    {
      id: 1,
      code: "ANP-INT-2024-001",
      name: "Premium Interior Latex Paint",
      type: "Water-Based",
      voc: 45,
      markets: ["North America", "Europe", "Asia Pacific"],
      stage: "Commercial",
      approvals: ["EPA", "REACH", "VOC Compliant"],
      sustainability: { carbon: "Low", recycled: 15, renewable: 30 }
    },
    {
      id: 2,
      code: "ANP-EXT-2024-002",
      name: "Exterior Acrylic Paint",
      type: "Water-Based",
      voc: 50,
      markets: ["North America", "Europe"],
      stage: "Commercial",
      approvals: ["EPA", "REACH", "VOC Compliant"],
      sustainability: { carbon: "Medium", recycled: 10, renewable: 25 }
    },
    {
      id: 3,
      code: "ANP-IND-2024-003",
      name: "Industrial Coating System",
      type: "Solvent-Based",
      voc: 420,
      markets: ["North America"],
      stage: "Regulatory Review",
      approvals: ["EPA Pending", "TSCA Listed"],
      sustainability: { carbon: "High", recycled: 5, renewable: 10 }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Stewardship</h1>
        <p className="text-muted-foreground mt-2">
          Manage product lifecycle, regulatory approvals, and sustainability metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Across all markets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Coverage</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Countries worldwide</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Recycled Content</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <p className="text-xs text-muted-foreground">Target: 25% by 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Regulatory submissions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Portfolio</CardTitle>
          <CardDescription>
            Regulatory compliance and sustainability tracking by product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      <Badge variant={product.stage === "Commercial" ? "default" : "secondary"}>
                        {product.stage}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {product.code} • {product.type} • VOC: {product.voc} g/L
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileCheck className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Market Regions</p>
                    <div className="flex flex-wrap gap-1">
                      {product.markets.map((market) => (
                        <Badge key={market} variant="outline" className="text-xs">
                          {market}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Regulatory Approvals</p>
                    <div className="flex flex-wrap gap-1">
                      {product.approvals.map((approval) => (
                        <Badge
                          key={approval}
                          variant={approval.includes("Pending") ? "secondary" : "default"}
                          className="text-xs"
                        >
                          {approval}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Sustainability Metrics</p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carbon Footprint:</span>
                        <span className="font-medium">{product.sustainability.carbon}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recycled Content:</span>
                        <span className="font-medium">{product.sustainability.recycled}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Renewable Materials:</span>
                        <span className="font-medium">{product.sustainability.renewable}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}