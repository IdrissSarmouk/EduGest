
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Calendar, Clock, Bell, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue dans votre espace élève. Consultez vos informations scolaires.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Prochains cours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathématiques</p>
                  <p className="text-xs text-muted-foreground">Salle 204 - M. Martin</p>
                </div>
                <Badge>8h00 - 9h00</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Histoire-Géo</p>
                  <p className="text-xs text-muted-foreground">Salle 103 - Mme Dubois</p>
                </div>
                <Badge>9h00 - 10h00</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Français</p>
                  <p className="text-xs text-muted-foreground">Salle 301 - M. Bernard</p>
                </div>
                <Badge>10h15 - 11h15</Badge>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto mt-4 w-full justify-end" asChild>
              <Link to="/emploi-du-temps" className="flex items-center text-xs text-primary">
                Voir l'emploi du temps complet
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Dernières notes</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathématiques</p>
                  <p className="text-xs text-muted-foreground">Contrôle du 12/03</p>
                </div>
                <Badge variant={parseInt("15") >= 10 ? "success" : "destructive"}>15/20</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Français</p>
                  <p className="text-xs text-muted-foreground">Dictée du 10/03</p>
                </div>
                <Badge variant={parseInt("12") >= 10 ? "success" : "destructive"}>12/20</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">SVT</p>
                  <p className="text-xs text-muted-foreground">TP du 08/03</p>
                </div>
                <Badge variant={parseInt("16") >= 10 ? "success" : "destructive"}>16/20</Badge>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto mt-4 w-full justify-end" asChild>
              <Link to="/notes" className="flex items-center text-xs text-primary">
                Voir toutes les notes
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Notifications récentes</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-sm">Nouvelle note disponible</p>
                <p className="text-xs text-muted-foreground">Mathématiques - Contrôle du 12/03</p>
                <p className="text-xs text-muted-foreground">Aujourd'hui, 14:32</p>
              </div>
              <div>
                <p className="font-medium text-sm">Message de M. Bernard</p>
                <p className="text-xs text-muted-foreground">Concernant le projet d'histoire</p>
                <p className="text-xs text-muted-foreground">Hier, 16:45</p>
              </div>
              <div>
                <p className="font-medium text-sm">Absence signalée</p>
                <p className="text-xs text-muted-foreground">Cours de SVT du 15/03</p>
                <p className="text-xs text-muted-foreground">15/03/2025, 09:15</p>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto mt-4 w-full justify-end" asChild>
              <Link to="/notifications" className="flex items-center text-xs text-primary">
                Voir toutes les notifications
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Absences & Retards</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-md text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Absences ce trimestre</p>
                </div>
                <div className="bg-muted p-3 rounded-md text-center">
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">Retards ce trimestre</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Dernière absence :</p>
                <p className="text-xs text-muted-foreground">SVT - 15/03/2025</p>
                <p className="text-xs mt-2 font-medium">Statut :</p>
                <Badge variant="warning" className="mt-1">En attente de justification</Badge>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto mt-4 w-full justify-end" asChild>
              <Link to="/absences" className="flex items-center text-xs text-primary">
                Voir toutes les absences
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Bulletins scolaires</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Trimestre 1</p>
                    <p className="text-xs text-muted-foreground">2024-2025</p>
                  </div>
                  <Button size="sm" variant="outline">Télécharger</Button>
                </div>
                <div className="mt-2 text-xs">
                  <p className="font-medium">Moyenne générale : <span className="text-primary">14.5/20</span></p>
                  <p className="text-muted-foreground mt-1">Publié le 15/12/2024</p>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Trimestre 2</p>
                    <p className="text-xs text-muted-foreground">2024-2025</p>
                  </div>
                  <Button size="sm" variant="outline">Télécharger</Button>
                </div>
                <div className="mt-2 text-xs">
                  <p className="font-medium">Moyenne générale : <span className="text-primary">15.2/20</span></p>
                  <p className="text-muted-foreground mt-1">Publié le 15/03/2025</p>
                </div>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto mt-4 w-full justify-end" asChild>
              <Link to="/bulletins" className="flex items-center text-xs text-primary">
                Voir tous les bulletins
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
