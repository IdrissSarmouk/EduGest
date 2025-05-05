
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  PlusCircle, 
  FileText, 
  Download, 
  Pencil, 
  Trash2, 
  Upload,
  FileType,
  File,
  Image,
  FileSpreadsheet
} from "lucide-react";

// Données des documents
const documents = [
  {
    id: 1,
    title: "Grammaire - Les figures de style",
    description: "Document récapitulatif des principales figures de style",
    type: "pdf",
    size: "2.3 Mo",
    createdAt: "03/05/2025",
    class: ["6ème A", "6ème B"],
    downloads: 15
  },
  {
    id: 2,
    title: "Analyse poétique - Victor Hugo",
    description: "Supports d'analyse pour les poèmes de Victor Hugo",
    type: "docx",
    size: "1.8 Mo",
    createdAt: "28/04/2025",
    class: ["5ème A", "5ème B"],
    downloads: 23
  },
  {
    id: 3,
    title: "Fiches de lecture - Romans du XIXe siècle",
    description: "Fiches d'aide à la lecture des œuvres au programme",
    type: "pdf",
    size: "3.5 Mo",
    createdAt: "15/04/2025",
    class: ["5ème A"],
    downloads: 19
  },
  {
    id: 4,
    title: "Tableau des conjugaisons",
    description: "Récapitulatif des conjugaisons des principaux temps",
    type: "xlsx",
    size: "1.2 Mo",
    createdAt: "10/04/2025",
    class: ["6ème A", "6ème B", "5ème A", "5ème B"],
    downloads: 42
  },
  {
    id: 5,
    title: "Images - Mouvements littéraires",
    description: "Illustrations des principaux mouvements littéraires",
    type: "zip",
    size: "8.7 Mo",
    createdAt: "05/04/2025",
    class: ["5ème A", "5ème B"],
    downloads: 11
  }
];

// Devoirs à faire
const devoirs = [
  {
    id: 1,
    title: "Rédaction sur le thème de la nature",
    description: "Écrivez une rédaction de 20 lignes minimum sur le thème de la nature, en utilisant au moins 5 figures de style différentes que nous avons étudiées en classe.",
    dueDate: "12/05/2025",
    class: "6ème A",
    status: "À venir",
    submissions: 0
  },
  {
    id: 2,
    title: "Commentaire littéraire",
    description: "Réalisez un commentaire littéraire du poème \"Demain dès l'aube\" de Victor Hugo (page 45 du manuel). Analysez la structure, les figures de style et les thèmes abordés.",
    dueDate: "10/05/2025",
    class: "5ème A",
    status: "En cours",
    submissions: 5
  },
  {
    id: 3,
    title: "Analyse d'un texte argumentatif",
    description: "Analysez le texte distribué en classe selon la méthode vue ensemble. Identifiez la thèse, les arguments et les exemples.",
    dueDate: "05/05/2025",
    class: "5ème B",
    status: "Terminé",
    submissions: 18
  },
  {
    id: 4,
    title: "Exercices de grammaire",
    description: "Complétez les exercices 1 à 5 page 65 du manuel.",
    dueDate: "30/04/2025",
    class: "6ème B",
    status: "Terminé",
    submissions: 22
  }
];

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return <FileText className="h-6 w-6 text-red-500" />;
    case 'docx':
      return <File className="h-6 w-6 text-blue-500" />;
    case 'xlsx':
      return <FileSpreadsheet className="h-6 w-6 text-green-500" />;
    case 'zip':
      return <FileType className="h-6 w-6 text-yellow-500" />;
    default:
      return <Image className="h-6 w-6 text-purple-500" />;
  }
};

const TeacherDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  
  // Filtrer les documents en fonction de la recherche et de la classe sélectionnée
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || doc.class.includes(selectedClass);
    return matchesSearch && matchesClass;
  });

  // Filtrer les devoirs en fonction de la recherche et de la classe sélectionnée
  const filteredDevoirs = devoirs.filter((devoir) => {
    const matchesSearch = devoir.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          devoir.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "all" || devoir.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Devoirs & Documents</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les documents pédagogiques et les devoirs pour vos classes.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              <SelectItem value="6ème A">6ème A</SelectItem>
              <SelectItem value="6ème B">6ème B</SelectItem>
              <SelectItem value="5ème A">5ème A</SelectItem>
              <SelectItem value="5ème B">5ème B</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
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

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="documents">Documents pédagogiques</TabsTrigger>
          <TabsTrigger value="devoirs">Devoirs à faire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Mes documents</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un document
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau document</DialogTitle>
                  <DialogDescription>
                    Téléchargez un document à partager avec vos élèves.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre du document</label>
                    <Input placeholder="Titre du document" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input placeholder="Description du document" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Classes concernées</label>
                    <Select defaultValue="6A">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6A">6ème A</SelectItem>
                        <SelectItem value="6B">6ème B</SelectItem>
                        <SelectItem value="5A">5ème A</SelectItem>
                        <SelectItem value="5B">5ème B</SelectItem>
                        <SelectItem value="all">Toutes les classes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fichier</label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Glissez-déposez un fichier ou
                      </p>
                      <Button variant="outline" size="sm">Parcourir</Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        PDF, Word, Excel, images (max. 10 Mo)
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Annuler</Button>
                  <Button>Télécharger</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredDocuments.map((document) => (
              <Card key={document.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      {getFileIcon(document.type)}
                      <div>
                        <CardTitle className="text-base">{document.title}</CardTitle>
                        <CardDescription>{document.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">.{document.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Classes:</span>
                      <span>{document.class.join(", ")}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Taille:</span>
                      <span>{document.size}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Téléchargé:</span>
                      <span>{document.downloads} fois</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3">
                  <span className="text-xs text-muted-foreground">
                    Ajouté le {document.createdAt}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            {filteredDocuments.length === 0 && (
              <div className="col-span-2 p-8 text-center">
                <p className="text-muted-foreground">Aucun document ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="devoirs">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Devoirs à faire</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nouveau devoir
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau devoir</DialogTitle>
                  <DialogDescription>
                    Créez un devoir pour vos élèves.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre du devoir</label>
                    <Input placeholder="Titre du devoir" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Description détaillée du devoir à faire"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Classe</label>
                      <Select defaultValue="6A">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une classe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6A">6ème A</SelectItem>
                          <SelectItem value="6B">6ème B</SelectItem>
                          <SelectItem value="5A">5ème A</SelectItem>
                          <SelectItem value="5B">5ème B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date limite</label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Documents joints (optionnel)</label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Glissez-déposez un fichier ou
                      </p>
                      <Button variant="outline" size="sm">Parcourir</Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Annuler</Button>
                  <Button>Publier</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {filteredDevoirs.map((devoir) => (
              <Card key={devoir.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{devoir.title}</CardTitle>
                      <CardDescription>{devoir.class} - À rendre pour le {devoir.dueDate}</CardDescription>
                    </div>
                    <Badge variant={
                      devoir.status === "Terminé" ? "outline" : 
                      devoir.status === "En cours" ? "warning" :
                      "success"
                    }>
                      {devoir.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{devoir.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>Rendus: {devoir.submissions} / {devoir.class === "6ème A" ? "22" : devoir.class === "6ème B" ? "24" : "20"}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-3 gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Voir les rendus
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredDevoirs.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Aucun devoir ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDocuments;
