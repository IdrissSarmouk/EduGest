
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const emploiDuTemps = {
  "Lundi": [
    { id: 1, matiere: "Mathématiques", debut: "08:00", fin: "09:00", salle: "204", professeur: "M. Martin" },
    { id: 2, matiere: "Histoire-Géo", debut: "09:00", fin: "10:00", salle: "103", professeur: "Mme Dubois" },
    { id: 3, matiere: "RÉCRÉATION", debut: "10:00", fin: "10:15", salle: "", professeur: "" },
    { id: 4, matiere: "Français", debut: "10:15", fin: "11:15", salle: "301", professeur: "M. Bernard" },
    { id: 5, matiere: "Anglais", debut: "11:15", fin: "12:15", salle: "202", professeur: "Mme Johnson" },
    { id: 6, matiere: "PAUSE DÉJEUNER", debut: "12:15", fin: "13:30", salle: "", professeur: "" },
    { id: 7, matiere: "SVT", debut: "13:30", fin: "15:30", salle: "Lab 2", professeur: "M. Petit" },
  ],
  "Mardi": [
    { id: 1, matiere: "Physique-Chimie", debut: "08:00", fin: "10:00", salle: "Lab 1", professeur: "Mme Leroy" },
    { id: 2, matiere: "RÉCRÉATION", debut: "10:00", fin: "10:15", salle: "", professeur: "" },
    { id: 3, matiere: "Mathématiques", debut: "10:15", fin: "11:15", salle: "204", professeur: "M. Martin" },
    { id: 4, matiere: "Français", debut: "11:15", fin: "12:15", salle: "301", professeur: "M. Bernard" },
    { id: 5, matiere: "PAUSE DÉJEUNER", debut: "12:15", fin: "13:30", salle: "", professeur: "" },
    { id: 6, matiere: "EPS", debut: "13:30", fin: "15:30", salle: "Gymnase", professeur: "M. Durand" },
  ],
  "Mercredi": [
    { id: 1, matiere: "Anglais", debut: "08:00", fin: "09:00", salle: "202", professeur: "Mme Johnson" },
    { id: 2, matiere: "Histoire-Géo", debut: "09:00", fin: "10:00", salle: "103", professeur: "Mme Dubois" },
    { id: 3, matiere: "RÉCRÉATION", debut: "10:00", fin: "10:15", salle: "", professeur: "" },
    { id: 4, matiere: "Mathématiques", debut: "10:15", fin: "11:15", salle: "204", professeur: "M. Martin" },
    { id: 5, matiere: "Éducation musicale", debut: "11:15", fin: "12:15", salle: "Music", professeur: "M. Rodriguez" },
  ],
  "Jeudi": [
    { id: 1, matiere: "Français", debut: "08:00", fin: "10:00", salle: "301", professeur: "M. Bernard" },
    { id: 2, matiere: "RÉCRÉATION", debut: "10:00", fin: "10:15", salle: "", professeur: "" },
    { id: 3, matiere: "Mathématiques", debut: "10:15", fin: "11:15", salle: "204", professeur: "M. Martin" },
    { id: 4, matiere: "Technologie", debut: "11:15", fin: "12:15", salle: "Tech 1", professeur: "Mme Garcia" },
    { id: 5, matiere: "PAUSE DÉJEUNER", debut: "12:15", fin: "13:30", salle: "", professeur: "" },
    { id: 6, matiere: "SVT", debut: "13:30", fin: "14:30", salle: "Lab 2", professeur: "M. Petit" },
    { id: 7, matiere: "Physique-Chimie", debut: "14:30", fin: "15:30", salle: "Lab 1", professeur: "Mme Leroy" },
  ],
  "Vendredi": [
    { id: 1, matiere: "Histoire-Géo", debut: "08:00", fin: "09:00", salle: "103", professeur: "Mme Dubois" },
    { id: 2, matiere: "Anglais", debut: "09:00", fin: "10:00", salle: "202", professeur: "Mme Johnson" },
    { id: 3, matiere: "RÉCRÉATION", debut: "10:00", fin: "10:15", salle: "", professeur: "" },
    { id: 4, matiere: "Arts plastiques", debut: "10:15", fin: "11:15", salle: "Art", professeur: "M. Moreau" },
    { id: 5, matiere: "Vie de classe", debut: "11:15", fin: "12:15", salle: "103", professeur: "M. Bernard" },
    { id: 6, matiere: "PAUSE DÉJEUNER", debut: "12:15", fin: "13:30", salle: "", professeur: "" },
    { id: 7, matiere: "EPS", debut: "13:30", fin: "15:30", salle: "Gymnase", professeur: "M. Durand" },
  ],
};

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const semaines = Array.from({ length: 36 }, (_, i) => `Semaine ${i + 1}`);

const EmploiDuTempsPage = () => {
  const [selectedJour, setSelectedJour] = useState("Lundi");
  const [selectedSemaine, setSelectedSemaine] = useState("Semaine 10");
  
  const handlePrevDay = () => {
    const currentIndex = jours.indexOf(selectedJour);
    if (currentIndex > 0) {
      setSelectedJour(jours[currentIndex - 1]);
    } else {
      setSelectedJour(jours[jours.length - 1]);
    }
  };
  
  const handleNextDay = () => {
    const currentIndex = jours.indexOf(selectedJour);
    if (currentIndex < jours.length - 1) {
      setSelectedJour(jours[currentIndex + 1]);
    } else {
      setSelectedJour(jours[0]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Emploi du temps</h1>
        <p className="text-muted-foreground mt-2">
          Consultez votre emploi du temps hebdomadaire.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-60">
          <Select value={selectedSemaine} onValueChange={setSelectedSemaine}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une semaine" />
            </SelectTrigger>
            <SelectContent>
              {semaines.map((semaine) => (
                <SelectItem key={semaine} value={semaine}>{semaine}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={selectedJour} onValueChange={setSelectedJour}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Jour" />
            </SelectTrigger>
            <SelectContent>
              {jours.map((jour) => (
                <SelectItem key={jour} value={jour}>{jour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-5 gap-4 md:hidden">
        {jours.map((jour) => (
          <Button
            key={jour}
            variant={selectedJour === jour ? "default" : "outline"}
            className="w-full"
            onClick={() => setSelectedJour(jour)}
          >
            {jour}
          </Button>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{selectedJour} - {selectedSemaine}</span>
            <span className="text-sm text-muted-foreground">10/03/2025</span>
          </CardTitle>
          <CardDescription>Classe: 3ème B</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emploiDuTemps[selectedJour as keyof typeof emploiDuTemps]?.map((cours) => (
              <div 
                key={cours.id} 
                className={`p-3 rounded-md border ${
                  cours.matiere === "RÉCRÉATION" || cours.matiere === "PAUSE DÉJEUNER"
                    ? "bg-muted/40 border-dashed" 
                    : "bg-card"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className={`font-medium ${
                      cours.matiere === "RÉCRÉATION" || cours.matiere === "PAUSE DÉJEUNER"
                        ? "text-muted-foreground" 
                        : ""
                    }`}>
                      {cours.matiere}
                    </h3>
                    {cours.professeur && (
                      <p className="text-xs text-muted-foreground">{cours.professeur}</p>
                    )}
                  </div>
                  <Badge variant="outline">
                    {cours.debut} - {cours.fin}
                  </Badge>
                </div>
                {cours.salle && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Salle: {cours.salle}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmploiDuTempsPage;
