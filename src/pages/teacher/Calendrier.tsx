
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

// Données des événements
const events = [
  {
    id: 1,
    title: "Contrôle de grammaire",
    date: "2025-05-08",
    time: "10:00",
    type: "evaluation",
    class: ["6ème A"],
    location: "Salle 102",
  },
  {
    id: 2,
    title: "Conseil de classe",
    date: "2025-05-12",
    time: "17:00",
    type: "meeting",
    class: ["6ème A"],
    location: "Salle de réunion"
  },
  {
    id: 3,
    title: "Réunion parents-profs",
    date: "2025-05-15",
    time: "18:00",
    type: "meeting",
    class: ["all"],
    location: "Salle polyvalente"
  },
  {
    id: 4,
    title: "Sortie théâtre",
    date: "2025-05-16",
    time: "14:00",
    type: "event",
    class: ["5ème A", "5ème B"],
    location: "Théâtre municipal"
  },
  {
    id: 5,
    title: "Formation numérique",
    date: "2025-05-20",
    time: "09:00",
    type: "formation",
    class: ["staff"],
    location: "Salle informatique"
  }
];

// Fonction pour obtenir les événements d'un jour spécifique
const getEventsForDay = (date: Date) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  return events.filter(event => event.date === formattedDate);
};

// Fonction pour formatter la date en français
const formatDateFr = (date: Date) => {
  return format(date, "EEEE d MMMM yyyy", { locale: fr }).replace(/^\w/, c => c.toUpperCase());
};

const TeacherCalendrier = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState("month");
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "evaluation",
    class: "",
    location: "",
  });

  // Événements du jour sélectionné
  const dayEvents = getEventsForDay(selectedDate);

  // Fonction pour gérer l'ajout d'un nouvel événement
  const handleAddEvent = () => {
    // Logique pour ajouter l'événement
    setIsAddEventDialogOpen(false);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "evaluation",
      class: "",
      location: "",
    });
  };

  // Fonction pour obtenir la couleur de l'événement selon son type
  const getEventColor = (type: string) => {
    switch (type) {
      case "evaluation":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "meeting":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "event":
        return "bg-green-100 text-green-800 border-green-300";
      case "formation":
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendrier</h1>
        <p className="text-muted-foreground mt-2">
          Gérez votre emploi du temps et vos événements scolaires.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Vue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mois</SelectItem>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="day">Jour</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(newDate.getDate() - (viewType === "month" ? 30 : viewType === "week" ? 7 : 1));
              setSelectedDate(newDate);
            }}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">
              {viewType === "day" ? formatDateFr(selectedDate) : 
               viewType === "week" ? `Semaine du ${format(selectedDate, "d MMMM", { locale: fr })}` :
               format(selectedDate, "MMMM yyyy", { locale: fr }).replace(/^\w/, c => c.toUpperCase())}
            </div>
            <Button variant="outline" size="icon" onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(newDate.getDate() + (viewType === "month" ? 30 : viewType === "week" ? 7 : 1));
              setSelectedDate(newDate);
            }}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un événement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un événement</DialogTitle>
              <DialogDescription>
                Créez un nouvel événement dans votre calendrier.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Titre</label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Titre de l'événement"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Heure</label>
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select 
                  value={newEvent.type} 
                  onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="evaluation">Évaluation</SelectItem>
                    <SelectItem value="meeting">Réunion</SelectItem>
                    <SelectItem value="event">Événement</SelectItem>
                    <SelectItem value="formation">Formation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Classe</label>
                <Select 
                  value={newEvent.class} 
                  onValueChange={(value) => setNewEvent({ ...newEvent, class: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6A">6ème A</SelectItem>
                    <SelectItem value="6B">6ème B</SelectItem>
                    <SelectItem value="5A">5ème A</SelectItem>
                    <SelectItem value="5B">5ème B</SelectItem>
                    <SelectItem value="all">Toutes les classes</SelectItem>
                    <SelectItem value="staff">Personnel uniquement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Lieu</label>
                <Input
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Lieu de l'événement"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleAddEvent}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
            <CardDescription>
              {viewType === "month" ? "Vue du mois" : viewType === "week" ? "Vue de la semaine" : "Vue du jour"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-3">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                locale={fr}
                className="rounded-md border"
                modifiersClassNames={{
                  selected: "bg-primary text-primary-foreground",
                }}
                modifiers={{
                  event: (date) => events.some(event => event.date === format(date, "yyyy-MM-dd"))
                }}
                modifiersStyles={{
                  event: { 
                    fontWeight: "bold", 
                    textDecoration: "underline"
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Événements</CardTitle>
            <CardDescription>
              {format(selectedDate, "d MMMM yyyy", { locale: fr }).replace(/^\w/, c => c.toUpperCase())}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dayEvents.length > 0 ? (
              <div className="space-y-3">
                {dayEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className={`p-3 rounded-md border ${getEventColor(event.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant="secondary">{event.time}</Badge>
                    </div>
                    <p className="text-sm mt-1">Lieu: {event.location}</p>
                    <p className="text-sm mt-1">
                      Classes: {event.class.includes("all") ? "Toutes les classes" : 
                                event.class.includes("staff") ? "Personnel" : 
                                event.class.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>Aucun événement pour cette date</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={() => setIsAddEventDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un événement
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Événements à venir</CardTitle>
          <CardDescription>Les prochains événements dans votre calendrier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter(event => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-3 border rounded-md">
                  <div className={`w-3 h-12 rounded ${
                    event.type === "evaluation" ? "bg-blue-500" :
                    event.type === "meeting" ? "bg-purple-500" :
                    event.type === "event" ? "bg-green-500" :
                    "bg-amber-500"
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time} - {event.location}
                    </p>
                  </div>
                  <Badge variant={
                    event.type === "evaluation" ? "default" :
                    event.type === "meeting" ? "secondary" :
                    event.type === "event" ? "success" :
                    "warning"
                  }>
                    {event.type === "evaluation" ? "Évaluation" :
                     event.type === "meeting" ? "Réunion" :
                     event.type === "event" ? "Événement" :
                     "Formation"}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherCalendrier;
