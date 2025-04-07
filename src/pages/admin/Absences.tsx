
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Search, UserPlus, CheckCircle, XCircle } from "lucide-react";

// Données simulées des absences
const absencesMock = [
  { id: 1, eleve: "Thomas Dupont", classe: "3ème B", date: "04/04/2025", motif: "Maladie", justifiee: true, duree: "Journée" },
  { id: 2, eleve: "Emma Durand", classe: "3ème B", date: "03/04/2025", motif: "Rendez-vous médical", justifiee: true, duree: "Matin" },
  { id: 3, eleve: "Lucas Moreau", classe: "3ème B", date: "02/04/2025", motif: null, justifiee: false, duree: "Après-midi" },
  { id: 4, eleve: "Chloé Lefebvre", classe: "3ème A", date: "01/04/2025", motif: "Familial", justifiee: true, duree: "Journée" },
  { id: 5, eleve: "Maxime Garcia", classe: "3ème A", date: "31/03/2025", motif: null, justifiee: false, duree: "2 heures" },
  { id: 6, eleve: "Camille Roux", classe: "3ème C", date: "30/03/2025", motif: "Compétition sportive", justifiee: true, duree: "Journée" },
  { id: 7, eleve: "Louis Fournier", classe: "3ème C", date: "29/03/2025", motif: null, justifiee: false, duree: "1 heure" },
  { id: 8, eleve: "Thomas Dupont", classe: "3ème B", date: "28/03/2025", motif: "Maladie", justifiee: true, duree: "2 jours" },
  { id: 9, eleve: "Lucas Moreau", classe: "3ème B", date: "25/03/2025", motif: null, justifiee: false, duree: "Après-midi" },
];

// Données simulées pour les retards
const retardsMock = [
  { id: 1, eleve: "Thomas Dupont", classe: "3ème B", date: "04/04/2025", duree: "15 min", motif: "Transport", justifiee: true },
  { id: 2, eleve: "Emma Durand", classe: "3ème B", date: "02/04/2025", duree: "10 min", motif: null, justifiee: false },
  { id: 3, eleve: "Maxime Garcia", classe: "3ème A", date: "01/04/2025", duree: "5 min", motif: null, justifiee: false },
  { id: 4, eleve: "Chloé Lefebvre", classe: "3ème A", date: "30/03/2025", duree: "20 min", motif: "Rendez-vous médical", justifiee: true },
  { id: 5, eleve: "Louis Fournier", classe: "3ème C", date: "28/03/2025", duree: "8 min", motif: null, justifiee: false },
];

// Liste des classes
const classesList = ["Toutes les classes", "3ème A", "3ème B", "3ème C", "4ème A", "4ème B", "4ème C"];

// Liste des motifs d'absence
const motifsList = ["Maladie", "Rendez-vous médical", "Familial", "Transport", "Compétition sportive", "Autre"];

// Liste de durées d'absence
const dureesList = ["1 heure", "2 heures", "Matin", "Après-midi", "Journée", "2 jours", "3 jours", "1 semaine"];

