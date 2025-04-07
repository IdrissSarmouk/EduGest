
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { UserPlus, Search, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Données simulées des élèves
const elevesMock = [
  { id: 1, nom: "Dupont", prenom: "Thomas", classe: "3ème B", dateNaissance: "12/05/2010", email: "thomas.dupont@eleves.fr", options: ["Anglais LV1", "Espagnol LV2"], absences: 3 },
  { id: 2, nom: "Durand", prenom: "Emma", classe: "3ème B", dateNaissance: "23/07/2010", email: "emma.durand@eleves.fr", options: ["Anglais LV1", "Allemand LV2"], absences: 1 },
  { id: 3, nom: "Moreau", prenom: "Lucas", classe: "3ème B", dateNaissance: "05/03/2010", email: "lucas.moreau@eleves.fr", options: ["Anglais LV1", "Espagnol LV2", "Latin"], absences: 5 },
  { id: 4, nom: "Lefebvre", prenom: "Chloé", classe: "3ème A", dateNaissance: "17/11/2010", email: "chloe.lefebvre@eleves.fr", options: ["Anglais LV1", "Allemand LV2"], absences: 0 },
  { id: 5, nom: "Garcia", prenom: "Maxime", classe: "3ème A", dateNaissance: "09/01/2010", email: "maxime.garcia@eleves.fr", options: ["Anglais LV1", "Espagnol LV2", "Latin"], absences: 2 },
  { id: 6, nom: "Roux", prenom: "Camille", classe: "3ème C", dateNaissance: "30/08/2010", email: "camille.roux@eleves.fr", options: ["Anglais LV1", "Espagnol LV2"], absences: 4 },
  { id: 7, nom: "Fournier", prenom: "Louis", classe: "3ème C", dateNaissance: "14/04/2010", email: "louis.fournier@eleves.fr", options: ["Anglais LV1", "Allemand LV2"], absences: 1 },
];

// Liste des classes disponibles
const classesList = ["6ème A", "6ème B", "5ème A", "5ème B", "5ème C", "4ème A", "4ème B", "4ème C", "3ème A", "3ème B", "3ème C"];

// Liste des options disponibles
const optionsList = ["Anglais LV1", "Allemand LV1", "Espagnol LV1", "Espagnol LV2", "Allemand LV2", "Latin", "Grec", "Section Euro Anglais", "Section Euro Allemand", "Chorale"];

const AdminEleves = () => {
  const [eleves, setEleves] = useState(elevesMock);
  const [searchQuery, setSearchQuery] = useState("");
  const [classeFilter, setClasseFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEleve, setNewEleve] = useState({
    nom: "",
    prenom: "",
    classe: "",
    dateNaissance: "",
    email: "",
    option1: "",
    option2: ""
  });

  // Filtre les élèves en fonction de la recherche et de la classe
  const filteredEleves = eleves.filter((eleve) => {
    const fullName = `${eleve.nom} ${eleve.prenom}`.toLowerCase();
    const matchesSearch = searchQuery === "" || 
                          fullName.includes(searchQuery.toLowerCase()) || 
                          eleve.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClasse = classeFilter === "" || eleve.classe === classeFilter;
    return matchesSearch && matchesClasse;
  });

  // Fonction pour regrouper les élèves par classe
  const elevesParClasse = classesList.map(classe => {
    return {
      classe,
      eleves: eleves.filter(eleve => eleve.classe === classe)
    }
  }).filter(groupe => groupe.eleves.length > 0);

  const handleAddEleve = () => {
    const newId = Math.max(...eleves.map(e => e.id)) + 1;
    const options = [newEleve.option1];
    if (newEleve.option2) options.push(newEleve.option2);
    
    const newEleveRecord = {
      id: newId,
      nom: newEleve.nom,
      prenom: newEleve.prenom,
      classe: newEleve.classe,
      dateNaissance: newEleve.dateNaissance,
      email: newEleve.email,
      options,
      absences: 0
    };
    
    setEleves([...eleves, newEleveRecord]);
    setNewEleve({ nom: "", prenom: "", classe: "", dateNaissance: "", email: "", option1: "", option2: "" });
    setIsAddDialogOpen(false);
  };

  const handleDeleteEleve = (id: number) => {
    setEleves(eleves.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des élèves</h1>
        <p className="text-muted-foreground">
          Consultez et gérez les informations des élèves par classe.
        </p>
      </div>

      <Tabs defaultValue="liste" className="w-full">
        <TabsList>
          <TabsTrigger value="liste">Liste complète</TabsTrigger>
          <TabsTrigger value="classes">Par classe</TabsTrigger>
        </TabsList>
        
        <TabsContent value="liste">
          <div className="flex flex-col sm:flex-row justify-between gap-4 my-4">
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
                  <SelectItem value="">Toutes les classes</SelectItem>
                  {classesList.map((classe) => (
                    <SelectItem key={classe} value={classe}>{classe}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un élève
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouvel élève</DialogTitle>
                  <DialogDescription>
                    Complétez les informations pour créer un nouveau dossier élève.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nom" className="text-sm font-medium">Nom</label>
                      <Input
                        id="nom"
                        value={newEleve.nom}
                        onChange={(e) => setNewEleve({...newEleve, nom: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="prenom" className="text-sm font-medium">Prénom</label>
                      <Input
                        id="prenom"
                        value={newEleve.prenom}
                        onChange={(e) => setNewEleve({...newEleve, prenom: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="classe" className="text-sm font-medium">Classe</label>
                    <Select 
                      onValueChange={(value) => setNewEleve({...newEleve, classe: value})}
                      value={newEleve.classe}
                    >
                      <SelectTrigger>
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
                  <div className="space-y-2">
                    <label htmlFor="dateNaissance" className="text-sm font-medium">Date de naissance</label>
                    <Input
                      id="dateNaissance"
                      type="date"
                      value={newEleve.dateNaissance}
                      onChange={(e) => setNewEleve({...newEleve, dateNaissance: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      type="email"
                      value={newEleve.email}
                      onChange={(e) => setNewEleve({...newEleve, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="option1" className="text-sm font-medium">Option 1</label>
                    <Select 
                      onValueChange={(value) => setNewEleve({...newEleve, option1: value})}
                      value={newEleve.option1}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une option" />
                      </SelectTrigger>
                      <SelectContent>
                        {optionsList.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="option2" className="text-sm font-medium">Option 2 (facultatif)</label>
                    <Select 
                      onValueChange={(value) => setNewEleve({...newEleve, option2: value})}
                      value={newEleve.option2}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Aucune</SelectItem>
                        {optionsList.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                  <Button onClick={handleAddEleve}>Ajouter</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Date de naissance</TableHead>
                  <TableHead>Options</TableHead>
                  <TableHead>Absences</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEleves.map((eleve) => (
                  <TableRow key={eleve.id}>
                    <TableCell className="font-medium">
                      {eleve.prenom} {eleve.nom}
                      <div className="text-xs text-muted-foreground">{eleve.email}</div>
                    </TableCell>
                    <TableCell>{eleve.classe}</TableCell>
                    <TableCell>{eleve.dateNaissance}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {eleve.options.map((option) => (
                          <Badge key={option} variant="outline">
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={eleve.absences > 0 ? "warning" : "success"}>
                        {eleve.absences}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteEleve(eleve.id)}
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
        </TabsContent>
        
        <TabsContent value="classes">
          <div className="space-y-8 mt-4">
            {elevesParClasse.map((groupe) => (
              <div key={groupe.classe}>
                <h2 className="text-xl font-semibold mb-4">{groupe.classe} <span className="text-muted-foreground">({groupe.eleves.length} élèves)</span></h2>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Élève</TableHead>
                        <TableHead>Date de naissance</TableHead>
                        <TableHead>Options</TableHead>
                        <TableHead>Absences</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupe.eleves.map((eleve) => (
                        <TableRow key={eleve.id}>
                          <TableCell className="font-medium">
                            {eleve.prenom} {eleve.nom}
                            <div className="text-xs text-muted-foreground">{eleve.email}</div>
                          </TableCell>
                          <TableCell>{eleve.dateNaissance}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {eleve.options.map((option) => (
                                <Badge key={option} variant="outline">
                                  {option}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={eleve.absences > 0 ? "warning" : "success"}>
                              {eleve.absences}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteEleve(eleve.id)}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminEleves;
