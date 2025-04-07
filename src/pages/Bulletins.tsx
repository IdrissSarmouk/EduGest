
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const bulletins = [
  {
    id: 1,
    trimestre: "Trimestre 1",
    anneeScolaire: "2024-2025",
    datePublication: "15/12/2024",
    moyenneGenerale: 14.5,
    appreciation: "Martin est un élève sérieux et appliqué. Il participe activement en classe et montre un réel intérêt pour les matières scientifiques. Il doit cependant veiller à maintenir un effort constant dans toutes les matières."
  },
  {
    id: 2,
    trimestre: "Trimestre 2",
    anneeScolaire: "2024-2025",
    datePublication: "15/03/2025",
    moyenneGenerale: 15.2,
    appreciation: "Martin continue de progresser et fait preuve d'une grande autonomie dans son travail. Ses résultats sont très satisfaisants, particulièrement en mathématiques et en sciences. Une année très positive jusqu'à présent."
  },
];

const matieresBulletin = [
  { id: 1, nom: "Mathématiques", moyenne: 16.5, appreciation: "Excellent trimestre, Martin maîtrise parfaitement les notions abordées.", professeur: "M. Martin" },
  { id: 2, nom: "Français", moyenne: 14.0, appreciation: "Bon travail, des progrès en expression écrite.", professeur: "M. Bernard" },
  { id: 3, nom: "Histoire-Géographie", moyenne: 15.5, appreciation: "Très bonne participation orale et analyses pertinentes.", professeur: "Mme Dubois" },
  { id: 4, nom: "Anglais", moyenne: 17.0, appreciation: "Excellent niveau, s'exprime avec aisance à l'oral comme à l'écrit.", professeur: "Mme Johnson" },
  { id: 5, nom: "SVT", moyenne: 14.5, appreciation: "Bon investissement dans les travaux pratiques.", professeur: "M. Petit" },
  { id: 6, nom: "Physique-Chimie", moyenne: 13.0, appreciation: "Résultats satisfaisants, peut encore progresser.", professeur: "Mme Leroy" },
  { id: 7, nom: "EPS", moyenne: 16.0, appreciation: "Très bonne participation et esprit d'équipe.", professeur: "M. Durand" },
];

const BulletinsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bulletins Scolaires</h1>
        <p className="text-muted-foreground mt-2">
          Consultez vos bulletins trimestriels et annuels.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {bulletins.map((bulletin) => (
          <Card key={bulletin.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{bulletin.trimestre}</CardTitle>
                  <CardDescription>Année scolaire {bulletin.anneeScolaire}</CardDescription>
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Moyenne générale</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-primary">{bulletin.moyenneGenerale}/20</span>
                  <Badge variant="success" className="ml-3">
                    {bulletin.moyenneGenerale >= 16 ? "Très bien" : 
                      bulletin.moyenneGenerale >= 14 ? "Bien" :
                      bulletin.moyenneGenerale >= 12 ? "Assez bien" :
                      bulletin.moyenneGenerale >= 10 ? "Passable" : "Insuffisant"}
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Appréciation générale</p>
                <p className="text-sm text-muted-foreground">{bulletin.appreciation}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Matières</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matière</TableHead>
                      <TableHead>Moyenne</TableHead>
                      <TableHead className="hidden md:table-cell">Professeur</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matieresBulletin.map((matiere) => (
                      <TableRow key={matiere.id}>
                        <TableCell className="font-medium">{matiere.nom}</TableCell>
                        <TableCell>
                          <Badge variant={matiere.moyenne >= 10 ? "success" : "destructive"}>
                            {matiere.moyenne}/20
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{matiere.professeur}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Publié le {bulletin.datePublication} • Classe: 3ème B • Professeur principal: M. Bernard
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BulletinsPage;
