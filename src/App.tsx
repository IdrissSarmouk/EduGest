
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "./pages/Index";
import NotFound from "./pages/NotFound";
import NotesPage from "./pages/Notes";
import BulletinsPage from "./pages/Bulletins";
import EmploiDuTempsPage from "./pages/EmploiDuTemps";
import AbsencesPage from "./pages/Absences";
import DocumentsPage from "./pages/Documents";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEnseignants from "./pages/admin/Enseignants";
import AdminEleves from "./pages/admin/Eleves";
import AdminEmploiDuTemps from "./pages/admin/EmploiDuTemps";
import AdminAbsences from "./pages/admin/Absences";
import AdminCommunication from "./pages/admin/Communication";
import AdminReunions from "./pages/admin/Reunions";
import ParentLayout from "./components/ParentLayout";
import ParentDashboard from "./pages/parent/Dashboard";
import ParentNotes from "./pages/parent/Notes";
import ParentBulletins from "./pages/parent/Bulletins";
import ParentAbsences from "./pages/parent/Absences";
import ParentCalendrier from "./pages/parent/Calendrier";
import ParentCommunication from "./pages/parent/Communication";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import de l'espace enseignant
import TeacherLayout from "./components/TeacherLayout";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherNotes from "./pages/teacher/Notes";
import TeacherBulletins from "./pages/teacher/Bulletins";
import TeacherAbsences from "./pages/teacher/Absences";
import TeacherEleves from "./pages/teacher/Eleves";
import TeacherCommunication from "./pages/teacher/Communication";
import TeacherDocuments from "./pages/teacher/Documents";
import TeacherCalendrier from "./pages/teacher/Calendrier";
import TeacherProfil from "./pages/teacher/Profil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Student routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/bulletins" element={<BulletinsPage />} />
                <Route path="/emploi-du-temps" element={<EmploiDuTempsPage />} />
                <Route path="/absences" element={<AbsencesPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
              </Route>
            </Route>
            
            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="enseignants" element={<AdminEnseignants />} />
                <Route path="eleves" element={<AdminEleves />} />
                <Route path="emploi-du-temps" element={<AdminEmploiDuTemps />} />
                <Route path="absences" element={<AdminAbsences />} />
                <Route path="communication" element={<AdminCommunication />} />
                <Route path="reunions" element={<AdminReunions />} />
              </Route>
            </Route>
            
            {/* Teacher routes */}
            <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
              <Route path="/enseignant" element={<TeacherLayout />}>
                <Route index element={<TeacherDashboard />} />
                <Route path="notes" element={<TeacherNotes />} />
                <Route path="bulletins" element={<TeacherBulletins />} />
                <Route path="absences" element={<TeacherAbsences />} />
                <Route path="eleves" element={<TeacherEleves />} />
                <Route path="communication" element={<TeacherCommunication />} />
                <Route path="documents" element={<TeacherDocuments />} />
                <Route path="calendrier" element={<TeacherCalendrier />} />
                <Route path="profil" element={<TeacherProfil />} />
              </Route>
            </Route>
            
            {/* Parent routes */}
            <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
              <Route path="/parent" element={<ParentLayout />}>
                <Route index element={<ParentDashboard />} />
                <Route path="notes" element={<ParentNotes />} />
                <Route path="bulletins" element={<ParentBulletins />} />
                <Route path="absences" element={<ParentAbsences />} />
                <Route path="calendrier" element={<ParentCalendrier />} />
                <Route path="communication" element={<ParentCommunication />} />
              </Route>
            </Route>
            
            {/* Student sections accessible to parents */}
            <Route element={<ProtectedRoute allowedRoles={['parent']} redirectTo="/parent" />}>
              <Route path="/eleve" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="bulletins" element={<BulletinsPage />} />
                <Route path="emploi-du-temps" element={<EmploiDuTempsPage />} />
                <Route path="absences" element={<AbsencesPage />} />
                <Route path="documents" element={<DocumentsPage />} />
              </Route>
            </Route>
            
            {/* Redirect to login if not authenticated */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
