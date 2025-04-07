
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, FileText, MessageSquare, AlertTriangle } from "lucide-react";

const notifications = [
  { 
    id: 1, 
    type: "note", 
    title: "Nouvelle note disponible", 
    description: "Mathématiques - Contrôle du 12/03", 
    date: "Aujourd'hui, 14:32",
    lu: false
  },
  { 
    id: 2, 
    type: "message", 
    title: "Message de M. Bernard", 
    description: "Concernant le projet d'histoire", 
    date: "Hier, 16:45",
    lu: false
  },
  { 
    id: 3, 
    type: "absence", 
    title: "Absence signalée", 
    description: "Cours de SVT du 15/03", 
    date: "15/03/2025, 09:15",
    lu: false
  },
  { 
    id: 4, 
    type: "document", 
    title: "Nouveau document disponible", 
    description: "Cours de Français - Fiche de révision", 
    date: "12/03/2025, 11:20",
    lu: true
  },
  { 
    id: 5, 
    type: "message", 
    title: "Message de Mme Dubois", 
    description: "Informations sur la sortie pédagogique", 
    date: "10/03/2025, 15:45",
    lu: true
  },
  { 
    id: 6, 
    type: "note", 
    title: "Nouvelle note disponible", 
    description: "Anglais - Expression écrite du 25/02", 
    date: "28/02/2025, 09:30",
    lu: true
  },
  { 
    id: 7, 
    type: "document", 
    title: "Nouveau document disponible", 
    description: "Histoire - Fiches de révision", 
    date: "25/02/2025, 14:15",
    lu: true
  },
  { 
    id: 8, 
    type: "absence", 
    title: "Retard signalé", 
    description: "Cours de Français du 28/02", 
    date: "28/02/2025, 10:10",
    lu: true
  },
];

const messages = notifications.filter(notif => notif.type === "message");
const documentsNotifs = notifications.filter(notif => notif.type === "document");
const notesNotifs = notifications.filter(notif => notif.type === "note");
const absencesNotifs = notifications.filter(notif => notif.type === "absence");

const getIcon = (type: string) => {
  switch (type) {
    case "note":
      return <FileText className="h-4 w-4 text-primary" />;
    case "message":
      return <MessageSquare className="h-4 w-4 text-green-500" />;
    case "absence":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "document":
      return <FileText className="h-4 w-4 text-blue-500" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const NotificationsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-2">
          Consultez vos notifications et messages.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{messages.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <Badge>{messages.filter(m => !m.lu).length} non lu(s)</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Notes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{notesNotifs.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <Badge>{notesNotifs.filter(n => !n.lu).length} non lu(s)</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Absences</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{absencesNotifs.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <Badge>{absencesNotifs.filter(a => !a.lu).length} non lu(s)</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{documentsNotifs.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <Badge>{documentsNotifs.filter(d => !d.lu).length} non lu(s)</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Toutes ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Non lues ({notifications.filter(n => !n.lu).length})</TabsTrigger>
          <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({documentsNotifs.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Toutes les notifications</CardTitle>
              <CardDescription>Liste de vos notifications récentes</CardDescription>
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
                    <div className="flex justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      {!notification.lu && <Badge variant="outline">Nouveau</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
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
              <CardDescription>Notifications que vous n'avez pas encore lues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.filter(n => !n.lu).map((notification) => (
                <div 
                  key={notification.id} 
                  className="p-4 border rounded-lg bg-primary/5 border-primary/20 flex items-start gap-4"
                >
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      <Badge variant="outline">Nouveau</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                  </div>
                </div>
              ))}
              {notifications.filter(n => !n.lu).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Aucune notification non lue</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Messages de vos enseignants et de l'administration</CardDescription>
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
                    <div className="flex justify-between">
                      <h3 className="font-medium">{message.title}</h3>
                      {!message.lu && <Badge variant="outline">Nouveau</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{message.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{message.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Notifications concernant les documents partagés</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {documentsNotifs.map((doc) => (
                <div 
                  key={doc.id} 
                  className={`p-4 border rounded-lg flex items-start gap-4 ${doc.lu ? '' : 'bg-primary/5 border-primary/20'}`}
                >
                  <div className="mt-1">
                    {getIcon(doc.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{doc.title}</h3>
                      {!doc.lu && <Badge variant="outline">Nouveau</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{doc.date}</p>
                    <Button variant="outline" size="sm" className="mt-2">Voir le document</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
