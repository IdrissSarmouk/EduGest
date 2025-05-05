
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Layout = () => {
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { logout } = useAuth();
  
  return (
    <div className="student-layout">
      {isMobile ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
            <div className="container flex justify-between items-center p-4">
              <h1 className="text-lg font-bold text-primary">École Avenir Digital</h1>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                  title="Déconnexion"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
          
          {showMobileMenu && (
            <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-background">
              <Sidebar />
            </div>
          )}
          
          <div className="pt-16">
            <Header />
            <main className="container p-4">
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        <div className="flex">
          <div className="w-64 border-r">
            <Sidebar />
            <div className="p-4">
              <Button variant="outline" className="w-full" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Déconnexion
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <Header />
            <main className="container py-6 px-4">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
