
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const classes = [
  { id: 1, name: "6ème A" },
  { id: 2, name: "6ème B" },
  { id: 3, name: "5ème A" },
  { id: 4, name: "5ème B" },
];

const students = {
  "6ème A": [
    { id: 1, firstName: "Martin", lastName: "Dupont", average: 14.5 },
    { id: 2, firstName: "Léa", lastName: "Martin", average: 16.0 },
    { id: 3, firstName: "Lucas", lastName: "Bernard", average: 12.8 },
    { id: 4, firstName: "Emma", lastName: "Petit", average: 15.2 },
    { id: 5, firstName: "Hugo", lastName: "Robert", average: 13.5 },
    { id: 6, firstName: "Chloé", lastName: "Richard", average: 11.7 },
    { id: 7, firstName: "Louis", lastName: "Durand", average: 9.8 },
  ],
  "6ème B": [
    { id: 8, firstName: "Inès", lastName: "Thomas", average: 13.2 },
    { id: 9, firstName: "Nathan", lastName: "Dubois", average: 10.5 },
    { id: 10, firstName: "Camille", lastName: "Moreau", average: 17.3 },
  ],
  "5ème A": [
    { id: 11, firstName: "Mathis", lastName: "Laurent", average: 12.0 },
    { id: 12, firstName: "Zoé", lastName: "Simon", average: 14.8 },
  ],
  "5ème B": [
    { id: 13, firstName: "Maxime", lastName: "Michel", average: 11.3 },
    { id: 14, firstName: "Sarah", lastName: "Lefebvre", average: 15.7 },
    { id: 15, firstName: "Jules", lastName: "Leroy", average: 13.9 },
  ],
};

const evaluations = {
  "6ème A": [
    { id: 1, title: "Contrôle de grammaire", date: "15/04/2025", coefficient: 2, status: "Notée" },
    { id: 2, title: "Dictée", date: "22/04/2025", coefficient: 1, status: "Notée" },
    { id: 3, title: "Rédaction", date: "29/04/2025", coefficient: 3, status: "À noter" },
  ],
  "6ème B": [
    { id: 4, title: "Contrôle de grammaire", date: "16/04/2025", coefficient: 2, status: "Notée" },
    { id: 5, title: "Dictée", date: "23/04/2025", coefficient: 1, status: "À noter" },
  ],
  "5ème A": [
    { id: 6, title: "Dissertation", date: "14/04/2025", coefficient: 3, status: "Notée" },
    { id: 7, title: "Commentaire littéraire", date: "21/04/2025", coefficient: 2, status: "À noter" },
  ],
  "5ème B": [
    { id: 8, title: "Dissertation", date: "13/04/2025", coefficient: 3, status: "Notée" },
    { id: 9, title: "Commentaire littéraire", date: "20/04/2025", coefficient: 2, status: "Notée" },
    { id: 10, title: "Exposé oral", date: "27/04/2025", coefficient: 1, status: "Planifiée" },
  ],
};

const evaluationGrades = {
  1: [
    { studentId: 1, grade: 15.5 },
    { studentId: 2, grade: 18.0 },
    { studentId: 3, grade: 12.0 },
    { studentId: 4, grade: 16.5 },
    { studentId: 5, grade: 14.0 },
    { studentId: 6, grade: 11.0 },
    { studentId: 7, grade: 9.5 },
  ],
  2: [
    { studentId: 1, grade: 13.0 },
    { studentId: 2, grade: 14.0 },
    { studentId: 3, grade: 12.5 },
    { studentId: 4, grade: 15.0 },
    { studentId: 5, grade: 13.0 },
    { studentId: 6, grade: 12.0 },
    { studentId: 7, grade: 10.0 },
  ]
};

