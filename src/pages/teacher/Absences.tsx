
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon, CheckCircle, Clock, Filter, Plus, Search } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Mock data
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
    { id: 4, firstName: "Emma", lastName: "Petit" },
    { id: 5, firstName: "Hugo", lastName: "Robert" },
    { id: 6, firstName: "Chloé", lastName: "Richard" },
    { id: 7, firstName: "Louis", lastName: "Durand" },
  ]
};

const absences = [
  { 
    id: 1, 
    studentId: 3, 
    date: "2025-05-02", 
    type: "absence", 
    period: "Journée complète", 
    justified: false, 
    reason: "",
    class: "6ème A"
  },
  { 
    id: 2, 
    studentId: 5, 
    date: "2025-05-02", 
    type: "absence", 
    period: "Après-midi", 
    justified: true, 
    reason: "Rendez-vous médical",
    class: "6ème A"
  },
  { 
    id: 3, 
    studentId: 1, 
    date: "2025-05-03", 
    type: "retard", 
    period: "15 minutes", 
    justified: false, 
    reason: "",
    class: "6ème A"
  },
  { 
    id: 4, 
    studentId: 7, 
    date: "2025-05-05", 
    type: "absence", 
    period: "Matin", 
    justified: true, 
    reason: "Maladie",
    class: "6ème A"
  },
];

const TeacherAbsences = () => {
  const [selectedClass, setSelectedClass] = useState("6ème A");
  const [selectedTab, setSelectedTab] = useState("saisie");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddAbsenceDialogOpen, setIsAddAbsenceDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [absenceType, setAbsenceType] = useState("absence");
  const [absencePeriod, setAbsencePeriod] = useState("morning");
  const [absenceReason, setAbsenceReason] = useState("");

  const formattedDate = format(selectedDate, "P", { locale: fr });
  
  const filteredStudents = students[selectedClass as keyof typeof students]?.filter(
    (student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    }
  );

  const handleSelectStudent = (studentId: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleAddAbsence = () => {
    // Logic to add absence entries
    setIsAddAbsenceDialogOpen(false);
    setSelectedStudents([]);
    setAbsenceType("absence");
    setAbsencePeriod("morning");
    setAbsenceReason("");
  };

  // Filter the absences for the current date/class view
  const filteredAbsences = absences.filter(
    absence => absence.date === format(selectedDate, "yyyy-MM-dd") && absence.class === selectedClass
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Absences</h1>
        <p className="text-muted-foreground mt-2">
          Enregistrez et gérez les absences et retards de vos élèves.
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

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formattedDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Dialog open={isAddAbsenceDialogOpen} onOpenChange={setIsAddAbsenceDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une absence
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Saisir des absences ou retards</DialogTitle>
              <DialogDescription>
                {selectedClass} - {formattedDate}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select 
                  value={absenceType} 
                  onValueChange={setAbsenceType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="absence">Absence</SelectItem>
                    <SelectItem value="retard">Retard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Période</label>
                <Select 
                  value={absencePeriod} 
                  onValueChange={setAbsencePeriod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    {absenceType === "absence" ? (
                      <>
                        <SelectItem value="morning">Matin</SelectItem>
                        <SelectItem value="afternoon">Après-midi</SelectItem>
                        <SelectItem value="full_day">Journée complète</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="5min">5 minutes</SelectItem>
                        <SelectItem value="10min">10 minutes</SelectItem>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="other">Autre durée</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Motif (optionnel)</label>
                <Input 
                  value={absenceReason} 
                  onChange={e => setAbsenceReason(e.target.value)} 
                  placeholder="Motif de l'absence ou du retard" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Élèves</label>
                <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                  {filteredStudents.map(student => (
                    <div key={student.id} className="flex items-center space-x-2 py-2">
                      <Checkbox 
                        id={`student-${student.id}`} 
                        checked={selectedStudents.includes(student.id)} 
                        onCheckedChange={(checked) => 
                          handleSelectStudent(student.id, checked as boolean)
                        }
                      />
                      <label htmlFor={`student-${student.id}`} className="text-sm">
                        {student.lastName} {student.firstName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAbsenceDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleAddAbsence} disabled={selectedStudents.length === 0}>
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="saisie">Saisie d'absences</TabsTrigger>
          <TabsTrigger value="historique">Historique</TabsTrigger>
          <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="saisie">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Appel du {formattedDate}</CardTitle>
                  <CardDescription>{selectedClass}</CardDescription>
                </div>
                <div className="relative w-60">
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
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const studentAbsence = filteredAbsences.find(a => a.studentId === student.id);
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.lastName}</TableCell>
                          <TableCell>{student.firstName}</TableCell>
                          <TableCell>
                            {studentAbsence ? (
                              <Badge variant={studentAbsence.type === "absence" ? "destructive" : "warning"}>
                                {studentAbsence.type === "absence" ? "Absent" : "En retard"} - {studentAbsence.period}
                              </Badge>
                            ) : (
                              <Badge variant="success">Présent</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="h-8">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                Retard
                              </Button>
                              <Button variant="outline" size="sm" className="h-8">
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                Justifier
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historique">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Historique des absences</CardTitle>
                  <CardDescription>{selectedClass} - Mai 2025</CardDescription>
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Élève</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Justifié</TableHead>
                      <TableHead>Motif</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {absences.map((absence) => {
                      const student = students[absence.class as keyof typeof students]?.find(s => s.id === absence.studentId);
                      return (
                        <TableRow key={absence.id}>
                          <TableCell>
                            {student?.lastName} {student?.firstName}
                          </TableCell>
                          <TableCell>{format(new Date(absence.date), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>
                            <Badge variant={absence.type === "absence" ? "destructive" : "warning"}>
                              {absence.type === "absence" ? "Absence" : "Retard"}
                            </Badge>
                          </TableCell>
                          <TableCell>{absence.period}</TableCell>
                          <TableCell>
                            <Badge variant={absence.justified ? "success" : "outline"}>
                              {absence.justified ? "Justifié" : "Non justifié"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {absence.reason || <span className="text-muted-foreground italic">Non spécifié</span>}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistiques">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Absences totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {absences.filter(a => a.type === "absence").length}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Dont {absences.filter(a => a.type === "absence" && a.justified).length} justifiées</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Retards totaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {absences.filter(a => a.type === "retard").length}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Dont {absences.filter(a => a.type === "retard" && a.justified).length} justifiés</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taux de présence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">96%</div>
                <p className="text-xs text-muted-foreground mt-2">En mai 2025</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Élèves avec le plus d'absences</CardTitle>
                <CardDescription>Mai 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Élève</TableHead>
                        <TableHead>Absences</TableHead>
                        <TableHead>Retards</TableHead>
                        <TableHead>Total heures manquées</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Durand Louis</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>13h</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bernard Lucas</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>9h30</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Robert Hugo</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>6h45</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherAbsences;