const AdminAbsences = () => {
  const [absences, setAbsences] = useState(absencesMock);
  const [retards, setRetards] = useState(retardsMock);
  const [searchQuery, setSearchQuery] = useState("");
  const [classeFilter, setClasseFilter] = useState("Toutes les classes");
  const [isAddAbsenceDialogOpen, setIsAddAbsenceDialogOpen] = useState(false);
  const [nouvelleAbsence, setNouvelleAbsence] = useState({
    eleve: "",
    classe: "",
    date: "",
    motif: "",
    duree: "",
    justifiee: "false"
  });

  // Filtrer les absences et retards
  const filteredAbsences = absences.filter((absence) => {
    const matchesSearch = searchQuery === "" || 
                          absence.eleve.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClasse = classeFilter === "Toutes les classes" || absence.classe === classeFilter;
    return matchesSearch && matchesClasse;
  });

  const filteredRetards = retards.filter((retard) => {
    const matchesSearch = searchQuery === "" || 
                          retard.eleve.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClasse = classeFilter === "Toutes les classes" || retard.classe === classeFilter;
    return matchesSearch && matchesClasse;
  });

  // Statistiques des absences
  const statsAbsences = {
    total: absences.length,
    justifiees: absences.filter(a => a.justifiee).length,
    nonJustifiees: absences.filter(a => !a.justifiee).length
  };

  // Statistiques des retards
  const statsRetards = {
    total: retards.length,
    justifies: retards.filter(r => r.justifiee).length,
    nonJustifies: retards.filter(r => !r.justifiee).length
  };

  // Ajouter une nouvelle absence
  const handleAddAbsence = () => {
    const newId = Math.max(...absences.map(a => a.id)) + 1;
    const nouvelleAbsenceComplete = {
      id: newId,
      eleve: nouvelleAbsence.eleve,
      classe: nouvelleAbsence.classe,
      date: nouvelleAbsence.date,
      motif: nouvelleAbsence.motif === "" ? null : nouvelleAbsence.motif,
      justifiee: nouvelleAbsence.justifiee === "true",
      duree: nouvelleAbsence.duree
    };
    
    setAbsences([nouvelleAbsenceComplete, ...absences]);
    setNouvelleAbsence({ eleve: "", classe: "", date: "", motif: "", duree: "", justifiee: "false" });
    setIsAddAbsenceDialogOpen(false);
  };

  // Justifier une absence
  const handleJustifierAbsence = (id: number) => {
    setAbsences(absences.map(absence => 
      absence.id === id ? { ...absence, justifiee: true, motif: "Validé par l'administration" } : absence
    ));
  };

  // Justifier un retard
  const handleJustifierRetard = (id: number) => {
    setRetards(retards.map(retard => 
      retard.id === id ? { ...retard, justifiee: true, motif: "Validé par l'administration" } : retard
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des absences et retards</h1>
        <p className="text-muted-foreground">
          Suivez et gérez les absences et retards des élèves.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des absences</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsAbsences.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {statsAbsences.justifiees} justifiées, {statsAbsences.nonJustifiees} non justifiées
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absences à valider</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsAbsences.nonJustifiees}</div>
            <p className="text-xs text-muted-foreground mt-1">
              En attente de justification
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retards</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsRetards.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {statsRetards.justifies} justifiés, {statsRetards.nonJustifies} non justifiés
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un élève..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select onValueChange={setClasseFilter} value={classeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Toutes les classes" />
            </SelectTrigger>
            <SelectContent>
              {classesList.map((classe) => (
                <SelectItem key={classe} value={classe}>{classe}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isAddAbsenceDialogOpen} onOpenChange={setIsAddAbsenceDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Déclarer une absence
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Déclarer une nouvelle absence</DialogTitle>
              <DialogDescription>
                Renseignez les informations concernant l'absence.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="eleve" className="text-sm font-medium">Nom de l'élève</label>
                  <Input
                    id="eleve"
                    value={nouvelleAbsence.eleve}
                    onChange={(e) => setNouvelleAbsence({...nouvelleAbsence, eleve: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="classe" className="text-sm font-medium">Classe</label>
                  <Select 
                    onValueChange={(value) => setNouvelleAbsence({...nouvelleAbsence, classe: value})}
                    value={nouvelleAbsence.classe}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      {classesList.filter(c => c !== "Toutes les classes").map((classe) => (
                        <SelectItem key={classe} value={classe}>{classe}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <Input
                  id="date"
                  type="date"
                  value={nouvelleAbsence.date}
                  onChange={(e) => setNouvelleAbsence({...nouvelleAbsence, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="duree" className="text-sm font-medium">Durée</label>
                <Select 
                  onValueChange={(value) => setNouvelleAbsence({...nouvelleAbsence, duree: value})}
                  value={nouvelleAbsence.duree}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    {dureesList.map((duree) => (
                      <SelectItem key={duree} value={duree}>{duree}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="motif" className="text-sm font-medium">Motif (optionnel)</label>
                <Select 
                  onValueChange={(value) => setNouvelleAbsence({...nouvelleAbsence, motif: value})}
                  value={nouvelleAbsence.motif}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un motif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Aucun motif</SelectItem>
                    {motifsList.map((motif) => (
                      <SelectItem key={motif} value={motif}>{motif}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="justifiee" className="text-sm font-medium">Justifiée ?</label>
                <Select 
                  onValueChange={(value) => setNouvelleAbsence({...nouvelleAbsence, justifiee: value})}
                  value={nouvelleAbsence.justifiee}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Absence justifiée ?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Oui</SelectItem>
                    <SelectItem value="false">Non</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAbsenceDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleAddAbsence}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="absences" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="absences">Absences</TabsTrigger>
          <TabsTrigger value="retards">Retards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="absences">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAbsences.map((absence) => (
                  <TableRow key={absence.id}>
                    <TableCell className="font-medium">{absence.eleve}</TableCell>
                    <TableCell>{absence.classe}</TableCell>
                    <TableCell>{absence.date}</TableCell>
                    <TableCell>{absence.duree}</TableCell>
                    <TableCell>{absence.motif || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={absence.justifiee ? "success" : "warning"}>
                        {absence.justifiee ? "Justifiée" : "Non justifiée"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {!absence.justifiee && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleJustifierAbsence(absence.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Justifier
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="retards">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRetards.map((retard) => (
                  <TableRow key={retard.id}>
                    <TableCell className="font-medium">{retard.eleve}</TableCell>
                    <TableCell>{retard.classe}</TableCell>
                    <TableCell>{retard.date}</TableCell>
                    <TableCell>{retard.duree}</TableCell>
                    <TableCell>{retard.motif || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={retard.justifiee ? "success" : "warning"}>
                        {retard.justifiee ? "Justifié" : "Non justifié"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {!retard.justifiee && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleJustifierRetard(retard.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Justifier
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAbsences;
