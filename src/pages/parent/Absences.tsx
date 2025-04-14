
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const absences = [
  { id: 1, date: "15/03/2025", matiere: "SVT", duree: "2h", justifie: false, motif: "" },
  { id: 2, date: "05/03/2025", matiere: "Mathématiques", duree: "1h", justifie: true, motif: "Rendez-vous médical" },
  { id: 3, date: "20/02/2025", matiere: "EPS", duree: "2h", justifie: true, motif: "Maladie" },
];

const retards = [
  { id: 1, date: "18/03/2025", matiere: "Histoire-Géo", duree: "15min", justifie: false, motif: "" },
  { id: 2, date: "10/03/2025", matiere: "Français", duree: "10min", justifie: true, motif: "Retard de bus" },
  { id: 3, date: "28/02/2025", matiere: "Anglais", duree: "5min", justifie: true, motif: "Convocation CPE" },
  { id: 4, date: "15/02/2025", matiere: "Mathématiques", duree: "8min", justifie: true, motif: "Problème de transport" },
  { id: 5, date: "02/02/2025", matiere: "Physique-Chimie", duree: "12min", justifie: false, motif: "" },
];

const trimestres = ["Trimestre 1", "Trimestre 2", "Trimestre 3", "Année complète"];

const ParentAbsences = () => {
  const [selectedTrimestre, setSelectedTrimestre] = useState(trimestres[1]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Absences & Retards de Martin</h1>
        <p className="text-muted-foreground mt-2">
          Suivez les absences et retards de votre enfant durant l'année scolaire.
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
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Résumé</CardTitle>
              <Badge>{selectedTrimestre}</Badge>
            </div>
            <CardDescription>Absences et retards cumulés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-md text-center">
                <p className="text-3xl font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">Absences</p>
                <div className="mt-2 text-xs">
                  <Badge variant="outline">5 heures</Badge>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-md text-center">
                <p className="text-3xl font-bold text-primary">5</p>
                <p className="text-sm text-muted-foreground">Retards</p>
                <div className="mt-2 text-xs">
                  <Badge variant="outline">50 minutes</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Justifier une absence</CardTitle>
            <CardDescription>Pour les absences non justifiées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Pour justifier une absence ou un retard non justifié, veuillez cliquer sur le bouton ci-dessous et fournir un motif valable.
              </p>
              <Button>Justifier une absence ou un retard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="absences" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="absences">Absences</TabsTrigger>
          <TabsTrigger value="retards">Retards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="absences">
          <Card>
            <CardHeader>
              <CardTitle>Liste des absences</CardTitle>
              <CardDescription>
                {selectedTrimestre} - {absences.length} absence(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-10 px-2 text-left font-medium">Date</th>
                      <th className="h-10 px-2 text-left font-medium">Matière</th>
                      <th className="h-10 px-2 text-left font-medium">Durée</th>
                      <th className="h-10 px-2 text-left font-medium">Statut</th>
                      <th className="h-10 px-2 text-left font-medium">Motif</th>
                      <th className="h-10 px-2 text-left font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {absences.map((absence) => (
                      <tr key={absence.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-2 align-middle font-medium">{absence.date}</td>
                        <td className="p-2 align-middle">{absence.matiere}</td>
                        <td className="p-2 align-middle">{absence.duree}</td>
                        <td className="p-2 align-middle">
                          <Badge variant={absence.justifie ? "success" : "warning"}>
                            {absence.justifie ? "Justifiée" : "Non justifiée"}
                          </Badge>
                        </td>
                        <td className="p-2 align-middle">
                          {absence.motif || <span className="text-muted-foreground italic">Non spécifié</span>}
                        </td>
                        <td className="p-2 align-middle">
                          {!absence.justifie && (
                            <Button size="sm" variant="outline">Justifier</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="retards">
          <Card>
            <CardHeader>
              <CardTitle>Liste des retards</CardTitle>
              <CardDescription>
                {selectedTrimestre} - {retards.length} retard(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-10 px-2 text-left font-medium">Date</th>
                      <th className="h-10 px-2 text-left font-medium">Matière</th>
                      <th className="h-10 px-2 text-left font-medium">Durée</th>
                      <th className="h-10 px-2 text-left font-medium">Statut</th>
                      <th className="h-10 px-2 text-left font-medium">Motif</th>
                      <th className="h-10 px-2 text-left font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retards.map((retard) => (
                      <tr key={retard.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-2 align-middle font-medium">{retard.date}</td>
                        <td className="p-2 align-middle">{retard.matiere}</td>
                        <td className="p-2 align-middle">{retard.duree}</td>
                        <td className="p-2 align-middle">
                          <Badge variant={retard.justifie ? "success" : "warning"}>
                            {retard.justifie ? "Justifié" : "Non justifié"}
                          </Badge>
                        </td>
                        <td className="p-2 align-middle">
                          {retard.motif || <span className="text-muted-foreground italic">Non spécifié</span>}
                        </td>
                        <td className="p-2 align-middle">
                          {!retard.justifie && (
                            <Button size="sm" variant="outline">Justifier</Button>
                          )}
                        </td>
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

export default ParentAbsences;
