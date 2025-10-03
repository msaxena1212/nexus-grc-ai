import { useMemo, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Shield, 
  FileCheck, 
  Search, 
  Scale, 
  FileText, 
  AlertTriangle,
  BarChart3,
  Settings, 
  Menu,
  X,
  Home,
  Beaker,
  Droplets,
  Package,
  Building2,
  Users,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Risk Management", href: "/risk", icon: Shield },
  { name: "Compliance", href: "/compliance", icon: FileCheck },
  { name: "Audit", href: "/audit", icon: Search },
  { name: "Litigation", href: "/litigation", icon: Scale },
  { name: "Policy", href: "/policy", icon: FileText },
  { name: "Incidents", href: "/incidents", icon: AlertTriangle },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Chemicals", href: "/chemicals", icon: Beaker },
  { name: "Environmental", href: "/environmental", icon: Droplets },
  { name: "Products", href: "/products", icon: Package },
  { name: "Organizations", href: "/organizations", icon: Building2 },
  { name: "Users", href: "/users", icon: Users },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();
  const { role } = useUserRole();
  const filteredNav = useMemo(() => {
    if (role === 'audit_manager') {
      const allowed = new Set(['Dashboard', 'Risk Management', 'Compliance', 'Audit']);
      return NAV_ITEMS.filter((item) => allowed.has(item.name));
    }
    return NAV_ITEMS;
  }, [role]);
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">GRC Platform</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {filteredNav.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={signOut}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 lg:flex-none">
              <h1 className="text-2xl font-semibold text-foreground">
                {filteredNav.find(item => item.href === location.pathname)?.name || "GRC Platform"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}