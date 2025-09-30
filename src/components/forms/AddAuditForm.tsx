import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface AddAuditFormProps {
  children?: React.ReactNode;
}

const teamMembers = [
  { id: "1", name: "Sarah Johnson", role: "Senior Auditor", email: "sarah.j@company.com" },
  { id: "2", name: "Mike Davis", role: "IT Auditor", email: "mike.d@company.com" },
  { id: "3", name: "Lisa Chen", role: "Compliance Specialist", email: "lisa.c@company.com" },
  { id: "4", name: "David Wilson", role: "Risk Analyst", email: "david.w@company.com" },
  { id: "5", name: "Emily Brown", role: "Junior Auditor", email: "emily.b@company.com" },
  { id: "6", name: "John Smith", role: "Lead Auditor", email: "john.s@company.com" },
];

export function AddAuditForm({ children }: AddAuditFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedAuditors, setSelectedAuditors] = useState<string[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    auditName: "",
    description: "",
    auditType: "",
    scope: "",
    objectives: "",
    riskRating: "",
    department: "",
    leadAuditor: "",
    budget: ""
  });

  const handleAuditorToggle = (auditorId: string) => {
    setSelectedAuditors(prev => 
      prev.includes(auditorId)
        ? prev.filter(id => id !== auditorId)
        : [...prev, auditorId]
    );
  };

  const removeAuditor = (auditorId: string) => {
    setSelectedAuditors(prev => prev.filter(id => id !== auditorId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.auditName || !formData.auditType || !formData.leadAuditor || selectedAuditors.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and assign at least one auditor.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const assignedAuditors = teamMembers.filter(member => selectedAuditors.includes(member.id));
    
    toast({
      title: "Audit Created",
      description: `Audit "${formData.auditName}" has been created and assigned to ${assignedAuditors.length} team members. Notifications sent to all assigned auditors.`,
    });
    
    setLoading(false);
    setOpen(false);
    
    // Reset form
    setFormData({
      auditName: "",
      description: "",
      auditType: "",
      scope: "",
      objectives: "",
      riskRating: "",
      department: "",
      leadAuditor: "",
      budget: ""
    });
    setSelectedAuditors([]);
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const selectedAuditorDetails = teamMembers.filter(member => selectedAuditors.includes(member.id));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Audit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Audit Engagement</DialogTitle>
          <DialogDescription>
            Plan a new audit engagement and assign team members. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="auditName">Audit Name *</Label>
              <Input
                id="auditName"
                value={formData.auditName}
                onChange={(e) => setFormData(prev => ({ ...prev, auditName: e.target.value }))}
                placeholder="Enter audit name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="auditType">Audit Type *</Label>
              <Select value={formData.auditType} onValueChange={(value) => setFormData(prev => ({ ...prev, auditType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal Audit</SelectItem>
                  <SelectItem value="external">External Audit</SelectItem>
                  <SelectItem value="compliance">Compliance Audit</SelectItem>
                  <SelectItem value="financial">Financial Audit</SelectItem>
                  <SelectItem value="operational">Operational Audit</SelectItem>
                  <SelectItem value="it">IT Audit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Audit Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the audit purpose and context"
              className="min-h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department/Area</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="procurement">Procurement</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="all">Enterprise-wide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="riskRating">Risk Rating</Label>
              <Select value={formData.riskRating} onValueChange={(value) => setFormData(prev => ({ ...prev, riskRating: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scope">Audit Scope</Label>
            <Textarea
              id="scope"
              value={formData.scope}
              onChange={(e) => setFormData(prev => ({ ...prev, scope: e.target.value }))}
              placeholder="Define the audit scope, areas to be covered, and limitations"
              className="min-h-16"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectives">Audit Objectives</Label>
            <Textarea
              id="objectives"
              value={formData.objectives}
              onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
              placeholder="Define specific audit objectives and goals"
              className="min-h-16"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "MMM dd, yyyy") : <span>Start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "MMM dd, yyyy") : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="leadAuditor">Lead Auditor *</Label>
            <Select value={formData.leadAuditor} onValueChange={(value) => setFormData(prev => ({ ...prev, leadAuditor: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select lead auditor" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name} - {member.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Assign Audit Team Members *</Label>
            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border rounded-md p-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={member.id}
                    checked={selectedAuditors.includes(member.id)}
                    onCheckedChange={() => handleAuditorToggle(member.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <label htmlFor={member.id} className="text-sm font-medium cursor-pointer">
                      {member.name}
                    </label>
                    <div className="text-xs text-muted-foreground">
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedAuditorDetails.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Team Members ({selectedAuditorDetails.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedAuditorDetails.map((member) => (
                    <Badge key={member.id} variant="secondary" className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {member.name}
                      <button
                        type="button"
                        onClick={() => removeAuditor(member.id)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="gradient-primary">
              {loading ? "Creating Audit..." : "Create Audit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}