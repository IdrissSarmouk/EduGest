
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  return (
    <div className="admin-layout">
      {isMobile ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
            <div className="container flex justify-between items-center p-4">
              <h1 className="text-lg font-bold text-primary">Administration - École Avenir Digital</h1>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          {showMobileMenu && (
            <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-background">
              <AdminSidebar />
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
        <>
          <AdminSidebar />
          <div>
            <Header />
            <main className="container py-6 px-4">
              <Outlet />
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLayout;
