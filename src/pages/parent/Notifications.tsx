
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, FileText, MessageSquare, AlertTriangle, GraduationCap, Calendar } from "lucide-react";

const notifications = [
  { 
    id: 1, 
    type: "absence", 
    title: "Absence non justifiée", 
    description: "Cours de SVT du 15/03", 
    date: "15/03/2025, 16:30",
    importance: "high",
    lu: false
  },
  { 
    id: 2, 
    type: "note", 
    title: "Nouvelle note disponible", 
    description: "Mathématiques - Contrôle sur les fonctions - 15/20", 
    date: "14/03/2025, 10:15",
    importance: "medium",
    lu: false
  },
  { 
    id: 3, 
    type: "message", 
    title: "Message de M. Bernard", 
    description: "Concernant le projet d'écriture", 
    date: "13/03/2025, 17:45",
    importance: "medium",
    lu: false
  },
  { 
    id: 4, 
    type: "document", 
    title: "Document important", 
    description: "Autorisation sortie pédagogique du 10/04", 
    date: "10/03/2025, 14:20",
    importance: "high",
    lu: true
  },
  { 
    id: 5, 
    type: "reunion", 
    title: "Rappel réunion parents-professeurs", 
    description: "Le 22/03 de 18h à 20h", 
    date: "08/03/2025, 09:00",
    importance: "medium",
    lu: true
  },
  { 
    id: 6, 
    type: "absence", 
    title: "Retard signalé", 
    description: "Cours de Français du 10/03 - 10min", 
    date: "10/03/2025, 08:15",
    importance: "low",
    lu: true
  },
  { 
    id: 7, 
    type: "discipline", 
    title: "Incident disciplinaire", 
    description: "Bavardages répétés en cours d'Anglais", 
    date: "05/03/2025, 16:30",
    importance: "high",
    lu: true
  },
  { 
    id: 8, 
    type: "event", 
    title: "Brevet blanc", 
    description: "Les 25 et 26 mars 2025", 
    date: "01/03/2025, 10:00",
    importance: "medium",
    lu: true
  },
];

// Filtres des notifications par type
const absences = notifications.filter(notif => notif.type === "absence");
const notes = notifications.filter(notif => notif.type === "note");
const messages = notifications.filter(notif => notif.type === "message");
const nonLues = notifications.filter(notif => !notif.lu);
const importantes = notifications.filter(notif => notif.importance === "high");

// Fonction pour obtenir l'icône en fonction du type de notification
const getIcon = (type: string) => {
  switch (type) {
    case "note":
      return <FileText className="h-4 w-4 text-primary" />;
    case "message":
      return <MessageSquare className="h-4 w-4 text-green-500" />;
    case "absence":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "discipline":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "document":
      return <FileText className="h-4 w-4 text-blue-500" />;
    case "reunion":
      return <Calendar className="h-4 w-4 text-indigo-500" />;
    case "event":
      return <GraduationCap className="h-4 w-4 text-purple-500" />;
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
};

// Fonction pour obtenir la couleur de priorité
const getPriorityBadge = (importance: string) => {
  switch (importance) {
    case "high":
      return <Badge variant="destructive">Importante</Badge>;
    case "medium":
      return <Badge variant="secondary">Moyenne</Badge>;
    case "low":
      return <Badge variant="outline">Faible</Badge>;
    default:
      return null;
  }
};

const ParentNotifications = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-2">
          Restez informé des événements importants concernant la scolarité de votre enfant.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Non lues</CardTitle>
              <Bell className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{nonLues.length}</p>
                <p className="text-xs text-muted-foreground">Notifications</p>
              </div>
              <Badge>{nonLues.length > 0 ? "À consulter" : "Aucune"}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Importantes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{importantes.length}</p>
                <p className="text-xs text-muted-foreground">Notifications</p>
              </div>
              <Badge variant="destructive">{importantes.length > 0 ? "Prioritaires" : "Aucune"}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Absences</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{absences.length}</p>
                <p className="text-xs text-muted-foreground">Notifications</p>
              </div>
              <Badge variant="warning">{absences.filter(a => !a.lu).length > 0 ? "Nouvelles" : "Aucune nouvelle"}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Notes</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{notes.length}</p>
                <p className="text-xs text-muted-foreground">Notifications</p>
              </div>
              <Badge variant="success">{notes.filter(n => !n.lu).length > 0 ? "Nouvelles" : "Aucune nouvelle"}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Toutes ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Non lues ({nonLues.length})</TabsTrigger>
          <TabsTrigger value="important">Importantes ({importantes.length})</TabsTrigger>
          <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les notifications</CardTitle>
              <CardDescription>Historique complet des notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border rounded-lg flex items-start gap-4 ${notification.lu ? '' : 'bg-primary/5 border-primary/20'}`}
                >
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{notification.title}</h3>
                          {!notification.lu && <Badge variant="outline">Nouveau</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      {getPriorityBadge(notification.importance)}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">{notification.date}</p>
                      {!notification.lu && (
                        <Button size="sm" variant="outline">Marquer comme lu</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button variant="outline">Marquer tout comme lu</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Notifications non lues</CardTitle>
              <CardDescription>Notifications que vous n'avez pas encore consultées</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nonLues.map((notification) => (
                <div 
                  key={notification.id} 
                  className="p-4 border rounded-lg bg-primary/5 border-primary/20 flex items-start gap-4"
                >
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{notification.title}</h3>
                          <Badge variant="outline">Nouveau</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      {getPriorityBadge(notification.importance)}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">{notification.date}</p>
                      <Button size="sm" variant="outline">Marquer comme lu</Button>
                    </div>
                  </div>
                </div>
              ))}
              {nonLues.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Aucune notification non lue</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="important">
          <Card>
            <CardHeader>
              <CardTitle>Notifications importantes</CardTitle>
              <CardDescription>Informations prioritaires à traiter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {importantes.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border rounded-lg flex items-start gap-4 ${notification.lu ? '' : 'bg-primary/5 border-primary/20'}`}
                >
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{notification.title}</h3>
                          {!notification.lu && <Badge variant="outline">Nouveau</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <Badge variant="destructive">Importante</Badge>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">{notification.date}</p>
                      {!notification.lu && (
                        <Button size="sm" variant="outline">Marquer comme lu</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {importantes.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Aucune notification importante</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Messages des enseignants et de l'administration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 border rounded-lg flex items-start gap-4 ${message.lu ? '' : 'bg-primary/5 border-primary/20'}`}
                >
                  <div className="mt-1">
                    {getIcon(message.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{message.title}</h3>
                          {!message.lu && <Badge variant="outline">Nouveau</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{message.description}</p>
                      </div>
                      {getPriorityBadge(message.importance)}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">{message.date}</p>
                      <div className="space-x-2">
                        {!message.lu && (
                          <Button size="sm" variant="outline">Marquer comme lu</Button>
                        )}
                        <Button size="sm">Répondre</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Aucun message</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentNotifications;
