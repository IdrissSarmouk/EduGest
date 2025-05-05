
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  School, 
  Clock, 
  Shield, 
  BookOpen, 
  FileText, 
  Key, 
  Save, 
  Eye, 
  EyeOff, 
  BookOpen as Calendar
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Données de l'enseignant
const teacherData = {
  id: "enseignant1",
  firstName: "Sophie",
  lastName: "Dubois",
  email: "sophie.dubois@ecole-avenir-digital.fr",
  phone: "06 12 34 56 78",
  address: "12 rue des Écoles, 75005 Paris",
  subject: "Français",
  joinDate: "01/09/2022",
  classes: ["6ème A", "6ème B", "5ème A", "5ème B"],
  schedule: {
    monday: ["8h-10h : 6ème A", "10h-12h : 6ème B", "14h-16h : 5ème A"],
    tuesday: ["9h-11h : 5ème B", "14h-16h : Réunion pédagogique"],
    wednesday: ["8h-10h : 5ème A", "10h-12h : 6ème A"],
    thursday: ["8h-10h : 5ème B", "10h-12h : 6ème B"],
    friday: ["9h-11h : 6ème A", "14h-16h : 5ème A", "16h-17h : Soutien scolaire"]
  },
  stats: {
    evaluations: 48,
    absences: 27,
    documents: 35,
    messages: 124
  }
};

const TeacherProfil = () => {
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: teacherData.firstName,
    lastName: teacherData.lastName,
    email: teacherData.email,
    phone: teacherData.phone,
    address: teacherData.address,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Ici, logique pour enregistrer le profil
    setEditMode(false);
  };

  const handlePasswordChange = () => {
    // Ici, logique pour changer le mot de passe
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mon Profil</h1>
        <p className="text-muted-foreground mt-2">
          Consultez et modifiez vos informations personnelles.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={`${teacherData.firstName} ${teacherData.lastName}`} />
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {teacherData.firstName[0]}{teacherData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 font-bold text-xl">{teacherData.firstName} {teacherData.lastName}</h2>
              <Badge className="mt-2">{teacherData.subject}</Badge>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{teacherData.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{teacherData.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{teacherData.address}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="w-full space-y-3">
                <div className="flex items-center text-sm">
                  <School className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>École Avenir Digital</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Depuis {teacherData.joinDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{teacherData.classes.length} classes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Statistiques de l'année</CardTitle>
                  <CardDescription>Année scolaire 2024-2025</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/60 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{teacherData.stats.evaluations}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Évaluations réalisées</p>
                </div>
                
                <div className="bg-muted/60 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{teacherData.stats.absences}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Absences signalées</p>
                </div>
                
                <div className="bg-muted/60 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{teacherData.stats.documents}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Documents partagés</p>
                </div>
                
                <div className="bg-muted/60 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{teacherData.stats.messages}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Messages échangés</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="schedule">Emploi du temps</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Informations personnelles</CardTitle>
                    <Button 
                      variant={editMode ? "ghost" : "outline"} 
                      onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                    >
                      {editMode ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer
                        </>
                      ) : (
                        <>
                          <User className="mr-2 h-4 w-4" />
                          Modifier
                        </>
                      )}
                    </Button>
                  </div>
                  <CardDescription>
                    Consultez et modifiez vos informations personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Prénom</label>
                      <Input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom</label>
                      <Input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Téléphone</label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Adresse</label>
                      <Input 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Classes</h3>
                    <div className="flex flex-wrap gap-2">
                      {teacherData.classes.map((cls) => (
                        <Badge key={cls} variant="secondary">{cls}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription>
                    Gérez les paramètres de sécurité de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Changement de mot de passe</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Mot de passe actuel</label>
                        <div className="relative">
                          <Input 
                            name="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Entrez votre mot de passe actuel"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nouveau mot de passe</label>
                        <Input 
                          name="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="Entrez votre nouveau mot de passe"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Confirmer le nouveau mot de passe</label>
                        <Input 
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirmez votre nouveau mot de passe"
                        />
                      </div>
                    </div>
                    
                    <Button onClick={handlePasswordChange}>
                      <Key className="mr-2 h-4 w-4" />
                      Changer le mot de passe
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Sécurité du compte</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Authentification à deux facteurs</p>
                          <p className="text-sm text-muted-foreground">Renforcer la sécurité de votre compte avec la 2FA</p>
                        </div>
                        <Button variant="outline">Configurer</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sessions actives</p>
                          <p className="text-sm text-muted-foreground">Gérer les appareils connectés à votre compte</p>
                        </div>
                        <Button variant="outline">Consulter</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Notifications de sécurité</p>
                          <p className="text-sm text-muted-foreground">Recevoir des alertes en cas de connexion suspecte</p>
                        </div>
                        <div className="flex items-center h-5">
                          <input
                            id="security-notifications"
                            name="security-notifications"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    <Shield className="inline-block h-3 w-3 mr-1" />
                    Dernière connexion le 05/05/2025 à 08:32 depuis Paris, France
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Mon emploi du temps hebdomadaire</CardTitle>
                  <CardDescription>
                    Année scolaire 2024-2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="border rounded-lg">
                      <div className="bg-muted p-3 border-b">
                        <h3 className="font-medium">Lundi</h3>
                      </div>
                      <div className="p-4 space-y-2">
                        {teacherData.schedule.monday.map((session, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{session}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border rounded-lg">
                      <div className="bg-muted p-3 border-b">
                        <h3 className="font-medium">Mardi</h3>
                      </div>
                      <div className="p-4 space-y-2">
                        {teacherData.schedule.tuesday.map((session, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{session}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border rounded-lg">
                      <div className="bg-muted p-3 border-b">
                        <h3 className="font-medium">Mercredi</h3>
                      </div>
                      <div className="p-4 space-y-2">
                        {teacherData.schedule.wednesday.map((session, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{session}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border rounded-lg">
                      <div className="bg-muted p-3 border-b">
                        <h3 className="font-medium">Jeudi</h3>
                      </div>
                      <div className="p-4 space-y-2">
                        {teacherData.schedule.thursday.map((session, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{session}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border rounded-lg">
                      <div className="bg-muted p-3 border-b">
                        <h3 className="font-medium">Vendredi</h3>
                      </div>
                      <div className="p-4 space-y-2">
                        {teacherData.schedule.friday.map((session, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{session}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Pour toute modification de l'emploi du temps, veuillez contacter l'administration.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfil;
