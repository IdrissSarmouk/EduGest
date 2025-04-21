
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, CalendarCheck, Users, Search, Pencil, Trash2, Clock, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Types
type ReunionType = "conseil" | "pedagogique" | "parents";

interface Reunion {
  id: number;
  type: ReunionType;
  titre: string;
  date: Date;
  heure: string;
  salle: string;
  classes: string[];
  participants: string[];
  description: string;
  animateur: string;
}

// Données simulées pour les réunions
const reunionsMock: Reunion[] = [
  {
    id: 1,
    type: "conseil",
    titre: "Conseil de classe - 3ème trimestre",
    date: new Date(2025, 5, 15),
    heure: "17:00",
    salle: "Salle de réunion A",
    classes: ["3ème A"],
    participants: ["M. Dubois", "Mme Martin", "M. Bernard", "Mme Petit", "M. Robert"],
    description: "Bilan du troisième trimestre et orientation des élèves.",
    animateur: "Mme. Dupont (Principale)"
  },
  {
    id: 2,
    type: "pedagogique",
    titre: "Réunion pédagogique - Nouveaux programmes",
    date: new Date(2025, 4, 20),
    heure: "14:30",
    salle: "Salle des professeurs",
    classes: [],
    participants: ["Tous les enseignants"],
    description: "Présentation des nouveaux programmes scolaires pour l'année à venir.",
    animateur: "M. Martin (Inspecteur académique)"
  },
  {
    id: 3,
    type: "parents",
    titre: "Rencontre parents-professeurs",
    date: new Date(2025, 3, 10),
    heure: "18:00",
    salle: "Hall principal",
    classes: ["6ème A", "6ème B", "5ème A", "5ème B", "5ème C"],
    participants: ["Enseignants des classes concernées", "Parents d'élèves"],
    description: "Rencontre individuelle entre parents et professeurs pour faire le point sur les résultats de mi-année.",
    animateur: "Direction de l'établissement"
  },
  {
    id: 4,
    type: "conseil",
    titre: "Conseil de classe - 2ème trimestre",
    date: new Date(2025, 2, 5),
    heure: "17:00",
    salle: "Salle de réunion B",
    classes: ["3ème B"],
    participants: ["M. Dubois", "Mme Martin", "M. Bernard", "Mme Petit", "M. Robert"],
    description: "Bilan du deuxième trimestre et préparation des orientations.",
    animateur: "M. Durand (Principal adjoint)"
  },
  {
    id: 5,
    type: "pedagogique",
    titre: "Formation aux outils numériques",
    date: new Date(2025, 1, 15),
    heure: "09:00",
    salle: "Salle informatique",
    classes: [],
    participants: ["Enseignants volontaires"],
    description: "Formation aux nouveaux outils numériques mis à disposition dans l'établissement.",
    animateur: "M. Garcia (Référent numérique)"
  }
];

// Listes de données
const sallesList = ["Salle de réunion A", "Salle de réunion B", "Salle des professeurs", "Hall principal", "Salle informatique", "CDI", "Gymnase", "Amphithéâtre"];
const classesList = ["6ème A", "6ème B", "5ème A", "5ème B", "5ème C", "4ème A", "4ème B", "4ème C", "3ème A", "3ème B", "3ème C"];
const enseignantsList = [
  "M. Dubois (Mathématiques)",
  "Mme Martin (Français)",
  "M. Bernard (Histoire-Géographie)",
  "Mme Petit (Sciences)",
  "M. Robert (Anglais)",
  "M. Durand (EPS)",
  "Mme Leroy (Physique-Chimie)"
];

