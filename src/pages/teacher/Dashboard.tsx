
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Clock, MessageSquare, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord Enseignant</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue Mme Dubois. Voici un récapitulatif de votre journée.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4</div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">6ème A, 6ème B, 5ème A, 5ème B</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Évaluations à corriger</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">8</div>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Interrogations et devoirs maison</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">2 parents, 1 administration</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Absences non traitées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5</div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">À justifier ou signaler</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="col-span-6 md:col-span-4">
          <CardHeader>
            <CardTitle>Emploi du temps du jour</CardTitle>
            <CardDescription>Lundi, 5 mai 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-md bg-muted/30">
                <div className="w-16 text-center">
                  <div className="text-sm font-medium">08:00</div>
                  <div className="text-xs text-muted-foreground">09:00</div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Français - Cours</div>
                  <div className="text-sm text-muted-foreground">6ème A - Salle 102</div>
                </div>
                <Badge>En cours</Badge>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <div className="w-16 text-center">
                  <div className="text-sm font-medium">10:00</div>
                  <div className="text-xs text-muted-foreground">11:00</div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Français - Cours</div>
                  <div className="text-sm text-muted-foreground">6ème B - Salle 102</div>
                </div>
                <Badge variant="outline">À venir</Badge>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <div className="w-16 text-center">
                  <div className="text-sm font-medium">13:00</div>
                  <div className="text-xs text-muted-foreground">15:00</div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Français - Contrôle</div>
                  <div className="text-sm text-muted-foreground">5ème A - Salle 103</div>
                </div>
                <Badge variant="outline">À venir</Badge>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <div className="w-16 text-center">
                  <div className="text-sm font-medium">15:00</div>
                  <div className="text-xs text-muted-foreground">16:00</div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="font-medium">Français - Cours</div>
                  <div className="text-sm text-muted-foreground">5ème B - Salle 103</div>
                </div>
                <Badge variant="outline">À venir</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-6 md:col-span-2">
          <CardHeader>
            <CardTitle>À faire aujourd'hui</CardTitle>
            <CardDescription>Vos tâches prioritaires</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <CalendarCheck className="h-5 w-5 mt-0.5 mr-2 text-primary" />
                <div>
                  <p className="font-medium">Corriger les copies de 5ème B</p>
                  <p className="text-sm text-muted-foreground">Date limite: 07/05</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 mt-0.5 mr-2 text-primary" />
                <div>
                  <p className="font-medium">Saisir les absences 6ème A</p>
                  <p className="text-sm text-muted-foreground">Pour aujourd'hui</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 mt-0.5 mr-2 text-primary" />
                <div>
                  <p className="font-medium">Répondre aux messages des parents</p>
                  <p className="text-sm text-muted-foreground">2 messages non lus</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/enseignant/communication">
                <Button variant="secondary" size="sm" className="w-full">Voir toutes les tâches</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
