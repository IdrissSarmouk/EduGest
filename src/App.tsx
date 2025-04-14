
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
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEnseignants from "./pages/admin/Enseignants";
import AdminEleves from "./pages/admin/Eleves";
import AdminEmploiDuTemps from "./pages/admin/EmploiDuTemps";
import AdminAbsences from "./pages/admin/Absences";
import AdminCommunication from "./pages/admin/Communication";
import ParentLayout from "./components/ParentLayout";
import ParentDashboard from "./pages/parent/Dashboard";
import ParentNotes from "./pages/parent/Notes";
import ParentBulletins from "./pages/parent/Bulletins";
import ParentAbsences from "./pages/parent/Absences";
import ParentCalendrier from "./pages/parent/Calendrier";
import ParentCommunication from "./pages/parent/Communication";
import ParentNotifications from "./pages/parent/Notifications";

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
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="enseignants" element={<AdminEnseignants />} />
            <Route path="eleves" element={<AdminEleves />} />
            <Route path="emploi-du-temps" element={<AdminEmploiDuTemps />} />
            <Route path="absences" element={<AdminAbsences />} />
            <Route path="communication" element={<AdminCommunication />} />
          </Route>
          <Route path="/parent" element={<ParentLayout />}>
            <Route index element={<ParentDashboard />} />
            <Route path="notes" element={<ParentNotes />} />
            <Route path="bulletins" element={<ParentBulletins />} />
            <Route path="absences" element={<ParentAbsences />} />
            <Route path="calendrier" element={<ParentCalendrier />} />
            <Route path="communication" element={<ParentCommunication />} />
            <Route path="notifications" element={<ParentNotifications />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
