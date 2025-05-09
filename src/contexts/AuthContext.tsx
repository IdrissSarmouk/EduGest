
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

// Define user roles
export type UserRole = 'admin' | 'parent' | 'student' | 'teacher' | null;

// Define user interface
interface UserData {
  id: string;
  role: UserRole;
}

// Define context interface
interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
  loading: true,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize authentication state
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession ? { 
          id: currentSession.user.id,
          role: null, // Will be updated after profile fetch
        } : null);

        // If session exists, fetch the user profile
        if (currentSession?.user) {
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        setUser({ 
          id: currentSession.user.id,
          role: null, // Will be updated after profile fetch
        });
        fetchUserProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUser(prev => prev ? { ...prev, role: data.role as UserRole } : null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Sign up with email and password
  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        toast.success("Inscription réussie ! Veuillez vérifier votre e-mail pour confirmer votre compte.");
        return true;
      }

      return false;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("Une erreur s'est produite lors de l'inscription.");
      return false;
    }
  };

  // Login with email and password
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        // Get user profile data to determine role
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          toast.error("Erreur lors de la récupération du profil utilisateur");
          return false;
        }

        const role = profileData?.role as UserRole;
        
        // Navigate to appropriate page based on role
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
          case 'teacher':
            navigate('/enseignant');
            break;
          default:
            navigate('/');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Une erreur s'est produite lors de la connexion.");
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Une erreur s'est produite lors de la déconnexion.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
