
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays, 
  CalendarPlus, 
  Users, 
  Clock, 
  Pencil, 
  Trash2, 
  Search, 
  X as CloseIcon
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Types pour les réunions et conseils
interface Personne {
  id: number;
  nom: string;
  prenom: string;
  role: string;
}

interface Reunion {
  id: number;
  titre: string;
  type: "conseil" | "reunion";
  date: Date;
  heureDebut: string;
  heureFin: string;
  salle: string;
  participants: Personne[];
  classe?: string;
  trimestre?: number;
  ordre_du_jour?: string;
  statut: "planifiée" | "terminée" | "annulée";
}

// Données simulées
const personnesMock: Personne[] = [
  { id: 1, nom: "Martin", prenom: "Sophie", role: "Professeur principal - Français" },
  { id: 2, nom: "Dubois", prenom: "Thomas", role: "Professeur - Mathématiques" },
  { id: 3, nom: "Petit", prenom: "Claire", role: "Professeur - Histoire-Géographie" },
  { id: 4, nom: "Robert", prenom: "Michel", role: "Professeur - Sciences" },
  { id: 5, nom: "Richard", prenom: "Isabelle", role: "Professeur - Anglais" },
  { id: 6, nom: "Durand", prenom: "Pierre", role: "CPE" },
  { id: 7, nom: "Moreau", prenom: "Anne", role: "Direction" },
  { id: 8, nom: "Laurent", prenom: "Philippe", role: "Direction" },
  { id: 9, nom: "Lefebvre", prenom: "Nathalie", role: "Représentant parents" },
  { id: 10, nom: "Garcia", prenom: "Jean", role: "Représentant parents" },
];

const reunionsMock: Reunion[] = [
  {
    id: 1,
    titre: "Conseil de classe 3ème B - 1er trimestre",
    type: "conseil",
    date: new Date(2025, 11, 5),
    heureDebut: "17:00",
    heureFin: "18:30",
    salle: "Salle C103",
    participants: [personnesMock[0], personnesMock[1], personnesMock[2], personnesMock[5], personnesMock[6], personnesMock[8]],
    classe: "3ème B",
    trimestre: 1,
    ordre_du_jour: "Bilan du premier trimestre, cas des élèves en difficulté, perspectives.",
    statut: "planifiée"
  },
  {
    id: 2,
    titre: "Conseil de classe 3ème A - 1er trimestre",
    type: "conseil",
    date: new Date(2025, 11, 7),
    heureDebut: "17:00",
    heureFin: "18:30",
    salle: "Salle C103",
    participants: [personnesMock[0], personnesMock[3], personnesMock[4], personnesMock[5], personnesMock[7], personnesMock[9]],
    classe: "3ème A",
    trimestre: 1,
    ordre_du_jour: "Bilan du premier trimestre, cas des élèves en difficulté, perspectives.",
    statut: "planifiée"
  },
  {
    id: 3,
    titre: "Réunion pédagogique - Réforme du collège",
    type: "reunion",
    date: new Date(2025, 10, 25),
    heureDebut: "14:00",
    heureFin: "16:00",
    salle: "Salle des professeurs",
    participants: [personnesMock[0], personnesMock[1], personnesMock[2], personnesMock[3], personnesMock[4], personnesMock[6], personnesMock[7]],
    ordre_du_jour: "Présentation de la nouvelle réforme, impacts sur les programmes, questions/réponses.",
    statut: "terminée"
  },
  {
    id: 4,
    titre: "Réunion préparation voyage scolaire",
    type: "reunion",
    date: new Date(2025, 11, 10),
    heureDebut: "12:30",
    heureFin: "13:30",
    salle: "Salle B202",
    participants: [personnesMock[0], personnesMock[2], personnesMock[4], personnesMock[8], personnesMock[9]],
    ordre_du_jour: "Organisation du voyage scolaire en Angleterre, budget, planning, autorisations parentales.",
    statut: "planifiée"
  }
];

