
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, CalendarClock, Users, School, GraduationCap } from "lucide-react";

// Événements du calendrier
const evenements = [
  { 
    id: 1, 
    titre: "Réunion parents-professeurs", 
    date: new Date(2025, 2, 22), 
    heure: "18h00 - 20h00", 
    lieu: "Salle polyvalente", 
    description: "Rencontre individuelle avec les enseignants pour faire le point sur le trimestre.",
    type: "reunion"
  },
  { 
    id: 2, 
    titre: "Conseil de classe - 3ème trimestre", 
    date: new Date(2025, 3, 15), 
    heure: "17h30", 
    lieu: "Salle de réunion", 
    description: "Bilan du trimestre et préparation des orientations.",
    type: "conseil"
  },
  { 
    id: 3, 
    titre: "Vacances de printemps", 
    dateDebut: new Date(2025, 3, 19), 
    dateFin: new Date(2025, 4, 5), 
    description: "Vacances scolaires de printemps pour l'académie.",
    type: "vacances"
  },
  { 
    id: 4, 
    titre: "Sortie pédagogique - Musée", 
    date: new Date(2025, 3, 10), 
    heure: "9h00 - 16h00", 
    lieu: "Musée des Sciences", 
    description: "Sortie pédagogique pour les classes de 3ème. Prévoir un pique-nique.",
    type: "sortie"
  },
  { 
    id: 5, 
    titre: "Brevet blanc", 
    dateDebut: new Date(2025, 2, 25), 
    dateFin: new Date(2025, 2, 26), 
    description: "Examen blanc du brevet des collèges pour préparer les élèves.",
    type: "examen"
  },
  { 
    id: 6, 
    titre: "Journée portes ouvertes", 
    date: new Date(2025, 4, 15), 
    heure: "10h00 - 17h00", 
    lieu: "Établissement", 
    description: "Présentation de l'établissement aux futurs élèves et leurs parents.",
    type: "evenement"
  }
];

// Dates importantes pour la suite de l'année scolaire
const datesImportantes = [
  { 
    id: 1, 
    titre: "Fin du troisième trimestre", 
    date: new Date(2025, 5, 30), 
    description: "Fin des cours et des évaluations pour le troisième trimestre."
  },
  { 
    id: 2, 
    titre: "Épreuves du brevet", 
    dateDebut: new Date(2025, 5, 25), 
    dateFin: new Date(2025, 5, 26), 
    description: "Épreuves écrites du diplôme national du brevet."
  },
  { 
    id: 3, 
    titre: "Rencontre d'orientation", 
    date: new Date(2025, 4, 20), 
    heure: "18h00", 
    lieu: "Auditorium", 
    description: "Présentation des filières du lycée pour les élèves de 3ème."
  },
  { 
    id: 4, 
    titre: "Vacances d'été", 
    dateDebut: new Date(2025, 6, 3), 
    description: "Début des vacances d'été."
  }
];

