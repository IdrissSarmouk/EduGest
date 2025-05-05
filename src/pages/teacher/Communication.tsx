import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Users, UserPlus, AtSign, School, Bell, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const conversations = [
  {
    id: 1,
    type: "parent",
    with: "M. et Mme Dupont",
    student: "Martin Dupont",
    lastMessage: "Merci pour les informations concernant le prochain contrôle.",
    timestamp: "Aujourd'hui, 10:23",
    unread: true,
  },
  {
    id: 2,
    type: "parent",
    with: "Mme Martin",
    student: "Léa Martin",
    lastMessage: "Pourriez-vous m'envoyer les exercices que Léa a manqués pendant son absence ?",
    timestamp: "Hier, 16:45",
    unread: true,
  },
  {
    id: 3,
    type: "group",
    with: "6ème A - Français",
    members: 24,
    lastMessage: "Bonjour à tous, n'oubliez pas de rendre vos devoirs pour jeudi.",
    timestamp: "04/05/2025",
    unread: false,
  },
  {
    id: 4,
    type: "staff",
    with: "Mme Leroy",
    role: "CPE",
    lastMessage: "Pouvons-nous discuter du comportement de Lucas Bernard ?",
    timestamp: "03/05/2025",
    unread: false,
  },
];

const messages = [
  {
    id: 1,
    conversationId: 1,
    from: "user",
    content: "Bonjour M. et Mme Dupont, je souhaitais vous informer que Martin aura un contrôle de français jeudi prochain portant sur la poésie et les figures de style.",
    timestamp: "04/05/2025, 14:30",
  },
  {
    id: 2,
    conversationId: 1,
    from: "other",
    content: "Bonjour Mme Dubois, merci pour cette information. Martin va commencer à réviser dès ce soir. Est-ce que vous pourriez préciser les chapitres concernés ?",
    timestamp: "04/05/2025, 18:15",
  },
  {
    id: 3,
    conversationId: 1,
    from: "user",
    content: "Bien sûr, il s'agit des chapitres 5 et 6 du manuel, plus les documents distribués en classe sur les figures de style. N'hésitez pas si vous avez d'autres questions.",
    timestamp: "04/05/2025, 18:45",
  },
  {
    id: 4,
    conversationId: 1,
    from: "other",
    content: "Merci pour les informations concernant le prochain contrôle.",
    timestamp: "Aujourd'hui, 10:23",
  },
];

