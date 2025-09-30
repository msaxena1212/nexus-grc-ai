import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AddLitigationFormProps {
  children?: React.ReactNode;
}

export function AddLitigationForm({ children }: AddLitigationFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trialDate, setTrialDate] = useState<Date>();
  const [dateOpened, setDateOpened] = useState<Date>(new Date());
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    matterType: "",
    priority: "",
    plaintiff: "",
    defendant: "",
    counsel: "",
    estimatedCost: "",
    jurisdiction: "",
    caseNumber: "",
    externalCounsel: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.matterType || !formData.plaintiff) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Legal Matter Created",
      description: `Legal matter "${formData.title}" has been successfully created and assigned to ${formData.counsel || formData.externalCounsel}.`,
    });
    
    setLoading(false);
    setOpen(false);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      matterType: "",
      priority: "",
      plaintiff: "",
      defendant: "",
      counsel: "",
      estimatedCost: "",
      jurisdiction: "",
      caseNumber: "",
      externalCounsel: ""
    });
    setTrialDate(undefined);
    setDateOpened(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Matter
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Legal Matter</DialogTitle>
          <DialogDescription>
            Register a new legal matter and set up case management. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Matter Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter matter title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="matterType">Matter Type *</Label>
              <Select value={formData.matterType} onValueChange={(value) => setFormData(prev => ({ ...prev, matterType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select matter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employment">Employment</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="ip">Intellectual Property</SelectItem>
                  <SelectItem value="regulatory">Regulatory</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="contract">Contract Dispute</SelectItem>
                  <SelectItem value="tort">Tort</SelectItem>
                  <SelectItem value="securities">Securities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Matter Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the legal matter, claims, and key issues"
              className="min-h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plaintiff">Plaintiff/Claimant *</Label>
              <Input
                id="plaintiff"
                value={formData.plaintiff}
                onChange={(e) => setFormData(prev => ({ ...prev, plaintiff: e.target.value }))}
                placeholder="Enter plaintiff name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defendant">Defendant</Label>
              <Input
                id="defendant"
                value={formData.defendant}
                onChange={(e) => setFormData(prev => ({ ...prev, defendant: e.target.value }))}
                placeholder="Enter defendant name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Input
                id="jurisdiction"
                value={formData.jurisdiction}
                onChange={(e) => setFormData(prev => ({ ...prev, jurisdiction: e.target.value }))}
                placeholder="e.g., New York State Court"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="caseNumber">Case Number</Label>
              <Input
                id="caseNumber"
                value={formData.caseNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, caseNumber: e.target.value }))}
                placeholder="Enter case number if assigned"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
              <Input
                id="estimatedCost"
                type="number"
                value={formData.estimatedCost}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedCost: e.target.value }))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="counsel">Assigned Counsel</Label>
            <Select value={formData.counsel} onValueChange={(value) => setFormData(prev => ({ ...prev, counsel: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select internal counsel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal Legal Team</SelectItem>
                <SelectItem value="general-counsel">General Counsel</SelectItem>
                <SelectItem value="associate-counsel">Associate Counsel</SelectItem>
                <SelectItem value="paralegal">Paralegal Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="externalCounsel">External Counsel</Label>
            <Input
              id="externalCounsel"
              value={formData.externalCounsel}
              onChange={(e) => setFormData(prev => ({ ...prev, externalCounsel: e.target.value }))}
              placeholder="Enter external law firm name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date Opened</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateOpened, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOpened}
                    onSelect={(date) => date && setDateOpened(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Trial Date (if known)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !trialDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {trialDate ? format(trialDate, "PPP") : <span>Select trial date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={trialDate}
                    onSelect={setTrialDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="gradient-primary">
              {loading ? "Creating..." : "Create Matter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}