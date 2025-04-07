
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "./pages/Index";
import NotFound from "./pages/NotFound";
import NotesPage from "./pages/Notes";
import BulletinsPage from "./pages/Bulletins";
import EmploiDuTempsPage from "./pages/EmploiDuTemps";
import AbsencesPage from "./pages/Absences";
import NotificationsPage from "./pages/Notifications";
import DocumentsPage from "./pages/Documents";

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
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/bulletins" element={<BulletinsPage />} />
            <Route path="/emploi-du-temps" element={<EmploiDuTempsPage />} />
            <Route path="/absences" element={<AbsencesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
