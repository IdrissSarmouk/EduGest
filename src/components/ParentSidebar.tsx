
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Book, 
  Calendar, 
  FileText, 
  Bell, 
  Clock, 
  MessageSquare, 
  LayoutDashboard,
  UserRound,
  Settings
} from "lucide-react";

const navItems = [
  {
    title: "Tableau de bord",
    href: "/parent",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    title: "Notes",
    href: "/parent/notes",
    icon: <Book className="h-5 w-5" />
  },
  {
    title: "Bulletins",
    href: "/parent/bulletins",
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: "Absences et retards",
    href: "/parent/absences",
    icon: <Clock className="h-5 w-5" />
  },
  {
    title: "Calendrier scolaire",
    href: "/parent/calendrier",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    title: "Communication",
    href: "/parent/communication",
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    title: "Notifications",
    href: "/parent/notifications",
    icon: <Bell className="h-5 w-5" />
  },
];

const ParentSidebar = () => {
  const location = useLocation();
  
  return (
    <div className="h-screen border-r bg-card sticky top-0 overflow-y-auto w-64">
      <div className="p-4">
        <h1 className="text-xl font-bold text-primary mb-1">École Avenir Digital</h1>
        <p className="text-sm text-muted-foreground">Espace Parent</p>
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
          <div className="font-medium">Sophie Dupont</div>
          <div className="text-sm text-muted-foreground">Parent de Martin Dupont</div>
          <div className="mt-2 flex flex-col gap-1">
            <Link to="/" className="text-sm flex items-center gap-2 text-primary hover:underline">
              <UserRound className="h-4 w-4" />
              Espace Élève
            </Link>
            <Link to="/admin" className="text-sm flex items-center gap-2 text-primary hover:underline">
              <Settings className="h-4 w-4" />
              Espace Administration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentSidebar;
