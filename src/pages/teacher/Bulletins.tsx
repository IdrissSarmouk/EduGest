
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, Save } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const classes = [
  { id: 1, name: "6ème A" },
  { id: 2, name: "6ème B" },
  { id: 3, name: "5ème A" },
  { id: 4, name: "5ème B" },
];

const students = {
  "6ème A": [
    { id: 1, firstName: "Martin", lastName: "Dupont" },
    { id: 2, firstName: "Léa", lastName: "Martin" },
    { id: 3, firstName: "Lucas", lastName: "Bernard" },
  ],
};

const trimesters = ["Trimestre 1", "Trimestre 2", "Trimestre 3"];

const subjects = [
  { id: 1, name: "Français", coefficient: 5 },
  { id: 2, name: "Mathématiques", coefficient: 5 },
  { id: 3, name: "Histoire-Géographie", coefficient: 4 },
  { id: 4, name: "Anglais", coefficient: 3 },
  { id: 5, name: "SVT", coefficient: 2 },
  { id: 6, name: "Physique-Chimie", coefficient: 2 },
  { id: 7, name: "EPS", coefficient: 2 },
  { id: 8, name: "Arts Plastiques", coefficient: 1 },
  { id: 9, name: "Musique", coefficient: 1 },
];

const grades = {
  1: { // Martin Dupont
    "Français": {
      "Trimestre 1": { average: 14.5, comment: "Bon travail, participation active en classe." },
      "Trimestre 2": { average: 15.0, comment: "Excellente progression, très bonne maîtrise de l'expression écrite." },
    }
  }
};

const TeacherBulletins = () => {
  const [selectedClass, setSelectedClass] = useState("6ème A");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(1); // Default to first student
  const [selectedTrimester, setSelectedTrimester] = useState(trimesters[1]);
  const [generalComment, setGeneralComment] = useState("Martin montre un réel intérêt pour les matières littéraires. Il participe activement en classe et ses résultats sont très satisfaisants. Il doit maintenir ses efforts dans toutes les matières.");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bulletins Scolaires</h1>
        <p className="text-muted-foreground mt-2">
          Générez et consultez les bulletins trimestriels de vos élèves.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-40">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
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
        </div>

        <div className="w-full sm:w-60">
          <Select 
            value={selectedStudent?.toString() || ""} 
            onValueChange={(value) => setSelectedStudent(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Élève" />
            </SelectTrigger>
            <SelectContent>
              {students[selectedClass as keyof typeof students]?.map((student) => (
                <SelectItem key={student.id} value={student.id.toString()}>
                  {student.lastName} {student.firstName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-40">
          <Select value={selectedTrimester} onValueChange={setSelectedTrimester}>
            <SelectTrigger>
              <SelectValue placeholder="Trimestre" />
            </SelectTrigger>
            <SelectContent>
              {trimesters.map((trimester) => (
                <SelectItem key={trimester} value={trimester}>
                  {trimester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedStudent && (
        <Tabs defaultValue="bulletin" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bulletin">Bulletin</TabsTrigger>
            <TabsTrigger value="edit">Édition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bulletin">
            <Card>
              <CardHeader className="pb-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Bulletin Scolaire</CardTitle>
                    <CardDescription>
                      {selectedClass} - {selectedTrimester} - Année 2024-2025
                    </CardDescription>
                    <p className="mt-2 font-medium">
                      {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.lastName} {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.firstName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Printer className="mr-2 h-4 w-4" />
                      Imprimer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Exporter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Matière</TableHead>
                        <TableHead>Moyenne élève</TableHead>
                        <TableHead>Moyenne classe</TableHead>
                        <TableHead>Appréciation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjects.map((subject) => (
                        <TableRow key={subject.id}>
                          <TableCell className="font-medium">{subject.name}</TableCell>
                          <TableCell>
                            <Badge variant="success">
                              {grades[selectedStudent as keyof typeof grades]?.[subject.name]?.[selectedTrimester]?.average || "-"}/20
                            </Badge>
                          </TableCell>
                          <TableCell>13.5/20</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {grades[selectedStudent as keyof typeof grades]?.[subject.name]?.[selectedTrimester]?.comment || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Appréciation générale:</h3>
                    <div className="p-4 bg-muted rounded-lg">
                      {generalComment || "Aucune appréciation générale saisie."}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Moyenne générale:</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-primary">14.5/20</span>
                        <Badge variant="success">Bien</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Rang dans la classe:</h3>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold">3/22</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-4">
                <div className="text-xs text-muted-foreground">
                  <p>Généré le 05/05/2025 • Professeur principal: M. Dupont • École Avenir Digital</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>Édition du bulletin</CardTitle>
                <CardDescription>
                  {selectedClass} - {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.lastName} {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.firstName} - {selectedTrimester}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Notes et appréciations par matière</h3>
                    </div>
                    
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Matière</TableHead>
                            <TableHead>Note</TableHead>
                            <TableHead>Appréciation</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subjects.map((subject) => (
                            <TableRow key={subject.id}>
                              <TableCell className="font-medium">{subject.name}</TableCell>
                              <TableCell>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="20" 
                                  step="0.5"
                                  defaultValue={grades[selectedStudent as keyof typeof grades]?.[subject.name]?.[selectedTrimester]?.average || ""} 
                                  className="w-20" 
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  type="text"
                                  defaultValue={grades[selectedStudent as keyof typeof grades]?.[subject.name]?.[selectedTrimester]?.comment || ""} 
                                  placeholder="Ajouter une appréciation..."
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="general-comment" className="font-medium">Appréciation générale</label>
                      <Textarea 
                        id="general-comment"
                        value={generalComment}
                        onChange={(e) => setGeneralComment(e.target.value)}
                        rows={4}
                        placeholder="Ajoutez une appréciation générale..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline">Annuler</Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer le bulletin
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default TeacherBulletins;

// Declare Input component to avoid errors
const Input = ({ type, min, max, step, defaultValue, className, placeholder }: { 
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  defaultValue?: string | number;
  className?: string;
  placeholder?: string;
}) => (
  <input
    type={type || "text"}
    min={min}
    max={max}
    step={step}
    defaultValue={defaultValue}
    className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    placeholder={placeholder}
  />
);
