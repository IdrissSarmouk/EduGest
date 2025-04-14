import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const enseignants = [
  { id: 1, nom: "M. Martin", matiere: "Mathématiques", email: "m.martin@ecole-digital.fr" },
  { id: 2, nom: "M. Bernard", matiere: "Français", email: "m.bernard@ecole-digital.fr", principal: true },
  { id: 3, nom: "Mme Dubois", matiere: "Histoire-Géographie", email: "mme.dubois@ecole-digital.fr" },
  { id: 4, nom: "Mme Johnson", matiere: "Anglais", email: "mme.johnson@ecole-digital.fr" },
  { id: 5, nom: "M. Petit", matiere: "SVT", email: "m.petit@ecole-digital.fr" },
  { id: 6, nom: "Mme Leroy", matiere: "Physique-Chimie", email: "mme.leroy@ecole-digital.fr" },
  { id: 7, nom: "M. Durand", matiere: "EPS", email: "m.durand@ecole-digital.fr" },
];

const administrationContacts = [
  { id: 1, nom: "Vie scolaire", description: "Absences, retards et discipline", email: "vie-scolaire@ecole-digital.fr" },
  { id: 2, nom: "Secrétariat", description: "Questions administratives", email: "secretariat@ecole-digital.fr" },
  { id: 3, nom: "Direction", description: "Direction de l'établissement", email: "direction@ecole-digital.fr" },
  { id: 4, nom: "Orientation", description: "Conseiller d'orientation", email: "orientation@ecole-digital.fr" },
  { id: 5, nom: "Infirmerie", description: "Santé et soins", email: "infirmerie@ecole-digital.fr" },
];

const messagesRecents = [
  { 
    id: 1, 
    expediteur: "M. Bernard", 
    sujet: "Projet d'écriture", 
    date: "15/03/2025", 
    contenu: "Bonjour Mme Dupont, je vous contacte au sujet du projet d'écriture de Martin. Il a montré un réel talent dans son dernier travail et je pense qu'il pourrait participer au concours national de poésie. Pourriez-vous m'indiquer s'il serait intéressé ? Cordialement, M. Bernard.",
    lu: false
  },
  { 
    id: 2, 
    expediteur: "Vie scolaire", 
    sujet: "Absence du 15/03", 
    date: "16/03/2025", 
    contenu: "Bonjour, nous n'avons pas reçu de justificatif pour l'absence de Martin le 15/03. Merci de nous faire parvenir un mot d'excuse ou un certificat médical dans les plus brefs délais. Cordialement, Le service de vie scolaire.",
    lu: false
  },
  { 
    id: 3, 
    expediteur: "Mme Dubois", 
    sujet: "Sortie pédagogique", 
    date: "10/03/2025", 
    contenu: "Chers parents, une sortie pédagogique au musée d'histoire est prévue le 10/04. Merci de retourner l'autorisation signée avant le 30/03. Cordialement, Mme Dubois.",
    lu: true
  },
  { 
    id: 4, 
    expediteur: "Direction", 
    sujet: "Réunion parents-professeurs", 
    date: "05/03/2025", 
    contenu: "Madame, Monsieur, nous vous rappelons que la réunion parents-professeurs aura lieu le 22/03 de 18h à 20h. Vous pouvez prendre rendez-vous avec les enseignants via l'application. Cordialement, La Direction.",
    lu: true
  },
];