const TeacherNotes = () => {
  const [selectedClass, setSelectedClass] = useState("6ème A");
  const [selectedTab, setSelectedTab] = useState("eleves");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvaluation, setSelectedEvaluation] = useState<number | null>(null);
  const [isAddEvaluationDialogOpen, setIsAddEvaluationDialogOpen] = useState(false);
  const [newEvaluation, setNewEvaluation] = useState({
    title: "",
    date: "",
    coefficient: "1",
    classId: ""
  });

  // Filter students based on search
  const filteredStudents = students[selectedClass as keyof typeof students].filter(
    (student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    }
  );

  const filteredEvaluations = evaluations[selectedClass as keyof typeof evaluations];

  // Function to calculate the average
  const calculateClassAverage = (classId: string) => {
    const classStudents = students[classId as keyof typeof students] || [];
    if (classStudents.length === 0) return 0;
    
    const total = classStudents.reduce((sum, student) => sum + student.average, 0);
    return (total / classStudents.length).toFixed(1);
  };

  // Function to handle adding a new evaluation
  const handleAddEvaluation = () => {
    // Here you would typically add the evaluation to your database
    // For now we'll just close the dialog
    setIsAddEvaluationDialogOpen(false);
    setNewEvaluation({
      title: "",
      date: "",
      coefficient: "1",
      classId: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Notes</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les notes de vos élèves par classe et par évaluation.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={selectedClass}
            onValueChange={(value) => {
              setSelectedClass(value);
              setSelectedEvaluation(null);
            }}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Classe" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.name}>
                  {classItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative w-full sm:w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Rechercher un élève..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Dialog open={isAddEvaluationDialogOpen} onOpenChange={setIsAddEvaluationDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une évaluation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une évaluation</DialogTitle>
              <DialogDescription>
                Complétez les informations pour créer une nouvelle évaluation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Titre</label>
                <Input
                  id="title"
                  value={newEvaluation.title}
                  onChange={(e) => setNewEvaluation({...newEvaluation, title: e.target.value})}
                  placeholder="Ex: Contrôle de grammaire"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <Input
                  id="date"
                  type="date"
                  value={newEvaluation.date}
                  onChange={(e) => setNewEvaluation({...newEvaluation, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="coefficient" className="text-sm font-medium">Coefficient</label>
                <Select 
                  value={newEvaluation.coefficient}
                  onValueChange={(value) => setNewEvaluation({...newEvaluation, coefficient: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Coefficient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="class" className="text-sm font-medium">Classe</label>
                <Select 
                  value={newEvaluation.classId}
                  onValueChange={(value) => setNewEvaluation({...newEvaluation, classId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((classItem) => (
                      <SelectItem key={classItem.id} value={classItem.name}>
                        {classItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEvaluationDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleAddEvaluation}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Moyenne de classe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{calculateClassAverage(selectedClass)}/20</div>
            <p className="text-xs text-muted-foreground mt-1">{students[selectedClass as keyof typeof students]?.length || 0} élèves</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="eleves">Liste des élèves</TabsTrigger>
          <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
          <TabsTrigger value="saisie">Saisie des notes</TabsTrigger>
        </TabsList>

        <TabsContent value="eleves">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Élèves de {selectedClass}</CardTitle>
                  <CardDescription>
                    {filteredStudents.length} élève(s) trouvé(s)
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> Filtrer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Moyenne</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.lastName}</TableCell>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell>
                          <Badge variant={student.average >= 10 ? "success" : "destructive"}>
                            {student.average}/20
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluations">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Évaluations {selectedClass}</CardTitle>
                  <CardDescription>
                    {filteredEvaluations.length} évaluation(s)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Coefficient</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvaluations.map((evaluation) => (
                      <TableRow key={evaluation.id}>
                        <TableCell className="font-medium">{evaluation.title}</TableCell>
                        <TableCell>{evaluation.date}</TableCell>
                        <TableCell>x{evaluation.coefficient}</TableCell>
                        <TableCell>
                          <Badge variant={
                            evaluation.status === "Notée" ? "success" : 
                            evaluation.status === "À noter" ? "warning" : "outline"
                          }>
                            {evaluation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            onClick={() => {
                              setSelectedEvaluation(evaluation.id);
                              setSelectedTab("saisie");
                            }}
                          >
                            Saisir les notes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saisie">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {selectedEvaluation ? 
                      filteredEvaluations.find(e => e.id === selectedEvaluation)?.title : 
                      "Sélectionnez une évaluation"}
                  </CardTitle>
                  <CardDescription>
                    {selectedEvaluation ? 
                      `${selectedClass} - Coefficient ${filteredEvaluations.find(e => e.id === selectedEvaluation)?.coefficient}` : 
                      "Veuillez sélectionner une évaluation dans l'onglet Évaluations"}
                  </CardDescription>
                </div>
                {selectedEvaluation && (
                  <Button>Enregistrer les notes</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedEvaluation ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Note /20</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => {
                        const grade = evaluationGrades[selectedEvaluation as keyof typeof evaluationGrades]?.find(
                          g => g.studentId === student.id
                        )?.grade;
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.lastName}</TableCell>
                            <TableCell>{student.firstName}</TableCell>
                            <TableCell>
                              <Input 
                                type="number" 
                                min="0"
                                max="20"
                                step="0.5"
                                defaultValue={grade} 
                                className="w-20"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Sélectionnez une évaluation pour saisir les notes</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherNotes;
