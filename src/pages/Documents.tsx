
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Eye, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const documents = [
  { 
    id: 1, 
    titre: "Cours - Les fonctions", 
    matiere: "Mathématiques", 
    type: "cours", 
    date: "12/03/2025", 
    auteur: "M. Martin" 
  },
  { 
    id: 2, 
    titre: "Fiche de révision - Le théâtre classique", 
    matiere: "Français", 
    type: "revision", 
    date: "10/03/2025", 
    auteur: "M. Bernard" 
  },
  { 
    id: 3, 
    titre: "TP - Électricité", 
    matiere: "Physique-Chimie", 
    type: "tp", 
    date: "08/03/2025", 
    auteur: "Mme Leroy" 
  },
  { 
    id: 4, 
    titre: "Devoir Maison - Les suites", 
    matiere: "Mathématiques", 
    type: "devoir", 
    date: "05/03/2025", 
    auteur: "M. Martin" 
  },
  { 
    id: 5, 
    titre: "Sortie pédagogique - Autorisation", 
    matiere: "Administration", 
    type: "administratif", 
    date: "02/03/2025", 
    auteur: "Mme Leclerc" 
  },
  { 
    id: 6, 
    titre: "Cours - La Guerre Froide", 
    matiere: "Histoire-Géographie", 
    type: "cours", 
    date: "28/02/2025", 
    auteur: "Mme Dubois" 
  },
  { 
    id: 7, 
    titre: "Liste de vocabulaire", 
    matiere: "Anglais", 
    type: "cours", 
    date: "25/02/2025", 
    auteur: "Mme Johnson" 
  },
  { 
    id: 8, 
    titre: "Fiche méthode - La dissertation", 
    matiere: "Français", 
    type: "methode", 
    date: "20/02/2025", 
    auteur: "M. Bernard" 
  },
];

const matieres = [
  "Mathématiques",
  "Français",
  "Histoire-Géographie",
  "Anglais",
  "SVT",
  "Physique-Chimie",
  "EPS",
  "Administration"
];

const typeDocuments = [
  "cours",
  "revision",
  "tp",
  "devoir",
  "administratif",
  "methode"
];

const DocumentsPage = () => {
  const [search, setSearch] = useState("");
  const [filteredDocs, setFilteredDocs] = useState(documents);
  
  const handleSearch = (value: string) => {
    setSearch(value);
    if (!value.trim()) {
      setFilteredDocs(documents);
    } else {
      setFilteredDocs(
        documents.filter(doc => 
          doc.titre.toLowerCase().includes(value.toLowerCase()) ||
          doc.matiere.toLowerCase().includes(value.toLowerCase()) ||
          doc.auteur.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };
  
  const filterByMatiere = (matiere: string) => {
    if (matiere === "all") {
      setFilteredDocs(documents);
    } else {
      setFilteredDocs(documents.filter(doc => doc.matiere === matiere));
    }
  };
  
  const filterByType = (type: string) => {
    if (type === "all") {
      setFilteredDocs(documents);
    } else {
      setFilteredDocs(documents.filter(doc => doc.type === type));
    }
  };
  
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "cours":
        return "default";
      case "revision":
        return "success";
      case "tp":
        return "secondary";
      case "devoir":
        return "destructive";
      case "administratif":
        return "warning";
      default:
        return "outline";
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground mt-2">
          Accédez aux documents partagés par vos enseignants et l'administration.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full">
          <Input
            placeholder="Rechercher un document..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-2.5 text-muted-foreground">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 flex flex-wrap h-auto py-1">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="cours">Cours</TabsTrigger>
          <TabsTrigger value="revision">Révisions</TabsTrigger>
          <TabsTrigger value="tp">TP</TabsTrigger>
          <TabsTrigger value="devoirs">Devoirs</TabsTrigger>
          <TabsTrigger value="administratif">Administratif</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocs.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <div className="h-1 bg-primary" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between gap-2">
                    <CardTitle className="text-base line-clamp-1">{doc.titre}</CardTitle>
                    <Badge variant={getBadgeColor(doc.type) as any}>
                      {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{doc.matiere}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{doc.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{doc.auteur}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredDocs.length === 0 && (
              <div className="col-span-full text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Aucun document trouvé</h3>
                <p className="text-muted-foreground">
                  Aucun document ne correspond à vos critères de recherche
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {["cours", "revision", "tp", "devoirs", "administratif"].map((type) => (
          <TabsContent key={type} value={type}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {documents
                .filter(doc => 
                  type === "devoirs" ? doc.type === "devoir" : doc.type === type
                )
                .map((doc) => (
                  <Card key={doc.id} className="overflow-hidden">
                    <div className="h-1 bg-primary" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between gap-2">
                        <CardTitle className="text-base line-clamp-1">{doc.titre}</CardTitle>
                        <Badge variant={getBadgeColor(doc.type) as any}>
                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>{doc.matiere}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{doc.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{doc.auteur}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {documents.filter(doc => 
                type === "devoirs" ? doc.type === "devoir" : doc.type === type
              ).length === 0 && (
                <div className="col-span-full text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Aucun document trouvé</h3>
                  <p className="text-muted-foreground">
                    Aucun document de ce type n'est disponible
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DocumentsPage;
