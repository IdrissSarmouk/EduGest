
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

// Define user roles
export type UserRole = 'admin' | 'parent' | 'student' | null;

// Define user interface
interface User {
  id: string;
  role: UserRole;
}

// Define context interface
interface AuthContextType {
  user: User | null;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userId: string, password: string): boolean => {
    // Simple hard-coded authentication
    if (password !== '1234') {
      toast.error("Mot de passe incorrect");
      return false;
    }

    let role: UserRole = null;
    
    if (userId === 'admin1') {
      role = 'admin';
    } else if (userId === 'parent1') {
      role = 'parent';
    } else if (userId === 'eleve1') {
      role = 'student';
    } else {
      toast.error("Identifiant inconnu");
      return false;
    }

    // Set user in state and localStorage
    const newUser = { id: userId, role };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Navigate to appropriate page
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'parent':
        navigate('/parent');
        break;
      case 'student':
        navigate('/');
        break;
    }
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
