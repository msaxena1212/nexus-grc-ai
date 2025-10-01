import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Beaker, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function ChemicalManagement() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const chemicals = [
    {
      id: 1,
      casNumber: "108-88-3",
      name: "Toluene",
      tradeName: "Methylbenzene",
      supplier: "Chemical Corp Inc",
      hazardClass: "Flammable Liquid Category 2",
      vocContent: 867,
      reach: true,
      tsca: true,
      status: "Approved"
    },
    {
      id: 2,
      casNumber: "64-17-5",
      name: "Ethanol",
      tradeName: "Ethyl Alcohol",
      supplier: "Global Solvents Ltd",
      hazardClass: "Flammable Liquid Category 2",
      vocContent: 789,
      reach: true,
      tsca: true,
      status: "Approved"
    },
    {
      id: 3,
      casNumber: "1330-20-7",
      name: "Xylene",
      tradeName: "Dimethylbenzene",
      supplier: "ChemSupply Co",
      hazardClass: "Flammable Liquid Category 3",
      vocContent: 880,
      reach: true,
      tsca: false,
      status: "Under Review"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Chemical Added",
      description: "Chemical has been successfully registered in the system.",
    });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chemical Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage chemical inventory, regulatory compliance, and safety data
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Chemical
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Register New Chemical</DialogTitle>
              <DialogDescription>
                Add a new chemical to the inventory with regulatory information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CAS Number</Label>
                  <Input placeholder="000-00-0" required />
                </div>
                <div className="space-y-2">
                  <Label>Chemical Name</Label>
                  <Input placeholder="Chemical name" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Trade Name</Label>
                  <Input placeholder="Trade name" />
                </div>
                <div className="space-y-2">
                  <Label>Supplier</Label>
                  <Input placeholder="Supplier name" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Hazard Classification</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hazard class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flammable-2">Flammable Liquid Category 2</SelectItem>
                    <SelectItem value="flammable-3">Flammable Liquid Category 3</SelectItem>
                    <SelectItem value="toxic-acute">Acute Toxicity Category 3</SelectItem>
                    <SelectItem value="corrosive">Skin Corrosion Category 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>VOC Content (g/L)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>REACH Registered</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>TSCA Listed</Label>
                  <Switch />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Regulatory Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="restricted">Restricted Use</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Restrictions</Label>
                <Textarea placeholder="Any usage restrictions or special handling requirements" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Register Chemical</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chemicals</CardTitle>
            <Beaker className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">Across all formulations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">REACH Registered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">94.7% compliance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending assessment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restricted</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Limited use only</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chemical Inventory</CardTitle>
          <CardDescription>
            Registered chemicals with regulatory compliance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chemicals.map((chemical) => (
              <div
                key={chemical.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{chemical.name}</h3>
                    <Badge variant={chemical.status === "Approved" ? "default" : "secondary"}>
                      {chemical.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">CAS:</span>
                      <span className="ml-2">{chemical.casNumber}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Trade Name:</span>
                      <span className="ml-2">{chemical.tradeName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">VOC:</span>
                      <span className="ml-2">{chemical.vocContent} g/L</span>
                    </div>
                    <div className="flex gap-2">
                      {chemical.reach && (
                        <Badge variant="outline" className="text-xs">
                          REACH
                        </Badge>
                      )}
                      {chemical.tsca && (
                        <Badge variant="outline" className="text-xs">
                          TSCA
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {chemical.hazardClass} • Supplier: {chemical.supplier}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  MSDS
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}