
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, FileText, Clock, BookOpen, MessageSquare } from "lucide-react";
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
    { 
      id: 1, 
      firstName: "Martin", 
      lastName: "Dupont", 
      birthDate: "12/05/2014",
      average: 14.5,
      attendance: 98,
      behavior: "Bon",
      notes: "Élève sérieux et appliqué, participe bien en classe.",
      parents: "M. et Mme Dupont - 06 12 34 56 78"
    },
    { 
      id: 2, 
      firstName: "Léa", 
      lastName: "Martin", 
      birthDate: "23/07/2014",
      average: 16.0,
      attendance: 100,
      behavior: "Très bon",
      notes: "Excellente élève, très impliquée dans son travail.",
      parents: "Mme Martin - 06 23 45 67 89"
    },
    { 
      id: 3, 
      firstName: "Lucas", 
      lastName: "Bernard", 
      birthDate: "05/03/2014",
      average: 12.8,
      attendance: 92,
      behavior: "Perfectible",
      notes: "Élève avec du potentiel mais qui manque parfois de concentration.",
      parents: "M. Bernard - 06 34 56 78 90"
    },
  ]
};

const studentNotes = [
  { 
    id: 1, 
    studentId: 1, 
    date: "02/05/2025", 
    type: "Contrôle", 
    subject: "Français",
    title: "Contrôle de grammaire",
    grade: 15.5,
    classAverage: 13.2,
    coefficient: 2,
    teacher: "Mme Dubois"
  },
  { 
    id: 2, 
    studentId: 1, 
    date: "25/04/2025", 
    type: "Dictée", 
    subject: "Français",
    title: "Dictée préparée",
    grade: 14.0,
    classAverage: 12.5,
    coefficient: 1,
    teacher: "Mme Dubois"
  },
];

const studentAbsences = [
  { 
    id: 1, 
    studentId: 1, 
    date: "27/04/2025", 
    type: "Retard", 
    duration: "15 minutes",
    justified: true,
    reason: "Retard de bus"
  },
  { 
    id: 2, 
    studentId: 3, 
    date: "25/04/2025", 
    type: "Absence", 
    duration: "Journée complète",
    justified: true,
    reason: "Maladie - certificat médical reçu"
  },
];

const studentComments = [
  {
    id: 1,
    studentId: 1,
    date: "30/04/2025",
    teacher: "Mme Dubois (Français)",
    content: "Martin a rendu un excellent devoir de rédaction. Son style s'améliore nettement."
  },
  {
    id: 2,
    studentId: 3,
    date: "28/04/2025",
    teacher: "M. Martin (Mathématiques)",
    content: "Lucas a été distrait pendant le cours et a perturbé ses camarades à plusieurs reprises."
  },
];