// Listes pour les sélections
const classesList = ["6ème A", "6ème B", "5ème A", "5ème B", "5ème C", "4ème A", "4ème B", "4ème C", "3ème A", "3ème B", "3ème C"];
const sallesList = ["Salle des professeurs", "Salle C103", "Salle C104", "Salle B202", "Salle B203", "Salle A101", "Salle A102", "CDI", "Amphithéâtre"];
const trimestres = [1, 2, 3];

const AdminReunions = () => {
  const [reunions, setReunions] = useState<Reunion[]>(reunionsMock);
  const [personnes] = useState<Personne[]>(personnesMock);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtrePeriode, setFiltrePeriode] = useState<"all" | "past" | "upcoming">("all");
  const [filtreType, setFiltreType] = useState<"all" | "conseil" | "reunion">("all");
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [participantsOpen, setParticipantsOpen] = useState(false);
  
  const [nouvelleReunion, setNouvelleReunion] = useState<Partial<Reunion>>({
    titre: "",
    type: "reunion",
    date: new Date(),
    heureDebut: "14:00",
    heureFin: "15:30",
    salle: "",
    participants: [],
    ordre_du_jour: "",
    statut: "planifiée"
  });
  
  const [reunionEnEdition, setReunionEnEdition] = useState<Reunion | null>(null);
  const [reunionDetails, setReunionDetails] = useState<Reunion | null>(null);
  
  // Fonctions utilitaires
  const formatDateComplete = (date: Date) => {
    return format(date, "EEEE d MMMM yyyy", { locale: fr });
  };

  const formatMonth = (date: Date) => {
    return format(date, "MMMM yyyy", { locale: fr });
  };

  // Filtrer les réunions
  const filtrerReunions = () => {
    const now = new Date();
    
    return reunions.filter(reunion => {
      // Filtre de recherche
      const matchesSearch = searchQuery === "" || 
                             reunion.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             reunion.classe?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             reunion.salle.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtre de période
      let matchesPeriode = true;
      if (filtrePeriode === "past") {
        matchesPeriode = reunion.date < now;
      } else if (filtrePeriode === "upcoming") {
        matchesPeriode = reunion.date >= now;
      }
      
      // Filtre de type
      let matchesType = true;
      if (filtreType !== "all") {
        matchesType = reunion.type === filtreType;
      }
      
      return matchesSearch && matchesPeriode && matchesType;
    });
  };

  const reunionsFiltrees = filtrerReunions();

  // Regrouper les réunions par mois
  const reunionsParMois = reunionsFiltrees.reduce<Record<string, Reunion[]>>((acc, reunion) => {
    const moisAnnee = formatMonth(reunion.date);
    if (!acc[moisAnnee]) {
      acc[moisAnnee] = [];
    }
    acc[moisAnnee].push(reunion);
    return acc;
  }, {});

  // Gérer l'ajout d'une nouvelle réunion
  const handleAjouterReunion = () => {
    if (!nouvelleReunion.titre || !nouvelleReunion.date || !nouvelleReunion.salle) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newId = Math.max(...reunions.map(r => r.id)) + 1;
    const nouvelleReunionComplete = {
      ...nouvelleReunion,
      id: newId,
      date: nouvelleReunion.date!,
      participants: nouvelleReunion.participants || [],
      type: nouvelleReunion.type as "conseil" | "reunion",
      statut: nouvelleReunion.statut as "planifiée" | "terminée" | "annulée"
    } as Reunion;
    
    setReunions([...reunions, nouvelleReunionComplete]);
    setIsAddDialogOpen(false);
    
    // Réinitialiser le formulaire
    setNouvelleReunion({
      titre: "",
      type: "reunion",
      date: new Date(),
      heureDebut: "14:00",
      heureFin: "15:30",
      salle: "",
      participants: [],
      ordre_du_jour: "",
      statut: "planifiée"
    });
    
    toast.success("Réunion ajoutée avec succès");
  };

  // Gérer l'édition d'une réunion
  const handleEditerReunion = () => {
    if (!reunionEnEdition) return;
    
    setReunions(reunions.map(r => r.id === reunionEnEdition.id ? reunionEnEdition : r));
    setIsEditDialogOpen(false);
    toast.success("Réunion mise à jour avec succès");
  };

  // Gérer la suppression d'une réunion
  const handleSupprimerReunion = (id: number) => {
    setReunions(reunions.filter(r => r.id !== id));
    toast.success("Réunion supprimée avec succès");
  };

  // Gérer l'ajout/suppression de participants
  const toggleParticipant = (personne: Personne, isAdding: boolean) => {
    if (isAdding) {
      // Ajouter à la nouvelle réunion
      if (isAddDialogOpen) {
        setNouvelleReunion({
          ...nouvelleReunion,
          participants: [...(nouvelleReunion.participants || []), personne]
        });
      } 
      // Ajouter à la réunion en édition
      else if (isEditDialogOpen && reunionEnEdition) {
        setReunionEnEdition({
          ...reunionEnEdition,
          participants: [...reunionEnEdition.participants, personne]
        });
      }
    } else {
      // Supprimer de la nouvelle réunion
      if (isAddDialogOpen) {
        setNouvelleReunion({
          ...nouvelleReunion,
          participants: (nouvelleReunion.participants || []).filter(p => p.id !== personne.id)
        });
      } 
      // Supprimer de la réunion en édition
      else if (isEditDialogOpen && reunionEnEdition) {
        setReunionEnEdition({
          ...reunionEnEdition,
          participants: reunionEnEdition.participants.filter(p => p.id !== personne.id)
        });
      }
    }
  };

  // Ouvrir le dialogue d'édition
  const openEditDialog = (reunion: Reunion) => {
    setReunionEnEdition({...reunion});
    setIsEditDialogOpen(true);
  };

  // Ouvrir le dialogue de détails
  const openDetailsDialog = (reunion: Reunion) => {
    setReunionDetails({...reunion});
    setIsViewDetailsOpen(true);
  };

  // Déterminer si une personne est déjà participante
  const isParticipant = (personneId: number) => {
    if (isAddDialogOpen) {
      return (nouvelleReunion.participants || []).some(p => p.id === personneId);
    } else if (isEditDialogOpen && reunionEnEdition) {
      return reunionEnEdition.participants.some(p => p.id === personneId);
    }
    return false;
  };

  // Obtenir le badge de statut avec la bonne couleur
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planifiée":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Planifiée</Badge>;
      case "terminée":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Terminée</Badge>;
      case "annulée":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Annulée</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Réunions & Conseils de classe</h1>
        <p className="text-muted-foreground">
          Planifiez et gérez les conseils de classe et les réunions pédagogiques.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 my-6">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher une réunion..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select onValueChange={(value: "all" | "past" | "upcoming") => setFiltrePeriode(value)} value={filtrePeriode}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les périodes</SelectItem>
              <SelectItem value="past">Passées</SelectItem>
              <SelectItem value="upcoming">À venir</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value: "all" | "conseil" | "reunion") => setFiltreType(value)} value={filtreType}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="conseil">Conseils de classe</SelectItem>
              <SelectItem value="reunion">Réunions</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Nouvelle réunion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Planifier une nouvelle réunion</DialogTitle>
              <DialogDescription>
                Complétez les informations pour organiser une réunion ou un conseil de classe.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Tabs defaultValue="reunion" onValueChange={(val: "reunion" | "conseil") => 
                setNouvelleReunion({...nouvelleReunion, type: val})
              }>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="reunion">Réunion pédagogique</TabsTrigger>
                  <TabsTrigger value="conseil">Conseil de classe</TabsTrigger>
                </TabsList>
                <TabsContent value="reunion">
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="titre-reunion" className="text-sm font-medium">Titre de la réunion</Label>
                      <Input
                        id="titre-reunion"
                        value={nouvelleReunion.titre}
                        onChange={(e) => setNouvelleReunion({...nouvelleReunion, titre: e.target.value})}
                        placeholder="Ex: Réunion préparation examens"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="conseil">
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="classe" className="text-sm font-medium">Classe</Label>
                        <Select 
                          onValueChange={(value) => setNouvelleReunion({...nouvelleReunion, classe: value, titre: `Conseil de classe ${value} - ${nouvelleReunion.trimestre || '1'}e trimestre`})}
                          value={nouvelleReunion.classe}
                        >
                          <SelectTrigger id="classe">
                            <SelectValue placeholder="Sélectionner une classe" />
                          </SelectTrigger>
                          <SelectContent>
                            {classesList.map((classe) => (
                              <SelectItem key={classe} value={classe}>
                                {classe}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="trimestre" className="text-sm font-medium">Trimestre</Label>
                        <Select 
                          onValueChange={(value) => {
                            const trim = parseInt(value);
                            setNouvelleReunion({
                              ...nouvelleReunion, 
                              trimestre: trim,
                              titre: `Conseil de classe ${nouvelleReunion.classe || ''} - ${trim}e trimestre`
                            });
                          }}
                          value={nouvelleReunion.trimestre?.toString()}
                        >
                          <SelectTrigger id="trimestre">
                            <SelectValue placeholder="Sélectionner un trimestre" />
                          </SelectTrigger>
                          <SelectContent>
                            {trimestres.map((t) => (
                              <SelectItem key={t} value={t.toString()}>
                                {t}er trimestre
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "P", { locale: fr }) : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setNouvelleReunion({...nouvelleReunion, date});
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="salle" className="text-sm font-medium">Salle</Label>
                  <Select 
                    onValueChange={(value) => setNouvelleReunion({...nouvelleReunion, salle: value})}
                    value={nouvelleReunion.salle}
                  >
                    <SelectTrigger id="salle">
                      <SelectValue placeholder="Sélectionner une salle" />
                    </SelectTrigger>
                    <SelectContent>
                      {sallesList.map((salle) => (
                        <SelectItem key={salle} value={salle}>
                          {salle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="heureDebut" className="text-sm font-medium">Heure de début</Label>
                  <Input
                    id="heureDebut"
                    type="time"
                    value={nouvelleReunion.heureDebut}
                    onChange={(e) => setNouvelleReunion({...nouvelleReunion, heureDebut: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="heureFin" className="text-sm font-medium">Heure de fin</Label>
                  <Input
                    id="heureFin"
                    type="time"
                    value={nouvelleReunion.heureFin}
                    onChange={(e) => setNouvelleReunion({...nouvelleReunion, heureFin: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="participants" className="text-sm font-medium">Participants</Label>
                <div className="flex flex-wrap gap-2 my-2">
                  {(nouvelleReunion.participants || []).map((p) => (
                    <Badge key={p.id} variant="secondary" className="pl-2 pr-1 py-1">
                      {p.prenom} {p.nom}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 ml-1 hover:bg-transparent"
                        onClick={() => toggleParticipant(p, false)}
                      >
                        <CloseIcon className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setParticipantsOpen(true)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Gérer les participants
                </Button>
              </div>

              <div>
                <Label htmlFor="ordre_du_jour" className="text-sm font-medium">Ordre du jour</Label>
                <Input
                  id="ordre_du_jour"
                  value={nouvelleReunion.ordre_du_jour || ''}
                  onChange={(e) => setNouvelleReunion({...nouvelleReunion, ordre_du_jour: e.target.value})}
                  placeholder="Points à aborder durant la réunion"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleAjouterReunion}>Planifier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Liste des réunions */}
      {Object.entries(reunionsParMois).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(reunionsParMois).map(([mois, reunionsMois]) => (
            <div key={mois} className="space-y-4">
              <h2 className="text-xl font-semibold capitalize">{mois}</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Intitulé</TableHead>
                      <TableHead>Date & Horaire</TableHead>
                      <TableHead>Salle</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reunionsMois.map((reunion) => (
                      <TableRow key={reunion.id}>
                        <TableCell className="font-medium">
                          {reunion.titre}
                          {reunion.type === "conseil" && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-2">
                              Conseil
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{format(reunion.date, "EEEE d MMMM", { locale: fr })}</div>
                          <div className="text-muted-foreground text-sm">
                            {reunion.heureDebut} - {reunion.heureFin}
                          </div>
                        </TableCell>
                        <TableCell>{reunion.salle}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-muted/50">
                            {reunion.participants.length} participants
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(reunion.statut)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => openDetailsDialog(reunion)}
                            >
                              <Search className="h-4 w-4" />
                            </Button>
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
                              onClick={() => handleSupprimerReunion(reunion.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-md bg-muted/10">
          <h3 className="text-lg font-medium text-muted-foreground">Aucune réunion trouvée</h3>
          <p className="text-sm text-muted-foreground mt-2">Ajoutez une nouvelle réunion ou modifiez vos critères de recherche.</p>
        </div>
      )}

      {/* Dialog de sélection des participants */}
      <Dialog open={participantsOpen} onOpenChange={setParticipantsOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Sélectionner les participants</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto mt-4">
            <div className="space-y-2">
              {personnes.map((personne) => {
                const isSelected = isParticipant(personne.id);
                
                return (
                  <div 
                    key={personne.id} 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-md border",
                      isSelected ? "border-primary bg-primary/5" : "border-muted"
                    )}
                  >
                    <div>
                      <div className="font-medium">{personne.prenom} {personne.nom}</div>
                      <div className="text-sm text-muted-foreground">{personne.role}</div>
                    </div>
                    <Button
                      variant={isSelected ? "default" : "outline"} 
                      size="sm"
                      onClick={() => toggleParticipant(personne, !isSelected)}
                    >
                      {isSelected ? "Retirer" : "Ajouter"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setParticipantsOpen(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog d'édition d'une réunion */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Modifier la réunion</DialogTitle>
          </DialogHeader>
          {reunionEnEdition && (
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="edit-titre" className="text-sm font-medium">Titre</Label>
                <Input
                  id="edit-titre"
                  value={reunionEnEdition.titre}
                  onChange={(e) => setReunionEnEdition({...reunionEnEdition, titre: e.target.value})}
                />
              </div>
              
              {reunionEnEdition.type === "conseil" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-classe" className="text-sm font-medium">Classe</Label>
                    <Select 
                      onValueChange={(value) => setReunionEnEdition({...reunionEnEdition, classe: value})}
                      value={reunionEnEdition.classe}
                    >
                      <SelectTrigger id="edit-classe">
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        {classesList.map((classe) => (
                          <SelectItem key={classe} value={classe}>
                            {classe}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-trimestre" className="text-sm font-medium">Trimestre</Label>
                    <Select 
                      onValueChange={(value) => setReunionEnEdition({...reunionEnEdition, trimestre: parseInt(value)})}
                      value={reunionEnEdition.trimestre?.toString()}
                    >
                      <SelectTrigger id="edit-trimestre">
                        <SelectValue placeholder="Sélectionner un trimestre" />
                      </SelectTrigger>
                      <SelectContent>
                        {trimestres.map((t) => (
                          <SelectItem key={t} value={t.toString()}>
                            {t}er trimestre
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-date" className="text-sm font-medium">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {format(reunionEnEdition.date, "P", { locale: fr })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={reunionEnEdition.date}
                        onSelect={(date) => date && setReunionEnEdition({...reunionEnEdition, date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="edit-salle" className="text-sm font-medium">Salle</Label>
                  <Select 
                    onValueChange={(value) => setReunionEnEdition({...reunionEnEdition, salle: value})}
                    value={reunionEnEdition.salle}
                  >
                    <SelectTrigger id="edit-salle">
                      <SelectValue placeholder="Sélectionner une salle" />
                    </SelectTrigger>
                    <SelectContent>
                      {sallesList.map((salle) => (
                        <SelectItem key={salle} value={salle}>
                          {salle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-heureDebut" className="text-sm font-medium">Heure de début</Label>
                  <Input
                    id="edit-heureDebut"
                    type="time"
                    value={reunionEnEdition.heureDebut}
                    onChange={(e) => setReunionEnEdition({...reunionEnEdition, heureDebut: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-heureFin" className="text-sm font-medium">Heure de fin</Label>
                  <Input
                    id="edit-heureFin"
                    type="time"
                    value={reunionEnEdition.heureFin}
                    onChange={(e) => setReunionEnEdition({...reunionEnEdition, heureFin: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-participants" className="text-sm font-medium">Participants</Label>
                <div className="flex flex-wrap gap-2 my-2">
                  {reunionEnEdition.participants.map((p) => (
                    <Badge key={p.id} variant="secondary" className="pl-2 pr-1 py-1">
                      {p.prenom} {p.nom}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 ml-1 hover:bg-transparent"
                        onClick={() => toggleParticipant(p, false)}
                      >
                        <CloseIcon className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setParticipantsOpen(true)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Gérer les participants
                </Button>
              </div>

              <div>
                <Label htmlFor="edit-ordre-jour" className="text-sm font-medium">Ordre du jour</Label>
                <Input
                  id="edit-ordre-jour"
                  value={reunionEnEdition.ordre_du_jour || ''}
                  onChange={(e) => setReunionEnEdition({...reunionEnEdition, ordre_du_jour: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="edit-statut" className="text-sm font-medium">Statut</Label>
                <Select 
                  onValueChange={(value: "planifiée" | "terminée" | "annulée") => 
                    setReunionEnEdition({...reunionEnEdition, statut: value})
                  }
                  value={reunionEnEdition.statut}
                >
                  <SelectTrigger id="edit-statut">
                    <SelectValue placeholder="Statut de la réunion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planifiée">Planifiée</SelectItem>
                    <SelectItem value="terminée">Terminée</SelectItem>
                    <SelectItem value="annulée">Annulée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleEditerReunion}>Enregistrer les modifications</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog d'affichage des détails */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-[625px]">
          {reunionDetails && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  {reunionDetails.type === "conseil" ? (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Conseil de classe</span>
                  ) : (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Réunion pédagogique</span>
                  )}
                  {getStatusBadge(reunionDetails.statut)}
                </div>
                <DialogTitle className="text-xl mt-2">{reunionDetails.titre}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-medium">{formatDateComplete(reunionDetails.date)}</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Horaire</div>
                    <div className="font-medium">{reunionDetails.heureDebut} - {reunionDetails.heureFin}</div>
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Lieu</div>
                  <div className="font-medium">{reunionDetails.salle}</div>
                </div>

                {reunionDetails.ordre_du_jour && (
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Ordre du jour</div>
                    <div className="mt-1">{reunionDetails.ordre_du_jour}</div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium mb-2">Participants ({reunionDetails.participants.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {reunionDetails.participants.map((p) => (
                      <div key={p.id} className="flex items-start gap-2 p-2 border rounded-md">
                        <div className="bg-primary/10 text-primary rounded-full p-1.5">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{p.prenom} {p.nom}</div>
                          <div className="text-xs text-muted-foreground">{p.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>Fermer</Button>
                <Button onClick={() => {
                  setIsViewDetailsOpen(false);
                  openEditDialog(reunionDetails);
                }}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReunions;