const ParentCalendrier = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Fonction pour obtenir les événements d'une date spécifique
  const getEvenementsParDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return evenements.filter(evt => {
      // Pour les événements avec une seule date
      if (evt.date) {
        return evt.date.toDateString() === date.toDateString();
      }
      // Pour les événements avec une période (début et fin)
      if (evt.dateDebut && evt.dateFin) {
        return date >= evt.dateDebut && date <= evt.dateFin;
      }
      // Pour les événements avec juste une date de début
      if (evt.dateDebut) {
        return evt.dateDebut.toDateString() === date.toDateString();
      }
      return false;
    });
  };
  
  // Obtention des événements pour la date sélectionnée
  const evenementsParDate = getEvenementsParDate(selectedDate);
  
  // Fonction pour obtenir la classe CSS du badge selon le type d'événement
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "reunion": return "bg-blue-500 text-white";
      case "conseil": return "bg-green-500 text-white";
      case "vacances": return "bg-yellow-500 text-white";
      case "sortie": return "bg-purple-500 text-white";
      case "examen": return "bg-red-500 text-white";
      case "evenement": return "bg-indigo-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };
  
  // Fonction pour afficher l'icône selon le type d'événement
  const getIconByType = (type: string) => {
    switch (type) {
      case "reunion": return <Users className="h-5 w-5" />;
      case "conseil": return <Users className="h-5 w-5" />;
      case "vacances": return <CalendarCheck className="h-5 w-5" />;
      case "sortie": return <School className="h-5 w-5" />;
      case "examen": return <GraduationCap className="h-5 w-5" />;
      case "evenement": return <CalendarClock className="h-5 w-5" />;
      default: return <CalendarClock className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendrier Scolaire</h1>
        <p className="text-muted-foreground mt-2">
          Consultez les événements, réunions et dates importantes de l'année scolaire.
        </p>
      </div>
      
      <Tabs defaultValue="calendrier" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calendrier">Calendrier</TabsTrigger>
          <TabsTrigger value="dates-importantes">Dates importantes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendrier" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier</CardTitle>
                <CardDescription>Sélectionnez une date pour voir les événements</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? new Intl.DateTimeFormat('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  }).format(selectedDate) : "Aucune date sélectionnée"}
                </CardTitle>
                <CardDescription>
                  {evenementsParDate.length > 0 
                    ? `${evenementsParDate.length} événement(s) pour cette date` 
                    : "Aucun événement pour cette date"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evenementsParDate.length > 0 ? (
                    evenementsParDate.map(evt => (
                      <div key={evt.id} className="p-3 border rounded-md">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {evt.type && getIconByType(evt.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{evt.titre}</h3>
                              {evt.type && (
                                <Badge className={getTypeBadge(evt.type)}>
                                  {evt.type.charAt(0).toUpperCase() + evt.type.slice(1)}
                                </Badge>
                              )}
                            </div>
                            
                            {evt.heure && (
                              <p className="text-sm mt-1">{evt.heure}</p>
                            )}
                            
                            {evt.lieu && (
                              <p className="text-sm text-muted-foreground">Lieu: {evt.lieu}</p>
                            )}
                            
                            {evt.description && (
                              <p className="text-sm mt-2">{evt.description}</p>
                            )}
                            
                            {evt.dateDebut && evt.dateFin && (
                              <p className="text-xs text-muted-foreground mt-2">
                                Du {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(evt.dateDebut)} 
                                {" "}au{" "}
                                {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(evt.dateFin)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucun événement programmé pour cette date
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
              <CardDescription>Les prochains événements importants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evenements
                  .filter(evt => {
                    const today = new Date();
                    if (evt.date) return evt.date >= today;
                    if (evt.dateDebut) return evt.dateDebut >= today;
                    return false;
                  })
                  .sort((a, b) => {
                    const dateA = a.date || a.dateDebut;
                    const dateB = b.date || b.dateDebut;
                    if (!dateA || !dateB) return 0;
                    return dateA.getTime() - dateB.getTime();
                  })
                  .slice(0, 5)
                  .map(evt => (
                    <div key={evt.id} className="p-3 border rounded-md">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {evt.type && getIconByType(evt.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{evt.titre}</h3>
                            {evt.type && (
                              <Badge className={getTypeBadge(evt.type)}>
                                {evt.type.charAt(0).toUpperCase() + evt.type.slice(1)}
                              </Badge>
                            )}
                          </div>
                          
                          {evt.date && (
                            <p className="text-sm mt-1">
                              {new Intl.DateTimeFormat('fr-FR', { 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric' 
                              }).format(evt.date)}
                              {evt.heure && ` - ${evt.heure}`}
                            </p>
                          )}
                          
                          {evt.dateDebut && (
                            <p className="text-sm mt-1">
                              {evt.dateFin ? (
                                <>
                                  Du {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(evt.dateDebut)} 
                                  {" "}au{" "}
                                  {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(evt.dateFin)}
                                </>
                              ) : (
                                new Intl.DateTimeFormat('fr-FR', { 
                                  day: 'numeric', 
                                  month: 'long',
                                  year: 'numeric' 
                                }).format(evt.dateDebut)
                              )}
                            </p>
                          )}
                          
                          {evt.lieu && (
                            <p className="text-sm text-muted-foreground">Lieu: {evt.lieu}</p>
                          )}
                          
                          {evt.description && (
                            <p className="text-sm mt-2">{evt.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dates-importantes">
          <Card>
            <CardHeader>
              <CardTitle>Dates importantes à venir</CardTitle>
              <CardDescription>Les dates essentielles à retenir pour la suite de l'année</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datesImportantes
                  .sort((a, b) => {
                    const dateA = a.date || a.dateDebut;
                    const dateB = b.date || b.dateDebut;
                    if (!dateA || !dateB) return 0;
                    return dateA.getTime() - dateB.getTime();
                  })
                  .map(evt => (
                    <div key={evt.id} className="p-4 border rounded-md">
                      <div className="flex items-start gap-3">
                        <CalendarClock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">{evt.titre}</h3>
                          
                          {evt.date && (
                            <p className="text-sm mt-1">
                              {new Intl.DateTimeFormat('fr-FR', { 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric' 
                              }).format(evt.date)}
                              {evt.heure && ` - ${evt.heure}`}
                            </p>
                          )}
                          
                          {evt.dateDebut && (
                            <p className="text-sm mt-1">
                              {evt.dateFin ? (
                                <>
                                  Du {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' }).format(evt.dateDebut)} 
                                  {" "}au{" "}
                                  {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(evt.dateFin || evt.dateDebut)}
                                </>
                              ) : (
                                new Intl.DateTimeFormat('fr-FR', { 
                                  day: 'numeric', 
                                  month: 'long',
                                  year: 'numeric' 
                                }).format(evt.dateDebut)
                              )}
                            </p>
                          )}
                          
                          {evt.lieu && (
                            <p className="text-sm text-muted-foreground">Lieu: {evt.lieu}</p>
                          )}
                          
                          {evt.description && (
                            <p className="text-sm text-muted-foreground mt-2">{evt.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentCalendrier;