const TeacherEleves = () => {
  const [selectedClass, setSelectedClass] = useState("6ème A");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState("profile");

  // Filter students based on search query
  const filteredStudents = students[selectedClass as keyof typeof students]?.filter(
    (student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dossiers élèves</h1>
        <p className="text-muted-foreground mt-2">
          Consultez les informations détaillées sur vos élèves.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
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

        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtrer
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Liste des élèves</CardTitle>
            <CardDescription>
              {filteredStudents?.length || 0} élève(s) dans {selectedClass}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
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
                  {filteredStudents?.map((student) => (
                    <TableRow 
                      key={student.id} 
                      className={`cursor-pointer ${selectedStudent === student.id ? "bg-muted" : ""}`}
                      onClick={() => setSelectedStudent(student.id)}
                    >
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

        <Card className="md:col-span-8">
          {selectedStudent ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.lastName}{" "}
                      {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.firstName}
                    </CardTitle>
                    <CardDescription>
                      {selectedClass} - Né(e) le {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.birthDate}
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contacter les parents
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contacter les parents</DialogTitle>
                        <DialogDescription>
                          Parents de {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.firstName}{" "}
                          {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.lastName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="mb-4">
                          Coordonnées: {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.parents}
                        </p>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Sujet</label>
                            <Input placeholder="Sujet du message" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <textarea 
                              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Écrivez votre message ici..."
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Annuler</Button>
                        <Button>Envoyer</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="absences">Absences</TabsTrigger>
                    <TabsTrigger value="comments">Commentaires</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile">
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Moyenne générale</p>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-primary">
                              {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.average}/20
                            </span>
                            <Badge variant="success" className="ml-2">
                              {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.average! >= 16 ? "Très bien" : 
                                students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.average! >= 14 ? "Bien" :
                                students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.average! >= 12 ? "Assez bien" :
                                students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.average! >= 10 ? "Passable" : "Insuffisant"}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-medium">Assiduité</p>
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-primary">
                              {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.attendance}%
                            </span>
                            <Badge variant={
                              students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.attendance! >= 95 ? "success" : 
                              students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.attendance! >= 90 ? "warning" : 
                              "destructive"
                            } className="ml-2">
                              {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.attendance! >= 95 ? "Excellent" : 
                              students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.attendance! >= 90 ? "Bon" : 
                              "À surveiller"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Comportement</p>
                          <p>{students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.behavior}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Observations générales</p>
                          <p className="text-muted-foreground">
                            {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.notes}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Coordonnées des parents</p>
                          <p className="text-muted-foreground">
                            {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.parents}
                          </p>
                        </div>
                      </div>

                      <div>
                        <textarea 
                          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Ajouter un commentaire sur cet élève..."
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm">Enregistrer</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Notes récentes</h3>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Voir toutes les notes
                        </Button>
                      </div>
                      
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Évaluation</TableHead>
                              <TableHead>Note</TableHead>
                              <TableHead>Moyenne classe</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentNotes
                              .filter(note => note.studentId === selectedStudent)
                              .map((note) => (
                                <TableRow key={note.id}>
                                  <TableCell>{note.date}</TableCell>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{note.title}</p>
                                      <p className="text-xs text-muted-foreground">{note.subject} - Coef. {note.coefficient}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant={note.grade >= 10 ? "success" : "destructive"}>
                                      {note.grade}/20
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{note.classAverage}/20</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex justify-center py-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Ajouter une note
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Ajouter une note</DialogTitle>
                              <DialogDescription>
                                {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.firstName}{" "}
                                {students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.lastName} - {selectedClass}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4 grid gap-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Matière</label>
                                  <Select defaultValue="francais">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner une matière" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="francais">Français</SelectItem>
                                      <SelectItem value="maths">Mathématiques</SelectItem>
                                      <SelectItem value="histoire">Histoire-Géographie</SelectItem>
                                      <SelectItem value="anglais">Anglais</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Type d'évaluation</label>
                                  <Select defaultValue="controle">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner un type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="controle">Contrôle</SelectItem>
                                      <SelectItem value="dictee">Dictée</SelectItem>
                                      <SelectItem value="devoir">Devoir maison</SelectItem>
                                      <SelectItem value="oral">Présentation orale</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Titre de l'évaluation</label>
                                <Input placeholder="Titre de l'évaluation" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Note /20</label>
                                  <Input type="number" min="0" max="20" step="0.5" placeholder="Note" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Coefficient</label>
                                  <Select defaultValue="1">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Coefficient" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1</SelectItem>
                                      <SelectItem value="2">2</SelectItem>
                                      <SelectItem value="3">3</SelectItem>
                                      <SelectItem value="4">4</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Date</label>
                                <Input type="date" />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Annuler</Button>
                              <Button>Enregistrer</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="absences">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Absences et retards</h3>
                        <Button variant="outline" size="sm">
                          <Clock className="mr-2 h-4 w-4" />
                          Ajouter une absence
                        </Button>
                      </div>
                      
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Durée</TableHead>
                              <TableHead>Justifiée</TableHead>
                              <TableHead>Motif</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentAbsences
                              .filter(absence => absence.studentId === selectedStudent)
                              .map((absence) => (
                                <TableRow key={absence.id}>
                                  <TableCell>{absence.date}</TableCell>
                                  <TableCell>
                                    <Badge variant={absence.type === "Absence" ? "destructive" : "warning"}>
                                      {absence.type}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{absence.duration}</TableCell>
                                  <TableCell>
                                    <Badge variant={absence.justified ? "success" : "outline"}>
                                      {absence.justified ? "Oui" : "Non"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {absence.reason || <span className="text-muted-foreground italic">Non spécifié</span>}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {studentAbsences.filter(absence => absence.studentId === selectedStudent).length === 0 && (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">Aucune absence ou retard enregistré</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="comments">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Commentaires et observations</h3>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Ajouter un commentaire
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {studentComments
                          .filter(comment => comment.studentId === selectedStudent)
                          .map((comment) => (
                            <div key={comment.id} className="border rounded-lg p-4">
                              <div className="flex justify-between mb-2">
                                <p className="font-medium">{comment.teacher}</p>
                                <p className="text-sm text-muted-foreground">{comment.date}</p>
                              </div>
                              <p className="text-muted-foreground">{comment.content}</p>
                            </div>
                          ))}
                        
                        {studentComments.filter(comment => comment.studentId === selectedStudent).length === 0 && (
                          <div className="text-center py-4">
                            <p className="text-muted-foreground">Aucun commentaire enregistré</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          ) : (
            <div className="h-[500px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Sélectionnez un élève</h3>
                <p className="text-muted-foreground">
                  Cliquez sur un élève dans la liste pour afficher son dossier
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TeacherEleves;