const AdminCommunication = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherName = searchParams.get("teacher");
  const adminDept = searchParams.get("admin");
  
  const [activeTab, setActiveTab] = useState(() => {
    if (teacherName) return "enseignants";
    if (adminDept) return "administration";
    return "messages";
  });
  
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  
  // Filtrer les enseignants en fonction du terme de recherche
  const filteredEnseignants = enseignants.filter(
    e => e.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
         e.matiere.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filtrer les contacts administratifs en fonction du terme de recherche
  const filteredAdminContacts = administrationContacts.filter(
    a => a.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
         a.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Effet au chargement pour sélectionner le contact en fonction des paramètres d'URL
  useState(() => {
    if (teacherName) {
      const teacher = enseignants.find(t => t.nom.includes(teacherName));
      if (teacher) setSelectedContact(teacher);
    } else if (adminDept) {
      const admin = administrationContacts.find(a => a.email.includes(adminDept));
      if (admin) setSelectedContact(admin);
    }
  });
  
  const handleSendMessage = () => {
    // Ici vous implémenteriez la logique d'envoi du message
    if (selectedContact && messageSubject && messageContent) {
      alert(`Message envoyé à ${selectedContact.nom} : ${messageSubject}`);
      setMessageSubject("");
      setMessageContent("");
      setSelectedContact(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
        <p className="text-muted-foreground mt-2">
          Échangez avec les enseignants et l'administration de l'établissement.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="messages">Messages reçus</TabsTrigger>
          <TabsTrigger value="enseignants">Enseignants</TabsTrigger>
          <TabsTrigger value="administration">Administration</TabsTrigger>
          <TabsTrigger value="nouveau">Nouveau message</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Messages reçus</CardTitle>
                <CardDescription>Vos messages récents</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher dans les messages..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {messagesRecents
                    .filter(msg => 
                      msg.expediteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      msg.sujet.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(message => (
                      <div 
                        key={message.id} 
                        className={`p-3 border rounded-md cursor-pointer hover:bg-accent/50 transition-colors ${message.lu ? '' : 'bg-accent/20 border-primary/20'} ${selectedMessage?.id === message.id ? 'border-primary' : ''}`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{message.expediteur}</h3>
                              <Badge variant="default">Nouveau</Badge>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">{message.sujet}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{message.date}</p>
                        </div>
                        <p className="text-sm mt-1 line-clamp-2">{message.contenu}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>
                  {selectedMessage ? selectedMessage.sujet : "Sélectionnez un message"}
                </CardTitle>
                {selectedMessage && (
                  <CardDescription>
                    De: {selectedMessage.expediteur} - {selectedMessage.date}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {selectedMessage ? (
                  <div className="space-y-4">
                    <div className="whitespace-pre-line text-sm">
                      {selectedMessage.contenu}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Marquer comme lu</Button>
                      <Button onClick={() => {
                        setActiveTab("nouveau");
                        const contact = [...enseignants, ...administrationContacts].find(
                          c => c.nom === selectedMessage.expediteur
                        );
                        setSelectedContact(contact);
                        setMessageSubject(`Re: ${selectedMessage.sujet}`);
                      }}>Répondre</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Sélectionnez un message pour voir son contenu
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="enseignants">
          <Card>
            <CardHeader>
              <CardTitle>Enseignants</CardTitle>
              <CardDescription>
                Contacts des enseignants de la classe de Martin
              </CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un enseignant..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEnseignants.map((enseignant) => (
                  <div
                    key={enseignant.id}
                    className="p-4 border rounded-md hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{enseignant.nom}</h3>
                        <p className="text-sm text-muted-foreground">{enseignant.matiere}</p>
                      </div>
                      {enseignant.principal && <Badge>Principal</Badge>}
                    </div>
                    <p className="text-sm text-primary mb-3">{enseignant.email}</p>
                    <div className="flex justify-end">
                      <Button onClick={() => {
                        setSelectedContact(enseignant);
                        setActiveTab("nouveau");
                      }}>
                        Contacter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredEnseignants.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun enseignant trouvé pour "{searchTerm}"
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="administration">
          <Card>
            <CardHeader>
              <CardTitle>Administration</CardTitle>
              <CardDescription>
                Contacts des services administratifs
              </CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un service..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAdminContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 border rounded-md hover:border-primary/50 transition-colors"
                  >
                    <h3 className="font-medium">{contact.nom}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{contact.description}</p>
                    <p className="text-sm text-primary mb-3">{contact.email}</p>
                    <div className="flex justify-end">
                      <Button onClick={() => {
                        setSelectedContact(contact);
                        setActiveTab("nouveau");
                      }}>
                        Contacter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredAdminContacts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun service administratif trouvé pour "{searchTerm}"
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nouveau">
          <Card>
            <CardHeader>
              <CardTitle>Nouveau message</CardTitle>
              <CardDescription>
                {selectedContact 
                  ? `À: ${selectedContact.nom} (${selectedContact.email})`
                  : "Sélectionnez un destinataire"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedContact ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Sujet
                    </label>
                    <Input
                      id="subject"
                      placeholder="Entrez l'objet de votre message"
                      value={messageSubject}
                      onChange={(e) => setMessageSubject(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Rédigez votre message..."
                      rows={8}
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => {
                      setSelectedContact(null);
                      setMessageSubject("");
                      setMessageContent("");
                    }}>
                      Annuler
                    </Button>
                    <Button 
                      disabled={!messageSubject || !messageContent}
                      onClick={handleSendMessage}
                    >
                      Envoyer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Veuillez d'abord sélectionner un destinataire.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button onClick={() => setActiveTab("enseignants")}>
                      Choisir un enseignant
                    </Button>
                    <Button onClick={() => setActiveTab("administration")}>
                      Choisir un service administratif
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCommunication;
