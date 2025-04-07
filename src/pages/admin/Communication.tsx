
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MessageSquare, Plus, Users, FileText, CheckCircle, Pencil, Trash2, CalendarDays } from "lucide-react";

// Données simulées des conseils de classe
const conseilsClasseMock = [
  { id: 1, classe: "3ème B", trimestre: "1er Trimestre", date: "15/04/2025", heure: "17:00", lieu: "Salle B201", participants: ["Équipe pédagogique", "Délégués élèves", "Représentants parents"], statut: "Planifié" },
  { id: 2, classe: "3ème A", trimestre: "1er Trimestre", date: "17/04/2025", heure: "17:00", lieu: "Salle A101", participants: ["Équipe pédagogique", "Délégués élèves", "Représentants parents"], statut: "Planifié" },
  { id: 3, classe: "3ème C", trimestre: "1er Trimestre", date: "18/04/2025", heure: "17:00", lieu: "Salle C301", participants: ["Équipe pédagogique", "Délégués élèves", "Représentants parents"], statut: "Planifié" },
  { id: 4, classe: "4ème A", trimestre: "1er Trimestre", date: "22/04/2025", heure: "17:00", lieu: "Salle A101", participants: ["Équipe pédagogique", "Délégués élèves", "Représentants parents"], statut: "À planifier" },
  { id: 5, classe: "4ème B", trimestre: "1er Trimestre", date: "24/04/2025", heure: "17:00", lieu: "Salle B201", participants: ["Équipe pédagogique", "Délégués élèves", "Représentants parents"], statut: "À planifier" },
];

// Données simulées des réunions pédagogiques
const reunionsPedagogiquesMock = [
  { id: 1, titre: "Réunion équipe mathématiques", date: "18/04/2025", heure: "14:30", lieu: "Salle des professeurs", participants: ["Équipe mathématiques", "Direction"], statut: "Planifiée" },
  { id: 2, titre: "Réunion préparation examens", date: "25/04/2025", heure: "16:00", lieu: "Salle de réunion", participants: ["Ensemble des enseignants 3ème", "Direction"], statut: "Planifiée" },
  { id: 3, titre: "Commission éducative", date: "02/05/2025", heure: "14:00", lieu: "Bureau du principal", participants: ["Direction", "CPE", "Professeurs principaux"], statut: "À planifier" },
];

// Données simulées des notifications et communications
const communicationsMock = [
  { id: 1, titre: "Rappel dates conseils de classe", date: "05/04/2025", destinataires: ["Tous les enseignants"], statut: "Envoyé", type: "Notification" },
  { id: 2, titre: "Information sur les examens blancs", date: "03/04/2025", destinataires: ["Parents", "Élèves 3ème"], statut: "Envoyé", type: "Email" },
  { id: 3, titre: "Réunion parents-professeurs", date: "01/04/2025", destinataires: ["Parents"], statut: "Envoyé", type: "Email" },
  { id: 4, titre: "Fermeture exceptionnelle CDI", date: "30/03/2025", destinataires: ["Tous"], statut: "Envoyé", type: "Notification" },
];

// Liste des classes
const classesList = ["3ème A", "3ème B", "3ème C", "4ème A", "4ème B", "4ème C", "5ème A", "5ème B", "5ème C", "6ème A", "6ème B"];

// Liste des trimestres
const trimestresList = ["1er Trimestre", "2ème Trimestre", "3ème Trimestre"];

// Liste des types de destinataires
const destinatairesList = ["Tous", "Tous les enseignants", "Parents", "Élèves", "Élèves 3ème", "Parents 3ème", "Direction", "Personnel administratif"];

// Liste des lieux
const lieuxList = ["Salle A101", "Salle B201", "Salle C301", "Salle des professeurs", "Salle de réunion", "CDI", "Gymnase", "Bureau du principal"];

// Liste des types de communications
const typesCommunicationList = ["Email", "Notification", "SMS"];

