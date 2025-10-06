import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddFindingFormProps {
  auditId: string;
  onSuccess?: () => void;
}

export function AddFindingForm({ auditId, onSuccess }: AddFindingFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dueDate, setDueDate] = useState<Date>();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    findingNumber: "",
    title: "",
    description: "",
    severity: "",
    category: "",
    rootCause: "",
    recommendation: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.findingNumber || !formData.title || !formData.severity || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (!profile?.organization_id) throw new Error("No organization found");

      const { error } = await supabase
        .from('audit_findings')
        .insert({
          audit_id: auditId,
          finding_number: formData.findingNumber,
          title: formData.title,
          description: formData.description || null,
          severity: formData.severity,
          category: formData.category,
          root_cause: formData.rootCause || null,
          recommendation: formData.recommendation || null,
          due_date: dueDate ? format(dueDate, 'yyyy-MM-dd') : null,
          organization_id: profile.organization_id,
          created_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Finding Created",
        description: `Finding ${formData.findingNumber} has been documented.`,
      });
      
      setOpen(false);
      setFormData({
        findingNumber: "",
        title: "",
        description: "",
        severity: "",
        category: "",
        rootCause: "",
        recommendation: ""
      });
      setDueDate(undefined);
      
      onSuccess?.();
    } catch (error: any) {
      console.error('Error creating finding:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create finding.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Add Finding
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Document Audit Finding</DialogTitle>
          <DialogDescription>
            Record a new finding or observation from the audit
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="findingNumber">Finding Number *</Label>
              <Input
                id="findingNumber"
                value={formData.findingNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, findingNumber: e.target.value }))}
                placeholder="e.g., F-2024-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity *</Label>
              <Select 
                value={formData.severity} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Finding Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Brief description of the finding"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Internal Controls">Internal Controls</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
                <SelectItem value="Financial Reporting">Financial Reporting</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
                <SelectItem value="IT Security">IT Security</SelectItem>
                <SelectItem value="Risk Management">Risk Management</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed description of the finding, including evidence and impact"
              className="min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rootCause">Root Cause Analysis</Label>
            <Textarea
              id="rootCause"
              value={formData.rootCause}
              onChange={(e) => setFormData(prev => ({ ...prev, rootCause: e.target.value }))}
              placeholder="Analysis of the underlying cause of this finding"
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendation">Recommendation</Label>
            <Textarea
              id="recommendation"
              value={formData.recommendation}
              onChange={(e) => setFormData(prev => ({ ...prev, recommendation: e.target.value }))}
              placeholder="Recommended corrective actions"
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label>Remediation Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Select due date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} variant="destructive">
              {loading ? "Creating..." : "Create Finding"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}