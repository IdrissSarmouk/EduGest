
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isMobile ? (
        <div className="flex flex-col h-screen">
          <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
            <div className="container flex justify-between items-center p-4">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">École Avenir Digital</h1>
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
            <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-white dark:bg-gray-800">
              <AdminSidebar />
            </div>
          )}
          
          <div className="pt-16 flex-1">
            <Header />
            <main className="container p-4 mx-auto">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <div className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
            <AdminSidebar />
          </div>
          <div className="flex-1 flex flex-col h-screen overflow-auto">
            <Header />
            <main className="flex-1 p-6 overflow-y-auto">
              <div className="container max-w-7xl mx-auto">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
