
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle,
  Clock,
  Trash2,
  Mail,
  FileText,
  Calendar,
  MessageSquare,
  User,
} from "lucide-react";

// Données des notifications
const notifications = [
  {
    id: 1,
    type: "message",
    title: "Nouveau message de M. et Mme Dupont",
    content: "Bonjour Mme Dubois, pouvons-nous discuter des progrès de Martin en français ?",
    date: "Aujourd'hui, 10:23",
    read: false,
    priority: "normal"
  },
  {
    id: 2,
    type: "message",
    title: "Nouveau message de Mme Martin",
    content: "Pourriez-vous m'envoyer les exercices que Léa a manqués pendant son absence ?",
    date: "Hier, 16:45",
    read: false,
    priority: "normal"
  },
  {
    id: 3,
    type: "event",
    title: "Rappel : Conseil de classe",
    content: "Le conseil de classe de 6ème A aura lieu lundi prochain à 17h00, salle de réunion.",
    date: "02/05/2025",
    read: true,
    priority: "high"
  },
  {
    id: 4,
    type: "task",
    title: "Saisie des notes à faire",
    content: "N'oubliez pas de saisir les notes du contrôle de grammaire de 6ème A avant le 08/05.",
    date: "02/05/2025",
    read: true,
    priority: "high"
  },
  {
    id: 5,
    type: "absence",
    title: "Absence à valider",
    content: "L'absence de Lucas Bernard du 25/04 est en attente de validation.",
    date: "30/04/2025",
    read: true,
    priority: "normal"
  },
  {
    id: 6,
    type: "admin",
    title: "Rappel de l'administration",
    content: "La remise des bulletins du 2ème trimestre doit être effectuée avant le 15/05.",
    date: "29/04/2025",
    read: true,
    priority: "high"
  },
  {
    id: 7,
    type: "system",
    title: "Mise à jour du système",
    content: "Une mise à jour de l'Espace Numérique de Travail a été effectuée ce week-end.",
    date: "28/04/2025",
    read: true,
    priority: "low"
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "message":
      return <Mail className="h-5 w-5 text-blue-500" />;
    case "event":
      return <Calendar className="h-5 w-5 text-purple-500" />;
    case "task":
      return <FileText className="h-5 w-5 text-amber-500" />;
    case "absence":
      return <Clock className="h-5 w-5 text-red-500" />;
    case "admin":
      return <User className="h-5 w-5 text-green-500" />;
    case "system":
      return <Bell className="h-5 w-5 text-gray-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const TeacherNotifications = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [notificationsState, setNotificationsState] = useState(notifications);

  // Filtrer les notifications en fonction de l'onglet sélectionné
  const filteredNotifications = notificationsState.filter((notification) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "unread") return !notification.read;
    return notification.type === selectedTab;
  });

  // Nombre de notifications non lues
  const unreadCount = notificationsState.filter(n => !n.read).length;

  // Marquer une notification comme lue
  const markAsRead = (id: number) => {
    setNotificationsState((prevState) =>
      prevState.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotificationsState((prevState) =>
      prevState.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Supprimer une notification
  const deleteNotification = (id: number) => {
    setNotificationsState((prevState) =>
      prevState.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les notifications et les alertes de votre espace enseignant.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <Badge variant="secondary">{notificationsState.length} notifications</Badge>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} non lues</Badge>
          )}
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="mb-4 grid grid-cols-4 md:grid-cols-7">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="unread">Non lues</TabsTrigger>
          <TabsTrigger value="message">Messages</TabsTrigger>
          <TabsTrigger value="task">Tâches</TabsTrigger>
          <TabsTrigger value="event">Événements</TabsTrigger>
          <TabsTrigger value="absence">Absences</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          <Card>
            <CardHeader>
              <CardTitle>Notifications {selectedTab !== "all" && selectedTab !== "unread" ? 
                (selectedTab === "message" ? "- Messages" : 
                 selectedTab === "task" ? "- Tâches" :
                 selectedTab === "event" ? "- Événements" :
                 selectedTab === "absence" ? "- Absences" :
                 selectedTab === "admin" ? "- Administration" : "")
                : ""}</CardTitle>
              <CardDescription>
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""} {selectedTab === "unread" ? "non lue" + (filteredNotifications.length !== 1 ? "s" : "") : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex gap-4 p-4 rounded-lg border ${!notification.read ? "bg-muted/50" : ""}`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className={`font-medium ${!notification.read ? "text-primary" : ""}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">{notification.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.content}</p>
                        <div className="flex gap-2 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            disabled={notification.read}
                          >
                            <CheckCircle className="mr-1 h-3.5 w-3.5" />
                            Marquer comme lu
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="mr-1 h-3.5 w-3.5" />
                            Supprimer
                          </Button>
                          {notification.type === "message" && (
                            <Button variant="secondary" size="sm">
                              <MessageSquare className="mr-1 h-3.5 w-3.5" />
                              Répondre
                            </Button>
                          )}
                        </div>
                      </div>
                      {notification.priority === "high" && (
                        <Badge className="h-fit self-start" variant="destructive">Prioritaire</Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Aucune notification</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Vous n'avez pas de notification{selectedTab === "unread" ? " non lue" : ""} pour le moment.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de notification</CardTitle>
          <CardDescription>Gérez vos préférences de notification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Messages des parents</h3>
                <p className="text-sm text-muted-foreground">Recevoir les notifications pour les nouveaux messages</p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="messages"
                  aria-describedby="messages-description"
                  name="messages"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Événements du calendrier</h3>
                <p className="text-sm text-muted-foreground">Recevoir des rappels pour les événements à venir</p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="events"
                  aria-describedby="events-description"
                  name="events"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Absences des élèves</h3>
                <p className="text-sm text-muted-foreground">Être notifié des nouvelles absences à valider</p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="absences"
                  aria-describedby="absences-description"
                  name="absences"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Communications administratives</h3>
                <p className="text-sm text-muted-foreground">Recevoir les notifications de l'administration</p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="admin"
                  aria-describedby="admin-description"
                  name="admin"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Mises à jour du système</h3>
                <p className="text-sm text-muted-foreground">Être informé des mises à jour de l'application</p>
              </div>
              <div className="flex items-center h-5">
                <input
                  id="system"
                  aria-describedby="system-description"
                  name="system"
                  type="checkbox"
                  defaultChecked={false}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button>Enregistrer les préférences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherNotifications;
