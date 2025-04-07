
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users,
  UserPlus,
  Calendar,
  Clock,
  MessageSquare,
  Settings,
  LayoutDashboard
} from "lucide-react";

const navItems = [
  {
    title: "Tableau de bord",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    title: "Gestion des enseignants",
    href: "/admin/enseignants",
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Gestion des élèves",
    href: "/admin/eleves",
    icon: <UserPlus className="h-5 w-5" />
  },
  {
    title: "Emplois du temps",
    href: "/admin/emploi-du-temps",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    title: "Absences et discipline",
    href: "/admin/absences",
    icon: <Clock className="h-5 w-5" />
  },
  {
    title: "Communication",
    href: "/admin/communication",
    icon: <MessageSquare className="h-5 w-5" />
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  
  return (
    <div className="h-screen border-r bg-card sticky top-0 overflow-y-auto w-full">
      <div className="p-4">
        <h1 className="text-xl font-bold text-primary mb-1">École Avenir Digital</h1>
        <p className="text-sm text-muted-foreground">Espace Administration</p>
      </div>
      
      <nav className="space-y-1 px-2 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="rounded-md bg-muted p-4">
          <div className="font-medium">Portail Administrateur</div>
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">
              Retour à l'espace élève
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
