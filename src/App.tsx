import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Risk from "./pages/Risk";
import Compliance from "./pages/Compliance";
import Audit from "./pages/Audit";
import Litigation from "./pages/Litigation";
import Policy from "./pages/Policy";
import Incidents from "./pages/Incidents";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="risk" element={<Risk />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="audit" element={<Audit />} />
            <Route path="litigation" element={<Litigation />} />
            <Route path="policy" element={<Policy />} />
            <Route path="incidents" element={<Incidents />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