const AdminCommunication = () => {
  const [conseilsClasse, setConseilsClasse] = useState(conseilsClasseMock);
  const [reunionsPedagogiques, setReunionsPedagogiques] = useState(reunionsPedagogiquesMock);
  const [communications, setCommunications] = useState(communicationsMock);
  
  const [isAddConseilDialogOpen, setIsAddConseilDialogOpen] = useState(false);
  const [isAddReunionDialogOpen, setIsAddReunionDialogOpen] = useState(false);
  const [isAddCommunicationDialogOpen, setIsAddCommunicationDialogOpen] = useState(false);
  
  const [nouveauConseil, setNouveauConseil] = useState({
    classe: "",
    trimestre: "",
    date: "",
    heure: "",
    lieu: ""
  });
  
  const [nouvelleReunion, setNouvelleReunion] = useState({
    titre: "",
    date: "",
    heure: "",
    lieu: "",
    participants: ""
  });
  
  const [nouvelleCommunication, setNouvelleCommunication] = useState({
    titre: "",
    message: "",
    destinataires: "",
    type: ""
  });

  // Ajouter un nouveau conseil de classe
  const handleAddConseil = () => {
    const newId = Math.max(...conseilsClasse.map(c => c.id)) + 1;
    const nouveauConseilComplet = {
      id: newId,
      classe: nouveauConseil.classe,
      trimestre: nouveauConseil.trimestre,
      date: nouveauConseil.date,
      heure: nouveauConseil.heure,
      lieu: nouveauConseil.lieu,
      participants: ["Équipe pédagogique", "Délégués élèves", "Représentants parents"],
      statut: "Planifié"
    };
    
    setConseilsClasse([...conseilsClasse, nouveauConseilComplet]);
    setNouveauConseil({ classe: "", trimestre: "", date: "", heure: "", lieu: "" });
    setIsAddConseilDialogOpen(false);
  };

  // Ajouter une nouvelle réunion pédagogique
  const handleAddReunion = () => {
    const newId = Math.max(...reunionsPedagogiques.map(r => r.id)) + 1;
    const nouvelleReunionComplete = {
      id: newId,
      titre: nouvelleReunion.titre,
      date: nouvelleReunion.date,
      heure: nouvelleReunion.heure,
      lieu: nouvelleReunion.lieu,
      participants: [nouvelleReunion.participants],
      statut: "Planifiée"
    };
    
    setReunionsPedagogiques([...reunionsPedagogiques, nouvelleReunionComplete]);
    setNouvelleReunion({ titre: "", date: "", heure: "", lieu: "", participants: "" });
    setIsAddReunionDialogOpen(false);
  };

  // Envoyer une nouvelle communication
  const handleAddCommunication = () => {
    const newId = Math.max(...communications.map(c => c.id)) + 1;
    const nouvelleCommunicationComplete = {
      id: newId,
      titre: nouvelleCommunication.titre,
      date: new Date().toLocaleDateString("fr-FR"),
      destinataires: [nouvelleCommunication.destinataires],
      statut: "Envoyé",
      type: nouvelleCommunication.type
    };
    
    setCommunications([nouvelleCommunicationComplete, ...communications]);
    setNouvelleCommunication({ titre: "", message: "", destinataires: "", type: "" });
    setIsAddCommunicationDialogOpen(false);
  };

  // Supprimer un conseil de classe
  const handleDeleteConseil = (id: number) => {
    setConseilsClasse(conseilsClasse.filter(conseil => conseil.id !== id));
  };

  // Supprimer une réunion pédagogique
  const handleDeleteReunion = (id: number) => {
    setReunionsPedagogiques(reunionsPedagogiques.filter(reunion => reunion.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Communication et gestion administrative</h1>
        <p className="text-muted-foreground">
          Gérez les conseils de classe, réunions pédagogiques et communications.
        </p>
      </div>

      <Tabs defaultValue="conseils" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="conseils">Conseils de classe</TabsTrigger>
          <TabsTrigger value="reunions">Réunions pédagogiques</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conseils">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Planification des conseils de classe</h2>
            <Dialog open={isAddConseilDialogOpen} onOpenChange={setIsAddConseilDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Planifier un conseil
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Planifier un conseil de classe</DialogTitle>
                  <DialogDescription>
                    Définissez les détails du conseil de classe à planifier.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="classe" className="text-sm font-medium">Classe</label>
                      <Select 
                        onValueChange={(value) => setNouveauConseil({...nouveauConseil, classe: value})}
                        value={nouveauConseil.classe}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une classe" />
                        </SelectTrigger>
                        <SelectContent>
                          {classesList.map((classe) => (
                            <SelectItem key={classe} value={classe}>{classe}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="trimestre" className="text-sm font-medium">Trimestre</label>
                      <Select 
                        onValueChange={(value) => setNouveauConseil({...nouveauConseil, trimestre: value})}
                        value={nouveauConseil.trimestre}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un trimestre" />
                        </SelectTrigger>
                        <SelectContent>
                          {trimestresList.map((trimestre) => (
                            <SelectItem key={trimestre} value={trimestre}>{trimestre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">Date</label>
                    <Input
                      id="date"
                      type="date"
                      value={nouveauConseil.date}
                      onChange={(e) => setNouveauConseil({...nouveauConseil, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="heure" className="text-sm font-medium">Heure</label>
                    <Input
                      id="heure"
                      type="time"
                      value={nouveauConseil.heure}
                      onChange={(e) => setNouveauConseil({...nouveauConseil, heure: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lieu" className="text-sm font-medium">Lieu</label>
                    <Select 
                      onValueChange={(value) => setNouveauConseil({...nouveauConseil, lieu: value})}
                      value={nouveauConseil.lieu}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un lieu" />
                      </SelectTrigger>
                      <SelectContent>
                        {lieuxList.map((lieu) => (
                          <SelectItem key={lieu} value={lieu}>{lieu}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddConseilDialogOpen(false)}>Annuler</Button>
                  <Button onClick={handleAddConseil}>Planifier</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Classe</TableHead>
                  <TableHead>Trimestre</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conseilsClasse.map((conseil) => (
                  <TableRow key={conseil.id}>
                    <TableCell className="font-medium">{conseil.classe}</TableCell>
                    <TableCell>{conseil.trimestre}</TableCell>
                    <TableCell>{conseil.date}</TableCell>
                    <TableCell>{conseil.heure}</TableCell>
                    <TableCell>{conseil.lieu}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {conseil.participants.map((participant, index) => (
                          <Badge key={index} variant="outline">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={conseil.statut === "Planifié" ? "success" : "warning"}>
                        {conseil.statut}
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
                          onClick={() => handleDeleteConseil(conseil.id)}
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
        
        <TabsContent value="reunions">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Planification des réunions pédagogiques</h2>
            <Dialog open={isAddReunionDialogOpen} onOpenChange={setIsAddReunionDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Planifier une réunion
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Planifier une réunion pédagogique</DialogTitle>
                  <DialogDescription>
                    Définissez les détails de la réunion pédagogique à planifier.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="titre" className="text-sm font-medium">Titre</label>
                    <Input
                      id="titre"
                      value={nouvelleReunion.titre}
                      onChange={(e) => setNouvelleReunion({...nouvelleReunion, titre: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">Date</label>
                      <Input
                        id="date"
                        type="date"
                        value={nouvelleReunion.date}
                        onChange={(e) => setNouvelleReunion({...nouvelleReunion, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="heure" className="text-sm font-medium">Heure</label>
                      <Input
                        id="heure"
                        type="time"
                        value={nouvelleReunion.heure}
                        onChange={(e) => setNouvelleReunion({...nouvelleReunion, heure: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lieu" className="text-sm font-medium">Lieu</label>
                    <Select 
                      onValueChange={(value) => setNouvelleReunion({...nouvelleReunion, lieu: value})}
                      value={nouvelleReunion.lieu}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un lieu" />
                      </SelectTrigger>
                      <SelectContent>
                        {lieuxList.map((lieu) => (
                          <SelectItem key={lieu} value={lieu}>{lieu}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="participants" className="text-sm font-medium">Participants principaux</label>
                    <Select 
                      onValueChange={(value) => setNouvelleReunion({...nouvelleReunion, participants: value})}
                      value={nouvelleReunion.participants}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner les participants" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinatairesList.map((destinataire) => (
                          <SelectItem key={destinataire} value={destinataire}>{destinataire}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddReunionDialogOpen(false)}>Annuler</Button>
                  <Button onClick={handleAddReunion}>Planifier</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Réunion</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reunionsPedagogiques.map((reunion) => (
                  <TableRow key={reunion.id}>
                    <TableCell className="font-medium">{reunion.titre}</TableCell>
                    <TableCell>{reunion.date}</TableCell>
                    <TableCell>{reunion.heure}</TableCell>
                    <TableCell>{reunion.lieu}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {reunion.participants.map((participant, index) => (
                          <Badge key={index} variant="outline">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={reunion.statut === "Planifiée" ? "success" : "warning"}>
                        {reunion.statut}
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
                          onClick={() => handleDeleteReunion(reunion.id)}
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
        
        <TabsContent value="communications">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Communications récentes</h2>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Destinataires</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {communications.map((communication) => (
                      <TableRow key={communication.id}>
                        <TableCell className="font-medium">{communication.titre}</TableCell>
                        <TableCell>{communication.date}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {communication.destinataires.map((destinataire, index) => (
                              <Badge key={index} variant="outline">
                                {destinataire}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            communication.type === "Email" ? "secondary" :
                            communication.type === "Notification" ? "primary" : "outline"
                          }>
                            {communication.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="success">
                            {communication.statut}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Nouvelle communication</CardTitle>
                  <CardDescription>Envoyez un message ou une notification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="titre" className="text-sm font-medium">Titre</label>
                      <Input
                        id="titre"
                        placeholder="Titre de la communication"
                        value={nouvelleCommunication.titre}
                        onChange={(e) => setNouvelleCommunication({...nouvelleCommunication, titre: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea
                        id="message"
                        placeholder="Contenu du message"
                        rows={4}
                        value={nouvelleCommunication.message}
                        onChange={(e) => setNouvelleCommunication({...nouvelleCommunication, message: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="destinataires" className="text-sm font-medium">Destinataires</label>
                      <Select 
                        onValueChange={(value) => setNouvelleCommunication({...nouvelleCommunication, destinataires: value})}
                        value={nouvelleCommunication.destinataires}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner les destinataires" />
                        </SelectTrigger>
                        <SelectContent>
                          {destinatairesList.map((destinataire) => (
                            <SelectItem key={destinataire} value={destinataire}>{destinataire}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="type" className="text-sm font-medium">Type de communication</label>
                      <Select 
                        onValueChange={(value) => setNouvelleCommunication({...nouvelleCommunication, type: value})}
                        value={nouvelleCommunication.type}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          {typesCommunicationList.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleAddCommunication}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Envoyer
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Calendrier des événements</CardTitle>
                  <CardDescription>Vue d'ensemble des prochains événements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <CalendarDays className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Conseils de classe 3ème</p>
                        <p className="text-xs text-muted-foreground">15-18 avril 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Réunion équipe mathématiques</p>
                        <p className="text-xs text-muted-foreground">18 avril 2025, 14h30</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Préparation examens</p>
                        <p className="text-xs text-muted-foreground">25 avril 2025, 16h00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCommunication;
