
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Clock, Bell, Calendar } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
        <p className="text-muted-foreground">
          Bienvenue sur le tableau de bord de l'administration.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves inscrits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,256</div>
            <p className="text-xs text-muted-foreground">
              +12 nouveaux ce mois
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes actives</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              6 niveaux scolaires
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absences non justifiées</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Cette semaine
            </p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mt-8 mb-4">Événements à venir</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Conseil de classe</CardTitle>
            <CardDescription>3ème A - Premier trimestre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              <span>15 avril 2025 - 17h00</span>
            </div>
            <Badge variant="outline">À venir</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Réunion pédagogique</CardTitle>
            <CardDescription>Équipe enseignante de mathématiques</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4" />
              <span>18 avril 2025 - 14h30</span>
            </div>
            <Badge variant="outline">À venir</Badge>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mt-8 mb-4">Notifications récentes</h2>
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            <li className="flex items-start gap-4 p-4">
              <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Nouveaux élèves inscrits</p>
                <p className="text-sm text-muted-foreground">12 nouveaux élèves ont été inscrits ce mois-ci.</p>
                <p className="text-xs text-muted-foreground mt-1">Il y a 2 heures</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4">
              <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Demandes d'absences à justifier</p>
                <p className="text-sm text-muted-foreground">8 absences attendent votre approbation.</p>
                <p className="text-xs text-muted-foreground mt-1">Il y a 4 heures</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4">
              <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Planification des conseils de classe</p>
                <p className="text-sm text-muted-foreground">Les conseils de classe du premier trimestre doivent être planifiés.</p>
                <p className="text-xs text-muted-foreground mt-1">Il y a 1 jour</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
