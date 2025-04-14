
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

const matieres = [
  { id: 1, nom: "Mathématiques", professeur: "M. Martin", moyenne: 14.5, tendance: "up" },
  { id: 2, nom: "Français", professeur: "M. Bernard", moyenne: 13.2, tendance: "down" },
  { id: 3, nom: "Histoire-Géographie", professeur: "Mme Dubois", moyenne: 15.0, tendance: "up" },
  { id: 4, nom: "Anglais", professeur: "Mme Johnson", moyenne: 16.5, tendance: "same" },
  { id: 5, nom: "SVT", professeur: "M. Petit", moyenne: 12.8, tendance: "up" },
  { id: 6, nom: "Physique-Chimie", professeur: "Mme Leroy", moyenne: 11.5, tendance: "down" },
  { id: 7, nom: "EPS", professeur: "M. Durand", moyenne: 17.0, tendance: "same" },
];

const notes = {
  "Mathématiques": [
    { id: 1, titre: "Contrôle sur les fonctions", date: "12/03/2025", note: 15, moyenne_classe: 12.5, coefficient: 2 },
    { id: 2, titre: "Interrogation sur les dérivées", date: "26/02/2025", note: 14, moyenne_classe: 13.2, coefficient: 1 },
    { id: 3, titre: "DM sur les suites", date: "15/02/2025", note: 16, moyenne_classe: 14.3, coefficient: 1 },
    { id: 4, titre: "Contrôle sur les statistiques", date: "28/01/2025", note: 13, moyenne_classe: 11.9, coefficient: 2 },
  ],
  "Français": [
    { id: 1, titre: "Dissertation sur Molière", date: "10/03/2025", note: 12, moyenne_classe: 11.5, coefficient: 2 },
    { id: 2, titre: "Commentaire littéraire", date: "20/02/2025", note: 14, moyenne_classe: 12.8, coefficient: 2 },
    { id: 3, titre: "Dictée", date: "05/02/2025", note: 15, moyenne_classe: 13.5, coefficient: 1 },
    { id: 4, titre: "Exposé oral", date: "15/01/2025", note: 13, moyenne_classe: 14.2, coefficient: 1 },
  ],
  "Histoire-Géographie": [
    { id: 1, titre: "Contrôle sur la Guerre Froide", date: "15/03/2025", note: 16, moyenne_classe: 13.7, coefficient: 2 },
    { id: 2, titre: "DM sur les espaces urbains", date: "28/02/2025", note: 15, moyenne_classe: 14.1, coefficient: 1 },
    { id: 3, titre: "Exposé: développement durable", date: "10/02/2025", note: 17, moyenne_classe: 14.8, coefficient: 1 },
    { id: 4, titre: "Contrôle sur la décolonisation", date: "20/01/2025", note: 14, moyenne_classe: 12.9, coefficient: 2 },
  ],
  "Anglais": [
    { id: 1, titre: "Contrôle de compréhension", date: "14/03/2025", note: 18, moyenne_classe: 14.3, coefficient: 2 },
    { id: 2, titre: "Expression écrite", date: "25/02/2025", note: 16, moyenne_classe: 13.7, coefficient: 1 },
    { id: 3, titre: "Oral: présentation", date: "08/02/2025", note: 17, moyenne_classe: 15.2, coefficient: 1 },
    { id: 4, titre: "Vocabulaire et grammaire", date: "18/01/2025", note: 15, moyenne_classe: 12.6, coefficient: 1 },
  ]
};

const ParentNotes = () => {
  const [selectedMatiere, setSelectedMatiere] = useState("Mathématiques");
  const [selectedTrimestre, setSelectedTrimestre] = useState("Trimestre 2");
  const trimestres = ["Trimestre 1", "Trimestre 2", "Trimestre 3", "Année complète"];
  
  const renderTendanceIcon = (tendance: string) => {
    if (tendance === "up") return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (tendance === "down") return <ArrowDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notes de Martin Dupont</h1>
        <p className="text-muted-foreground mt-2">
          Suivez les notes de votre enfant par matière et par trimestre.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-60">
          <Select value={selectedTrimestre} onValueChange={setSelectedTrimestre}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un trimestre" />
            </SelectTrigger>
            <SelectContent>
              {trimestres.map((trimestre) => (
                <SelectItem key={trimestre} value={trimestre}>{trimestre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Moyenne générale</CardTitle>
            <CardDescription>Trimestre 2 - 2024-2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">14.8/20</span>
              <Badge variant="success">Bien</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Rang: 5/28 - Moyenne de la classe: 12.3/20
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="notes-liste" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="notes-liste">Liste des matières</TabsTrigger>
          <TabsTrigger value="notes-detail">Détail par matière</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes-liste">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {matieres.map((matiere) => (
              <Card key={matiere.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setSelectedMatiere(matiere.nom)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{matiere.nom}</CardTitle>
                    {renderTendanceIcon(matiere.tendance)}
                  </div>
                  <CardDescription>{matiere.professeur}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Moyenne</p>
                      <p className="text-2xl font-bold text-primary">{matiere.moyenne}/20</p>
                    </div>
                    <Badge variant={matiere.moyenne >= 10 ? "success" : "destructive"} className="text-xs">
                      {matiere.moyenne >= 16 ? "Très bien" : 
                        matiere.moyenne >= 14 ? "Bien" :
                        matiere.moyenne >= 12 ? "Assez bien" :
                        matiere.moyenne >= 10 ? "Passable" : "Insuffisant"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="notes-detail">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{selectedMatiere}</CardTitle>
                  <CardDescription>
                    {matieres.find(m => m.nom === selectedMatiere)?.professeur} - {selectedTrimestre}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Moyenne:</p>
                  <Badge variant="success" className="text-sm">
                    {matieres.find(m => m.nom === selectedMatiere)?.moyenne}/20
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-10 px-2 text-left font-medium">Évaluation</th>
                      <th className="h-10 px-2 text-left font-medium">Date</th>
                      <th className="h-10 px-2 text-left font-medium">Note</th>
                      <th className="h-10 px-2 text-left font-medium">Moyenne classe</th>
                      <th className="h-10 px-2 text-left font-medium">Coefficient</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes[selectedMatiere as keyof typeof notes]?.map((note) => (
                      <tr key={note.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-2 align-middle font-medium">{note.titre}</td>
                        <td className="p-2 align-middle">{note.date}</td>
                        <td className="p-2 align-middle">
                          <Badge variant={note.note >= 10 ? "success" : "destructive"}>{note.note}/20</Badge>
                        </td>
                        <td className="p-2 align-middle">{note.moyenne_classe}/20</td>
                        <td className="p-2 align-middle">x{note.coefficient}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentNotes;
