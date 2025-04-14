
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Book, Calendar, Clock, MessageSquare, Bell, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ParentDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenue, Sophie Dupont</h1>
        <p className="text-muted-foreground mt-2">
          Tableau de bord du parent de Martin Dupont, Classe: 3ème B
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Dernières notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathématiques</p>
                  <p className="text-sm text-muted-foreground">Contrôle sur les fonctions</p>
                </div>
                <Badge variant="success">15/20</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Français</p>
                  <p className="text-sm text-muted-foreground">Dissertation sur Molière</p>
                </div>
                <Badge variant="success">12/20</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Histoire-Géographie</p>
                  <p className="text-sm text-muted-foreground">Contrôle sur la Guerre Froide</p>
                </div>
                <Badge variant="success">16/20</Badge>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/parent/notes">
                <Button variant="outline" size="sm" className="w-full">
                  Voir toutes les notes
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Absences récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">15/03/2025</p>
                  <p className="text-sm text-muted-foreground">SVT - 2h</p>
                </div>
                <Badge variant="warning">Non justifiée</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">05/03/2025</p>
                  <p className="text-sm text-muted-foreground">Mathématiques - 1h</p>
                </div>
                <Badge variant="success">Justifiée</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">18/03/2025</p>
                  <p className="text-sm text-muted-foreground">Histoire-Géo - Retard 15min</p>
                </div>
                <Badge variant="warning">Non justifié</Badge>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/parent/absences">
                <Button variant="outline" size="sm" className="w-full">
                  Voir toutes les absences
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium">Absence non justifiée</p>
                  <p className="text-sm text-muted-foreground">SVT - 15/03/2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Book className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Nouvelle note disponible</p>
                  <p className="text-sm text-muted-foreground">Mathématiques - 15/20</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Message de M. Bernard</p>
                  <p className="text-sm text-muted-foreground">Concernant le projet d'histoire</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/parent/notifications">
                <Button variant="outline" size="sm" className="w-full">
                  Voir toutes les notifications
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendrier scolaire</CardTitle>
            <CardDescription>Prochains événements importants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Réunion parents-professeurs</p>
                  <p className="text-sm">22/03/2025 - 18h00 à 20h00</p>
                  <p className="text-sm text-muted-foreground">Salle polyvalente</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Conseil de classe - 3ème trimestre</p>
                  <p className="text-sm">15/04/2025 - 17h30</p>
                  <p className="text-sm text-muted-foreground">Salle de réunion</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Vacances de printemps</p>
                  <p className="text-sm">19/04/2025 au 05/05/2025</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/parent/calendrier">
                <Button variant="outline" size="sm" className="w-full">
                  Voir le calendrier complet
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Communication</CardTitle>
            <CardDescription>Contacter les enseignants ou l'administration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Enseignants de Martin</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">M. Martin</p>
                      <p className="text-sm text-muted-foreground">Mathématiques</p>
                    </div>
                    <Link to="/parent/communication?teacher=Martin">
                      <Button size="sm" variant="outline">Contacter</Button>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">M. Bernard</p>
                      <p className="text-sm text-muted-foreground">Français (Principal)</p>
                    </div>
                    <Link to="/parent/communication?teacher=Bernard">
                      <Button size="sm" variant="outline">Contacter</Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Administration</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Vie scolaire</p>
                      <p className="text-sm text-muted-foreground">Absences et discipline</p>
                    </div>
                    <Link to="/parent/communication?admin=vie-scolaire">
                      <Button size="sm" variant="outline">Contacter</Button>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Secrétariat</p>
                      <p className="text-sm text-muted-foreground">Questions administratives</p>
                    </div>
                    <Link to="/parent/communication?admin=secretariat">
                      <Button size="sm" variant="outline">Contacter</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/parent/communication">
                <Button variant="outline" size="sm" className="w-full">
                  Tous les contacts
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
