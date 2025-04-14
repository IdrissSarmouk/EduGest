import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react";

// Liste des classes disponibles
const classesList = ["6ème A", "6ème B", "5ème A", "5ème B", "5ème C", "4ème A", "4ème B", "4ème C", "3ème A", "3ème B", "3ème C"];

// Liste des enseignants
const enseignantsList = [
  { id: 1, nom: "Dubois", prenom: "Jean", matiere: "Mathématiques" },
  { id: 2, nom: "Martin", prenom: "Sophie", matiere: "Français" },
  { id: 3, nom: "Bernard", prenom: "Michel", matiere: "Histoire-Géographie" },
  { id: 4, nom: "Petit", prenom: "Claire", matiere: "Sciences" },
  { id: 5, nom: "Robert", prenom: "Nicolas", matiere: "Anglais" },
];

// Liste des salles
const sallesList = ["A101", "A102", "A103", "B201", "B202", "B203", "C301", "C302", "C303", "Gymnase", "CDI", "Labo SVT", "Labo Physique"];

// Jours de la semaine
const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

// Créneaux horaires
const creneauxHoraires = [
  { id: 1, debut: "08:00", fin: "09:00" },
  { id: 2, debut: "09:00", fin: "10:00" },
  { id: 3, debut: "10:15", fin: "11:15" },
  { id: 4, debut: "11:15", fin: "12:15" },
  { id: 5, debut: "13:45", fin: "14:45" },
  { id: 6, debut: "14:45", fin: "15:45" },
  { id: 7, debut: "16:00", fin: "17:00" },
];

// Données simulées d'emploi du temps pour la classe 3ème B
const emploiDuTempsMock = [
  { id: 1, jour: "Lundi", creneau: 1, matiere: "Mathématiques", enseignant: "M. Dubois", salle: "A101", classe: "3ème B" },
  { id: 2, jour: "Lundi", creneau: 2, matiere: "Français", enseignant: "Mme Martin", salle: "A101", classe: "3ème B" },
  { id: 3, jour: "Lundi", creneau: 3, matiere: "Histoire-Géo", enseignant: "M. Bernard", salle: "B201", classe: "3ème B" },
  { id: 4, jour: "Lundi", creneau: 6, matiere: "Anglais", enseignant: "M. Robert", salle: "C302", classe: "3ème B" },
  { id: 5, jour: "Mardi", creneau: 2, matiere: "Sciences", enseignant: "Mme Petit", salle: "Labo SVT", classe: "3ème B" },
  { id: 6, jour: "Mardi", creneau: 3, matiere: "Sciences", enseignant: "Mme Petit", salle: "Labo SVT", classe: "3ème B" },
  { id: 7, jour: "Mardi", creneau: 5, matiere: "Mathématiques", enseignant: "M. Dubois", salle: "A101", classe: "3ème B" },
  { id: 8, jour: "Mercredi", creneau: 1, matiere: "Histoire-Géo", enseignant: "M. Bernard", salle: "B201", classe: "3ème B" },
  { id: 9, jour: "Mercredi", creneau: 2, matiere: "Français", enseignant: "Mme Martin", salle: "A101", classe: "3ème B" },
  { id: 10, jour: "Jeudi", creneau: 3, matiere: "Anglais", enseignant: "M. Robert", salle: "C302", classe: "3ème B" },
  { id: 11, jour: "Jeudi", creneau: 4, matiere: "Mathématiques", enseignant: "M. Dubois", salle: "A101", classe: "3ème B" },
  { id: 12, jour: "Jeudi", creneau: 6, matiere: "Sciences", enseignant: "Mme Petit", salle: "Labo SVT", classe: "3ème B" },
  { id: 13, jour: "Vendredi", creneau: 1, matiere: "Français", enseignant: "Mme Martin", salle: "A101", classe: "3ème B" },
  { id: 14, jour: "Vendredi", creneau: 3, matiere: "Mathématiques", enseignant: "M. Dubois", salle: "A101", classe: "3ème B" },
  { id: 15, jour: "Vendredi", creneau: 5, matiere: "Histoire-Géo", enseignant: "M. Bernard", salle: "B201", classe: "3ème B" },
];

// Liste des matières
const matieresList = ["Mathématiques", "Français", "Histoire-Géographie", "Sciences", "Anglais", "Espagnol", "Allemand", "SVT", "Physique-Chimie", "Technologie", "Arts Plastiques", "Musique", "EPS", "Latin", "Grec"];

type Cours = {
  id: number;
  jour: string;
  creneau: number;
  matiere: string;
  enseignant: string;
  salle: string;
  classe: string;
};

