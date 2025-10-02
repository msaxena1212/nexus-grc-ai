import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, TrendingUp, FileText } from "lucide-react";

interface RiskDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  risk: {
    id: string;
    title: string;
    category: string;
    owner: string;
    inherentRisk: string;
    residualRisk: string;
    probability: number;
    impact: number;
    lastReviewed: string;
    nextReview: string;
    status: string;
    description?: string;
    mitigation?: string;
  };
}

export function RiskDetailsDialog({ open, onOpenChange, risk }: RiskDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{risk.title}</DialogTitle>
          <DialogDescription>Risk ID: {risk.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{risk.category}</Badge>
            <Badge className={risk.status === 'Active' ? 'status-high' : 'status-medium'}>
              {risk.status}
            </Badge>
            <Badge className="status-info">
              Score: {risk.probability * risk.impact}
            </Badge>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </h4>
            <p className="text-sm text-muted-foreground">
              {risk.description || "This risk involves potential vulnerabilities in the system that could lead to unauthorized access or data breaches. Regular monitoring and mitigation strategies are in place."}
            </p>
          </div>

          {/* Risk Assessment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-1">Inherent Risk</div>
              <Badge className={risk.inherentRisk === 'High' ? 'status-high' : 'status-medium'}>
                {risk.inherentRisk}
              </Badge>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-1">Residual Risk</div>
              <Badge className={risk.residualRisk === 'High' ? 'status-high' : risk.residualRisk === 'Medium' ? 'status-medium' : 'status-low'}>
                {risk.residualRisk}
              </Badge>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-1">Probability</div>
              <div className="text-2xl font-bold">{risk.probability}/4</div>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-1">Impact</div>
              <div className="text-2xl font-bold">{risk.impact}/4</div>
            </div>
          </div>

          {/* Mitigation Plan */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Mitigation Plan
            </h4>
            <p className="text-sm text-muted-foreground">
              {risk.mitigation || "Implement enhanced security controls, conduct regular penetration testing, and provide ongoing security awareness training to all staff members."}
            </p>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Risk Owner</div>
                <div className="text-sm font-medium">{risk.owner}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Last Reviewed</div>
                <div className="text-sm font-medium">{risk.lastReviewed}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Next Review</div>
                <div className="text-sm font-medium">{risk.nextReview}</div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Edit Risk</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}