const AdminReunions = () => {
  const [activeTab, setActiveTab] = useState<string>("calendrier");
  const [reunions, setReunions] = useState<Reunion[]>(reunionsMock);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedReunion, setSelectedReunion] = useState<Reunion | null>(null);
  
  const [newReunion, setNewReunion] = useState<Partial<Reunion>>({
    type: "conseil",
    titre: "",
    date: new Date(),
    heure: "",
    salle: "",
    classes: [],
    participants: [],
    description: "",
    animateur: ""
  });

  // Filtrer les réunions
  const filteredReunions = reunions.filter(reunion => {
    const matchesSearch = reunion.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reunion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          reunion.animateur.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "" || reunion.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Réunions pour la date sélectionnée
  const reunionsForDate = reunions.filter(reunion => {
    if (!date) return false;
    return reunion.date.getDate() === date.getDate() &&
           reunion.date.getMonth() === date.getMonth() &&
           reunion.date.getFullYear() === date.getFullYear();
  });

  // Ajouter une nouvelle réunion
  const handleAddReunion = () => {
    const newId = Math.max(...reunions.map(r => r.id)) + 1;
    const reunionToAdd = {
      ...newReunion,
      id: newId,
      date: newReunion.date || new Date(),
      classes: newReunion.classes || [],
      participants: newReunion.participants || []
    } as Reunion;
    
    setReunions([...reunions, reunionToAdd]);
    
    setNewReunion({
      type: "conseil",
      titre: "",
      date: new Date(),
      heure: "",
      salle: "",
      classes: [],
      participants: [],
      description: "",
      animateur: ""
    });
    
    setIsAddDialogOpen(false);
    toast.success("Réunion ajoutée avec succès !");
  };

  // Mise à jour d'une réunion
  const handleUpdateReunion = () => {
    if (!selectedReunion) return;
    
    setReunions(reunions.map(r => r.id === selectedReunion.id ? selectedReunion : r));
    setIsEditDialogOpen(false);
    toast.success("Réunion mise à jour avec succès !");
  };

  // Supprimer une réunion
  const handleDeleteReunion = (id: number) => {
    setReunions(reunions.filter(r => r.id !== id));
    toast.success("Réunion supprimée avec succès !");
  };

  // Ouvrir le dialogue d'édition
  const openEditDialog = (reunion: Reunion) => {
    setSelectedReunion(reunion);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conseils & Réunions pédagogiques</h1>
        <p className="text-muted-foreground mt-2">
          Planifiez et gérez les conseils de classe, réunions pédagogiques et rencontres parents-professeurs.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="calendrier">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendrier
          </TabsTrigger>
          <TabsTrigger value="liste">
            <CalendarCheck className="h-4 w-4 mr-2" />
            Liste des réunions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendrier" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            <Card className="md:col-span-3 lg:col-span-2">
              <CardHeader>
                <CardTitle>Calendrier</CardTitle>
                <CardDescription>Sélectionnez une date pour voir les réunions prévues</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  locale={fr}
                />
                
                <div className="mt-4">
                  <Button 
                    onClick={() => {
                      setIsAddDialogOpen(true);
                      setNewReunion(prev => ({...prev, date: date}));
                    }}
                    className="w-full"
                  >
                    Planifier une réunion
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-4 lg:col-span-5">
              <CardHeader>
                <CardTitle>
                  {date ? format(date, "EEEE d MMMM yyyy", { locale: fr }) : "Sélectionnez une date"}
                </CardTitle>
                <CardDescription>
                  {reunionsForDate.length === 0 
                    ? "Aucune réunion prévue pour cette date" 
                    : `${reunionsForDate.length} réunion(s) planifiée(s)`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reunionsForDate.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CalendarCheck className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="font-medium text-lg">Aucune réunion prévue</h3>
                    <p className="text-muted-foreground mt-1">
                      Cette journée est libre. Vous pouvez planifier une nouvelle réunion.
                    </p>
                    <Button 
                      onClick={() => {
                        setIsAddDialogOpen(true);
                        setNewReunion(prev => ({...prev, date: date}));
                      }}
                      className="mt-4"
                    >
                      Planifier une réunion
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reunionsForDate.map((reunion) => (
                      <div 
                        key={reunion.id} 
                        className="p-4 border rounded-lg hover:border-primary/50 transition-colors bg-card"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant={
                                reunion.type === "conseil" 
                                  ? "default" 
                                  : reunion.type === "pedagogique" 
                                    ? "secondary" 
                                    : "outline"
                              }>
                                {reunion.type === "conseil" 
                                  ? "Conseil de classe" 
                                  : reunion.type === "pedagogique" 
                                    ? "Réunion pédagogique" 
                                    : "Rencontre parents"}
                              </Badge>
                              <h3 className="font-medium text-lg">{reunion.titre}</h3>
                            </div>
                            <div className="flex items-center text-muted-foreground text-sm mt-2 gap-4">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{reunion.heure}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{reunion.salle}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => openEditDialog(reunion)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteReunion(reunion.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="mt-2 text-sm">{reunion.description}</p>
                        
                        <div className="mt-3">
                          <div className="text-sm font-medium">Animateur:</div>
                          <div className="text-sm text-muted-foreground">{reunion.animateur}</div>
                        </div>
                        
                        {reunion.classes.length > 0 && (
                          <div className="mt-2">
                            <div className="text-sm font-medium">Classes concernées:</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {reunion.classes.map((classe) => (
                                <Badge key={classe} variant="outline">
                                  {classe}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-2">
                          <div className="text-sm font-medium">Participants:</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {reunion.participants.join(", ")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="liste" className="mt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher une réunion..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select onValueChange={setTypeFilter} value={typeFilter}>
                <SelectTrigger className="w-full md:w-60">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les types</SelectItem>
                  <SelectItem value="conseil">Conseils de classe</SelectItem>
                  <SelectItem value="pedagogique">Réunions pédagogiques</SelectItem>
                  <SelectItem value="parents">Rencontres parents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Planifier une réunion
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Planifier une nouvelle réunion</DialogTitle>
                  <DialogDescription>
                    Complétez les informations pour planifier une nouvelle réunion ou un conseil de classe.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="type" className="text-sm font-medium">Type de réunion</label>
                      <Select
                        value={newReunion.type}
                        onValueChange={(value) => setNewReunion({...newReunion, type: value as ReunionType})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type de réunion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conseil">Conseil de classe</SelectItem>
                          <SelectItem value="pedagogique">Réunion pédagogique</SelectItem>
                          <SelectItem value="parents">Rencontre parents</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="titre" className="text-sm font-medium">Titre</label>
                      <Input
                        id="titre"
                        value={newReunion.titre}
                        onChange={(e) => setNewReunion({...newReunion, titre: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !newReunion.date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newReunion.date ? (
                              format(newReunion.date, "PPP", { locale: fr })
                            ) : (
                              <span>Choisir une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newReunion.date}
                            onSelect={(date) => setNewReunion({...newReunion, date: date})}
                            initialFocus
                            locale={fr}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="heure" className="text-sm font-medium">Heure</label>
                      <Input
                        id="heure"
                        type="time"
                        value={newReunion.heure}
                        onChange={(e) => setNewReunion({...newReunion, heure: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="salle" className="text-sm font-medium">Salle</label>
                    <Select
                      value={newReunion.salle}
                      onValueChange={(value) => setNewReunion({...newReunion, salle: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une salle" />
                      </SelectTrigger>
                      <SelectContent>
                        {sallesList.map((salle) => (
                          <SelectItem key={salle} value={salle}>{salle}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="animateur" className="text-sm font-medium">Animateur</label>
                    <Input
                      id="animateur"
                      value={newReunion.animateur}
                      onChange={(e) => setNewReunion({...newReunion, animateur: e.target.value})}
                      placeholder="Nom et fonction"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      value={newReunion.description}
                      onChange={(e) => setNewReunion({...newReunion, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Classes concernées</label>
                    <Select
                      onValueChange={(value) => {
                        const classes = [...(newReunion.classes || [])];
                        if (!classes.includes(value)) {
                          classes.push(value);
                          setNewReunion({...newReunion, classes});
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ajouter une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        {classesList.map((classe) => (
                          <SelectItem key={classe} value={classe}>{classe}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {newReunion.classes && newReunion.classes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {newReunion.classes.map((classe) => (
                          <Badge 
                            key={classe} 
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {classe}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => {
                                const classes = newReunion.classes?.filter(c => c !== classe) || [];
                                setNewReunion({...newReunion, classes});
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Participants</label>
                    <Select
                      onValueChange={(value) => {
                        const participants = [...(newReunion.participants || [])];
                        if (!participants.includes(value)) {
                          participants.push(value);
                          setNewReunion({...newReunion, participants});
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ajouter un participant" />
                      </SelectTrigger>
                      <SelectContent>
                        {enseignantsList.map((enseignant) => (
                          <SelectItem key={enseignant} value={enseignant}>{enseignant}</SelectItem>
                        ))}
                        <SelectItem value="Tous les enseignants">Tous les enseignants</SelectItem>
                        <SelectItem value="Parents d'élèves">Parents d'élèves</SelectItem>
                        <SelectItem value="Délégués de classe">Délégués de classe</SelectItem>
                        <SelectItem value="Direction de l'établissement">Direction de l'établissement</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {newReunion.participants && newReunion.participants.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {newReunion.participants.map((participant) => (
                          <Badge 
                            key={participant} 
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {participant}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => {
                                const participants = newReunion.participants?.filter(p => p !== participant) || [];
                                setNewReunion({...newReunion, participants});
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                  <Button onClick={handleAddReunion} disabled={!newReunion.titre || !newReunion.date || !newReunion.heure || !newReunion.salle}>
                    Planifier
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Date et heure</TableHead>
                  <TableHead>Salle</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Animateur</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReunions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <CalendarCheck className="h-8 w-8 text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground">Aucune réunion ne correspond à votre recherche</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReunions.map((reunion) => (
                    <TableRow key={reunion.id}>
                      <TableCell>
                        <Badge variant={
                          reunion.type === "conseil" 
                            ? "default" 
                            : reunion.type === "pedagogique" 
                              ? "secondary" 
                              : "outline"
                        }>
                          {reunion.type === "conseil" 
                            ? "Conseil" 
                            : reunion.type === "pedagogique" 
                              ? "Pédagogique" 
                              : "Parents"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{reunion.titre}</TableCell>
                      <TableCell>
                        <div>{format(reunion.date, "P", { locale: fr })}</div>
                        <div className="text-muted-foreground text-xs">{reunion.heure}</div>
                      </TableCell>
                      <TableCell>{reunion.salle}</TableCell>
                      <TableCell>
                        {reunion.classes.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {reunion.classes.map((classe) => (
                              <Badge key={classe} variant="outline" className="text-xs">
                                {classe}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-xs">Toutes classes</span>
                        )}
                      </TableCell>
                      <TableCell>{reunion.animateur}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(reunion)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteReunion(reunion.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Modifier la réunion</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la réunion.
            </DialogDescription>
          </DialogHeader>
          {selectedReunion && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-type" className="text-sm font-medium">Type de réunion</label>
                  <Select
                    value={selectedReunion.type}
                    onValueChange={(value) => setSelectedReunion({...selectedReunion, type: value as ReunionType})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type de réunion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conseil">Conseil de classe</SelectItem>
                      <SelectItem value="pedagogique">Réunion pédagogique</SelectItem>
                      <SelectItem value="parents">Rencontre parents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-titre" className="text-sm font-medium">Titre</label>
                  <Input
                    id="edit-titre"
                    value={selectedReunion.titre}
                    onChange={(e) => setSelectedReunion({...selectedReunion, titre: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-date" className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedReunion.date, "PPP", { locale: fr })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedReunion.date}
                        onSelect={(date) => date && setSelectedReunion({...selectedReunion, date})}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-heure" className="text-sm font-medium">Heure</label>
                  <Input
                    id="edit-heure"
                    type="time"
                    value={selectedReunion.heure}
                    onChange={(e) => setSelectedReunion({...selectedReunion, heure: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-salle" className="text-sm font-medium">Salle</label>
                <Select
                  value={selectedReunion.salle}
                  onValueChange={(value) => setSelectedReunion({...selectedReunion, salle: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une salle" />
                  </SelectTrigger>
                  <SelectContent>
                    {sallesList.map((salle) => (
                      <SelectItem key={salle} value={salle}>{salle}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-animateur" className="text-sm font-medium">Animateur</label>
                <Input
                  id="edit-animateur"
                  value={selectedReunion.animateur}
                  onChange={(e) => setSelectedReunion({...selectedReunion, animateur: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="edit-description"
                  value={selectedReunion.description}
                  onChange={(e) => setSelectedReunion({...selectedReunion, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Classes concernées</label>
                <Select
                  onValueChange={(value) => {
                    const classes = [...selectedReunion.classes];
                    if (!classes.includes(value)) {
                      classes.push(value);
                      setSelectedReunion({...selectedReunion, classes});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ajouter une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {classesList.map((classe) => (
                      <SelectItem key={classe} value={classe}>{classe}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedReunion.classes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedReunion.classes.map((classe) => (
                      <Badge 
                        key={classe} 
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {classe}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => {
                            setSelectedReunion({
                              ...selectedReunion, 
                              classes: selectedReunion.classes.filter(c => c !== classe)
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Participants</label>
                <Select
                  onValueChange={(value) => {
                    const participants = [...selectedReunion.participants];
                    if (!participants.includes(value)) {
                      participants.push(value);
                      setSelectedReunion({...selectedReunion, participants});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ajouter un participant" />
                  </SelectTrigger>
                  <SelectContent>
                    {enseignantsList.map((enseignant) => (
                      <SelectItem key={enseignant} value={enseignant}>{enseignant}</SelectItem>
                    ))}
                    <SelectItem value="Tous les enseignants">Tous les enseignants</SelectItem>
                    <SelectItem value="Parents d'élèves">Parents d'élèves</SelectItem>
                    <SelectItem value="Délégués de classe">Délégués de classe</SelectItem>
                    <SelectItem value="Direction de l'établissement">Direction de l'établissement</SelectItem>
                  </SelectContent>
                </Select>
                
                {selectedReunion.participants.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedReunion.participants.map((participant) => (
                      <Badge 
                        key={participant} 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {participant}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => {
                            setSelectedReunion({
                              ...selectedReunion, 
                              participants: selectedReunion.participants.filter(p => p !== participant)
                            });
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleUpdateReunion}>Enregistrer les modifications</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReunions;
