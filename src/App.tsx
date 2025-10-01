import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Risk from "./pages/Risk";
import Compliance from "./pages/Compliance";
import Audit from "./pages/Audit";
import Litigation from "./pages/Litigation";
import Policy from "./pages/Policy";
import Incidents from "./pages/Incidents";
import Analytics from "./pages/Analytics";
import ChemicalManagement from "./pages/ChemicalManagement";
import Environmental from "./pages/Environmental";
import ProductStewardship from "./pages/ProductStewardship";
import Organizations from "./pages/Organizations";
import UserManagement from "./pages/UserManagement";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="risk" element={<Risk />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="audit" element={<Audit />} />
            <Route path="litigation" element={<Litigation />} />
            <Route path="policy" element={<Policy />} />
            <Route path="incidents" element={<Incidents />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="chemicals" element={<ChemicalManagement />} />
            <Route path="environmental" element={<Environmental />} />
            <Route path="products" element={<ProductStewardship />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