const TeacherCommunication = () => {
  const [selectedTab, setSelectedTab] = useState("messages");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [messageType, setMessageType] = useState("parent");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [messageSubject, setMessageSubject] = useState("");

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) => {
      const searchText = conversation.type === "parent" 
        ? `${conversation.with} ${conversation.student}` 
        : conversation.with;
      return searchText.toLowerCase().includes(searchQuery.toLowerCase());
    }
  );

  // Get messages for selected conversation
  const conversationMessages = messages.filter(
    (message) => message.conversationId === selectedConversation
  );

  // Functions
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      // For now we'll just clear the input
      setNewMessage("");
    }
  };

  const handleCreateMessage = () => {
    // Handle creating a new conversation
    setIsCreateDialogOpen(false);
    setMessageType("parent");
    setSelectedRecipient("");
    setMessageSubject("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos échanges avec les parents, les élèves et l'équipe pédagogique.
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="annonces">Annonces</TabsTrigger>
          <TabsTrigger value="devoirs">Devoirs & documents</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <div className="grid gap-6 md:grid-cols-12">
            <Card className="md:col-span-4">
              <CardHeader className="space-y-0 p-4">
                <div className="flex justify-between items-center mb-2">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Nouveau
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nouveau message</DialogTitle>
                        <DialogDescription>
                          Créez un nouveau message ou une discussion de groupe.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Type de message</label>
                          <Select 
                            value={messageType} 
                            onValueChange={setMessageType}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Destinataires</SelectLabel>
                                <SelectItem value="parent">Parents d'élèves</SelectItem>
                                <SelectItem value="student">Élève</SelectItem>
                                <SelectItem value="class">Classe entière</SelectItem>
                                <SelectItem value="staff">Personnel</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Destinataire</label>
                          <Select 
                            value={selectedRecipient} 
                            onValueChange={setSelectedRecipient}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un destinataire" />
                            </SelectTrigger>
                            <SelectContent>
                              {messageType === "parent" && (
                                <>
                                  <SelectItem value="parent1">M. et Mme Dupont (Martin)</SelectItem>
                                  <SelectItem value="parent2">Mme Martin (Léa)</SelectItem>
                                  <SelectItem value="parent3">M. Bernard (Lucas)</SelectItem>
                                </>
                              )}
                              {messageType === "class" && (
                                <>
                                  <SelectItem value="class1">6ème A</SelectItem>
                                  <SelectItem value="class2">6ème B</SelectItem>
                                  <SelectItem value="class3">5ème A</SelectItem>
                                  <SelectItem value="class4">5ème B</SelectItem>
                                </>
                              )}
                              {messageType === "staff" && (
                                <>
                                  <SelectItem value="staff1">M. Martin (Principal)</SelectItem>
                                  <SelectItem value="staff2">Mme Leroy (CPE)</SelectItem>
                                  <SelectItem value="staff3">M. Bernard (Prof. Maths)</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Sujet</label>
                          <Input 
                            value={messageSubject} 
                            onChange={(e) => setMessageSubject(e.target.value)} 
                            placeholder="Sujet du message" 
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Message</label>
                          <Textarea 
                            placeholder="Écrivez votre message ici..."
                            rows={5}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Annuler</Button>
                        <Button onClick={handleCreateMessage}>Envoyer</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher une conversation..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y overflow-auto max-h-[calc(100vh-300px)]">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 hover:bg-muted/50 cursor-pointer ${
                        selectedConversation === conversation.id ? "bg-muted/50" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {conversation.type === "parent" ? (
                              <Users className="h-5 w-5" />
                            ) : conversation.type === "group" ? (
                              <School className="h-5 w-5" />
                            ) : (
                              <AtSign className="h-5 w-5" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm truncate">
                              {conversation.with}
                            </h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {conversation.timestamp}
                            </span>
                          </div>
                          {conversation.type === "parent" && (
                            <p className="text-xs text-muted-foreground">Parent de {conversation.student}</p>
                          )}
                          {conversation.type === "group" && (
                            <p className="text-xs text-muted-foreground">{conversation.members} élèves</p>
                          )}
                          {conversation.type === "staff" && (
                            <p className="text-xs text-muted-foreground">{conversation.role}</p>
                          )}
                          <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread && (
                          <Badge variant="success" className="ml-auto h-2 w-2 rounded-full p-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-8">
              {selectedConversation ? (
                <>
                  <CardHeader className="p-4 border-b">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarFallback>
                          <Users className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {conversations.find(c => c.id === selectedConversation)?.with}
                        </CardTitle>
                        <CardDescription>
                          {conversations.find(c => c.id === selectedConversation)?.type === "parent" && 
                            `Parent de ${conversations.find(c => c.id === selectedConversation)?.student}`}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex flex-col h-[500px]">
                    <div className="flex-1 overflow-auto p-4 space-y-4">
                      {conversationMessages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.from === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className={`text-xs mt-1 block ${
                              message.from === 'user' 
                                ? 'text-primary-foreground/70' 
                                : 'text-muted-foreground'
                            }`}>
                              {message.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Textarea 
                          placeholder="Écrivez votre message..." 
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="min-h-[80px]"
                        />
                        <Button className="self-end" onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Envoyer</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="flex items-center justify-center h-[500px]">
                  <div className="text-center">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Aucune conversation sélectionnée</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Sélectionnez une conversation ou créez-en une nouvelle pour commencer.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="annonces">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Annonces et informations</CardTitle>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nouvelle annonce
                </Button>
              </div>
              <CardDescription>
                Publiez des annonces pour les élèves et les parents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Contrôle de français - 6ème A</CardTitle>
                    <CardDescription>Publié le 03/05/2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Bonjour à tous, un contrôle de français sur les figures de style aura lieu jeudi 8 mai. Les chapitres concernés sont les chapitres 5 et 6 du manuel.</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
                    Destinataires: Élèves et parents de 6ème A
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Sortie culturelle - 5ème A et B</CardTitle>
                    <CardDescription>Publié le 30/04/2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Une sortie au théâtre est organisée le vendredi 16 mai pour les classes de 5ème A et B. Merci de bien vouloir compléter l'autorisation parentale distribuée en classe.</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
                    Destinataires: Élèves et parents de 5ème A et 5ème B
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devoirs">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Devoirs & documents pédagogiques</CardTitle>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Ajouter un devoir
                </Button>
              </div>
              <CardDescription>
                Publiez des devoirs et documents pour vos classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="devoirs" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="devoirs">Devoirs à venir</TabsTrigger>
                  <TabsTrigger value="documents">Documents partagés</TabsTrigger>
                  <TabsTrigger value="archives">Archives</TabsTrigger>
                </TabsList>

                <TabsContent value="devoirs">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">Rédaction sur le thème de la nature</CardTitle>
                            <CardDescription>6ème A - À rendre pour le 12/05/2025</CardDescription>
                          </div>
                          <Button variant="outline" size="sm">Modifier</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Écrivez une rédaction de 20 lignes minimum sur le thème de la nature, en utilisant au moins 5 figures de style différentes que nous avons étudiées en classe.</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          Publié le 02/05/2025
                        </span>
                        <Badge>À venir</Badge>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">Commentaire littéraire</CardTitle>
                            <CardDescription>5ème A - À rendre pour le 10/05/2025</CardDescription>
                          </div>
                          <Button variant="outline" size="sm">Modifier</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Réalisez un commentaire littéraire du poème "Demain dès l'aube" de Victor Hugo (page 45 du manuel). Analysez la structure, les figures de style et les thèmes abordés.</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          Publié le 01/05/2025
                        </span>
                        <Badge>En cours</Badge>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="documents">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">Fiche récapitulative - Figures de style</CardTitle>
                            <CardDescription>6ème A, 6ème B</CardDescription>
                          </div>
                          <Button variant="outline" size="sm">Télécharger</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Document récapitulatif des principales figures de style à connaître pour le contrôle du 8 mai.</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          Partagé le 03/05/2025
                        </span>
                        <Badge variant="outline">PDF</Badge>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">Exercices supplémentaires - Analyse poétique</CardTitle>
                            <CardDescription>5ème A, 5ème B</CardDescription>
                          </div>
                          <Button variant="outline" size="sm">Télécharger</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Série d'exercices supplémentaires pour s'entraîner à l'analyse poétique. Facultatif, mais recommandé pour les élèves qui souhaitent approfondir.</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          Partagé le 29/04/2025
                        </span>
                        <Badge variant="outline">DOCX</Badge>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="archives">
                  <div className="text-center p-8 text-muted-foreground">
                    <p>Les devoirs et documents plus anciens sont disponibles dans les archives.</p>
                    <Button variant="outline" className="mt-4">
                      Consulter les archives
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherCommunication;
