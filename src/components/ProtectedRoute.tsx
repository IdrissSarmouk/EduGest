
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  allowedRoles,
  redirectTo = "/login" 
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Show loading state or spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to specified route if user doesn't have required role
  if (user.role && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
