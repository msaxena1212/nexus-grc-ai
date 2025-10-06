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
import { Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddAuditLogFormProps {
  auditId: string;
  onSuccess?: () => void;
}

export function AddAuditLogForm({ auditId, onSuccess }: AddAuditLogFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    logType: "",
    title: "",
    description: "",
    evidenceUrl: "",
    testResult: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.logType || !formData.title) {
      toast({
        title: "Validation Error",
        description: "Please fill in log type and title.",
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
        .from('audit_logs')
        .insert({
          audit_id: auditId,
          log_type: formData.logType,
          title: formData.title,
          description: formData.description || null,
          evidence_url: formData.evidenceUrl || null,
          test_result: formData.testResult || null,
          logged_by: user.id,
          organization_id: profile.organization_id
        });

      if (error) throw error;

      toast({
        title: "Log Created",
        description: "Audit log has been successfully recorded.",
      });
      
      setOpen(false);
      setFormData({
        logType: "",
        title: "",
        description: "",
        evidenceUrl: "",
        testResult: ""
      });
      
      onSuccess?.();
    } catch (error: any) {
      console.error('Error creating audit log:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create audit log.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Log
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Audit Log</DialogTitle>
          <DialogDescription>
            Document audit activities, tests, evidence, and findings
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logType">Log Type *</Label>
              <Select 
                value={formData.logType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, logType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select log type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="evidence">Evidence Collection</SelectItem>
                  <SelectItem value="test_execution">Test Execution</SelectItem>
                  <SelectItem value="finding">Finding</SelectItem>
                  <SelectItem value="meeting">Meeting/Interview</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="status_change">Status Change</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter log title"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the audit activity, observations, or notes"
              className="min-h-24"
            />
          </div>

          {formData.logType === 'test_execution' && (
            <div className="space-y-2">
              <Label htmlFor="testResult">Test Result</Label>
              <Select 
                value={formData.testResult} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, testResult: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select test result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passed">Passed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="not_applicable">Not Applicable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {(formData.logType === 'evidence' || formData.logType === 'test_execution') && (
            <div className="space-y-2">
              <Label htmlFor="evidenceUrl">Evidence URL/Reference</Label>
              <Input
                id="evidenceUrl"
                value={formData.evidenceUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, evidenceUrl: e.target.value }))}
                placeholder="Link to evidence document or file"
              />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Log"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}