const AdminEmploiDuTemps = () => {
  const [classeSelectionnee, setClasseSelectionnee] = useState("3ème B");
  const [emploiDuTemps, setEmploiDuTemps] = useState<Cours[]>(emploiDuTempsMock);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [nouveauCours, setNouveauCours] = useState({
    jour: "",
    creneau: "",
    matiere: "",
    enseignant: "",
    salle: "",
    classe: classeSelectionnee
  });

  // Filtre l'emploi du temps en fonction de la classe sélectionnée
  const emploiDuTempsFiltre = emploiDuTemps.filter(cours => cours.classe === classeSelectionnee);

  // Trouve un cours pour un jour et un créneau donnés
  const trouverCours = (jour: string, creneauId: number) => {
    return emploiDuTempsFiltre.find(cours => cours.jour === jour && cours.creneau === creneauId);
  };

  // Ajoute un nouveau cours
  const handleAddCours = () => {
    const newId = Math.max(...emploiDuTemps.map(c => c.id)) + 1;
    
    const nouveauCoursComplet: Cours = {
      id: newId,
      jour: nouveauCours.jour,
      creneau: parseInt(nouveauCours.creneau),
      matiere: nouveauCours.matiere,
      enseignant: nouveauCours.enseignant,
      salle: nouveauCours.salle,
      classe: classeSelectionnee
    };
    
    setEmploiDuTemps([...emploiDuTemps, nouveauCoursComplet]);
    setNouveauCours({
      jour: "",
      creneau: "",
      matiere: "",
      enseignant: "",
      salle: "",
      classe: classeSelectionnee
    });
    setIsAddDialogOpen(false);
  };

  // Supprime un cours
  const handleDeleteCours = (id: number) => {
    setEmploiDuTemps(emploiDuTemps.filter(cours => cours.id !== id));
  };

  // Récupère le nom complet d'un enseignant
  const getEnseignantNomComplet = (idEnseignant: string) => {
    const enseignant = enseignantsList.find(e => `${e.id}` === idEnseignant);
    return enseignant ? `${enseignant.prenom} ${enseignant.nom}` : idEnseignant;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des emplois du temps</h1>
        <p className="text-muted-foreground">
          Consultez et modifiez les emplois du temps par classe.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Select onValueChange={setClasseSelectionnee} value={classeSelectionnee}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sélectionner une classe" />
          </SelectTrigger>
          <SelectContent>
            {classesList.map((classe) => (
              <SelectItem key={classe} value={classe}>{classe}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un cours
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau cours</DialogTitle>
              <DialogDescription>
                Définissez les détails du cours à ajouter à l'emploi du temps de {classeSelectionnee}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jour">Jour</Label>
                  <Select 
                    onValueChange={(value) => setNouveauCours({...nouveauCours, jour: value})}
                    value={nouveauCours.jour}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un jour" />
                    </SelectTrigger>
                    <SelectContent>
                      {joursSemaine.map((jour) => (
                        <SelectItem key={jour} value={jour}>{jour}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creneau">Créneau horaire</Label>
                  <Select 
                    onValueChange={(value) => setNouveauCours({...nouveauCours, creneau: value})}
                    value={nouveauCours.creneau}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un créneau" />
                    </SelectTrigger>
                    <SelectContent>
                      {creneauxHoraires.map((creneau) => (
                        <SelectItem key={creneau.id} value={creneau.id.toString()}>
                          {creneau.debut} - {creneau.fin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="matiere">Matière</Label>
                <Select 
                  onValueChange={(value) => setNouveauCours({...nouveauCours, matiere: value})}
                  value={nouveauCours.matiere}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    {matieresList.map((matiere) => (
                      <SelectItem key={matiere} value={matiere}>{matiere}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="enseignant">Enseignant</Label>
                <Select 
                  onValueChange={(value) => setNouveauCours({...nouveauCours, enseignant: value})}
                  value={nouveauCours.enseignant}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un enseignant" />
                  </SelectTrigger>
                  <SelectContent>
                    {enseignantsList.map((enseignant) => (
                      <SelectItem key={enseignant.id} value={`${enseignant.id}`}>
                        {enseignant.prenom} {enseignant.nom} ({enseignant.matiere})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salle">Salle</Label>
                <Select 
                  onValueChange={(value) => setNouveauCours({...nouveauCours, salle: value})}
                  value={nouveauCours.salle}
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleAddCours}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Emploi du temps - {classeSelectionnee}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-1 font-medium text-center p-2 bg-muted">Horaires</div>
            {joursSemaine.map((jour) => (
              <div key={jour} className="col-span-1 font-medium text-center p-2 bg-muted">{jour}</div>
            ))}
            
            {creneauxHoraires.map((creneau) => (
              <React.Fragment key={creneau.id}>
                <div className="col-span-1 text-center p-2 bg-muted-foreground/10 flex flex-col justify-center">
                  <div className="font-medium">{creneau.debut}</div>
                  <div className="text-xs text-muted-foreground">-</div>
                  <div className="font-medium">{creneau.fin}</div>
                </div>
                
                {joursSemaine.map((jour) => {
                  const cours = trouverCours(jour, creneau.id);
                  return (
                    <div 
                      key={`${jour}-${creneau.id}`} 
                      className={`col-span-1 border p-2 ${cours ? 'bg-primary/10' : ''}`}
                    >
                      {cours ? (
                        <div className="relative">
                          <div className="font-medium">{cours.matiere}</div>
                          <div className="text-xs text-muted-foreground">{cours.enseignant}</div>
                          <div className="text-xs flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-[10px] px-1 py-0">{cours.salle}</Badge>
                          </div>
                          <div className="absolute top-0 right-0 flex gap-1">
                            <Button variant="ghost" size="icon" className="h-5 w-5">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5" 
                              onClick={() => handleDeleteCours(cours.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEmploiDuTemps;
