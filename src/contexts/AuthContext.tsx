import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "farmer" | "government" | "researcher";
  profile?: {
    farmSize?: string;
    district?: string;
    crops?: string[];
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo accounts
    const demoAccounts = {
      "farmer@demo.com": {
        id: "farmer-1",
        email: "farmer@demo.com",
        name: "Ram Prasad",
        role: "farmer" as const,
        profile: {
          farmSize: "2.5",
          district: "Cuttack",
          crops: ["rice", "maize"]
        }
      },
      "govt@demo.com": {
        id: "govt-1",
        email: "govt@demo.com",
        name: "Dr. Priya Sharma",
        role: "government" as const
      },
      "research@demo.com": {
        id: "research-1",
        email: "research@demo.com",
        name: "Dr. Rajesh Kumar",
        role: "researcher" as const
      }
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email in demoAccounts && password === "demo123") {
      const userData = demoAccounts[email as keyof typeof demoAccounts];
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }

    // Check if user exists in localStorage (for registered users)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const { password: _, ...userWithoutPassword } = existingUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u: any) => u.email === userData.email)) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};