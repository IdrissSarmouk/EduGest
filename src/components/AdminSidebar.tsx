
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users,
  UserPlus,
  Calendar,
  Clock,
  MessageSquare,
  Settings,
  LayoutDashboard,
  CalendarDays,
  CalendarCheck
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
  {
    title: "Réunions & Conseils",
    href: "/admin/reunions",
    icon: <CalendarDays className="h-5 w-5" />
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  
  return (
    <div className="h-full bg-white dark:bg-gray-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">École Avenir Digital</h1>
        <p className="text-sm text-muted-foreground font-medium">Espace Administration</p>
      </div>
      
      <nav className="space-y-1 px-3 py-6 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              location.pathname === item.href
                ? "bg-primary/10 text-primary dark:bg-primary/20"
                : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-foreground"
            )}
          >
            <span className={cn(
              "flex items-center justify-center",
              location.pathname === item.href
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground"
            )}>
              {item.icon}
            </span>
            {item.title}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
        <div className="rounded-lg bg-muted/60 p-4">
          <div className="font-medium">Portail Administrateur</div>
          <div className="text-sm text-muted-foreground mt-1">
            <Link to="/" className="text-primary hover:underline font-medium">
              Retour à l'espace élève
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
