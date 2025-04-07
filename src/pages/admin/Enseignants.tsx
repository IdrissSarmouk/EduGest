
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
import { UserPlus, Pencil, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Données simulées des enseignants
const enseignantsMock = [
  { id: 1, nom: "Dubois", prenom: "Jean", matieres: ["Mathématiques"], classes: ["3ème A", "3ème B", "4ème C"], email: "jean.dubois@ecole.fr" },
  { id: 2, nom: "Martin", prenom: "Sophie", matieres: ["Français", "Latin"], classes: ["6ème A", "6ème B", "5ème A"], email: "sophie.martin@ecole.fr" },
  { id: 3, nom: "Bernard", prenom: "Michel", matieres: ["Histoire-Géographie"], classes: ["3ème A", "3ème B", "3ème C"], email: "michel.bernard@ecole.fr" },
  { id: 4, nom: "Petit", prenom: "Claire", matieres: ["Sciences"], classes: ["4ème A", "4ème B", "5ème C"], email: "claire.petit@ecole.fr" },
  { id: 5, nom: "Robert", prenom: "Nicolas", matieres: ["Anglais"], classes: ["6ème A", "5ème B", "4ème C", "3ème A"], email: "nicolas.robert@ecole.fr" },
];

// Liste des matières disponibles
const matieresList = ["Mathématiques", "Français", "Histoire-Géographie", "Sciences", "Anglais", "Espagnol", "Allemand", "SVT", "Physique-Chimie", "Technologie", "Arts Plastiques", "Musique", "EPS", "Latin", "Grec"];

// Liste des classes disponibles
const classesList = ["6ème A", "6ème B", "5ème A", "5ème B", "5ème C", "4ème A", "4ème B", "4ème C", "3ème A", "3ème B", "3ème C"];

const AdminEnseignants = () => {
  const [enseignants, setEnseignants] = useState(enseignantsMock);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEnseignant, setNewEnseignant] = useState({
    nom: "",
    prenom: "",
    email: "",
    matiere: "",
    classe: ""
  });

  // Filtre les enseignants en fonction de la recherche
  const filteredEnseignants = enseignants.filter((enseignant) => {
    const fullName = `${enseignant.nom} ${enseignant.prenom}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           enseignant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           enseignant.matieres.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
           enseignant.classes.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleAddEnseignant = () => {
    const newId = Math.max(...enseignants.map(e => e.id)) + 1;
    const newEnseignantRecord = {
      id: newId,
      nom: newEnseignant.nom,
      prenom: newEnseignant.prenom,
      email: newEnseignant.email,
      matieres: [newEnseignant.matiere],
      classes: [newEnseignant.classe]
    };
    setEnseignants([...enseignants, newEnseignantRecord]);
    setNewEnseignant({ nom: "", prenom: "", email: "", matiere: "", classe: "" });
    setIsAddDialogOpen(false);
  };

  const handleDeleteEnseignant = (id: number) => {
    setEnseignants(enseignants.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des enseignants</h1>
        <p className="text-muted-foreground">
          Ajoutez, modifiez ou supprimez des enseignants et attribuez-leur des matières et des classes.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un enseignant..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un enseignant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel enseignant</DialogTitle>
              <DialogDescription>
                Complétez les informations pour créer un nouveau compte enseignant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nom" className="text-sm font-medium">Nom</label>
                  <Input
                    id="nom"
                    value={newEnseignant.nom}
                    onChange={(e) => setNewEnseignant({...newEnseignant, nom: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="prenom" className="text-sm font-medium">Prénom</label>
                  <Input
                    id="prenom"
                    value={newEnseignant.prenom}
                    onChange={(e) => setNewEnseignant({...newEnseignant, prenom: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={newEnseignant.email}
                  onChange={(e) => setNewEnseignant({...newEnseignant, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="matiere" className="text-sm font-medium">Matière principale</label>
                <Select 
                  onValueChange={(value) => setNewEnseignant({...newEnseignant, matiere: value})}
                  value={newEnseignant.matiere}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    {matieresList.map((matiere) => (
                      <SelectItem key={matiere} value={matiere}>
                        {matiere}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="classe" className="text-sm font-medium">Classe principale</label>
                <Select 
                  onValueChange={(value) => setNewEnseignant({...newEnseignant, classe: value})}
                  value={newEnseignant.classe}
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleAddEnseignant}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Enseignant</TableHead>
              <TableHead>Matières</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnseignants.map((enseignant) => (
              <TableRow key={enseignant.id}>
                <TableCell className="font-medium">
                  {enseignant.prenom} {enseignant.nom}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {enseignant.matieres.map((matiere) => (
                      <Badge key={matiere} variant="outline">
                        {matiere}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {enseignant.classes.map((classe) => (
                      <Badge key={classe} variant="secondary">
                        {classe}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{enseignant.email}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteEnseignant(enseignant.id)}
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
  );
};

export default AdminEnseignants;
