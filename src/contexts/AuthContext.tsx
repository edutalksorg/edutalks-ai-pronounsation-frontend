import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'superadmin' | 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscriptionStatus?: 'active' | 'inactive';
  walletBalance?: number;
  referralCode?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for demonstration
const DUMMY_USERS = {
  'superadmin@edulearndevelop.com': {
    password: 'Super@123',
    data: {
      id: '1',
      email: 'superadmin@edulearndevelop.com',
      name: 'Super Admin',
      role: 'superadmin' as UserRole,
    },
  },
  'admin@edulearndevelop.com': {
    password: 'Admin@123',
    data: {
      id: '2',
      email: 'admin@edulearndevelop.com',
      name: 'Admin User',
      role: 'admin' as UserRole,
    },
  },
  'user@edulearndevelop.com': {
    password: 'User@123',
    data: {
      id: '3',
      email: 'user@edulearndevelop.com',
      name: 'John Doe',
      role: 'user' as UserRole,
      subscriptionStatus: 'active' as const,
      walletBalance: 150,
      referralCode: 'JOHN2024',
    },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('edulearn_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const userCredentials = DUMMY_USERS[email as keyof typeof DUMMY_USERS];
    
    if (!userCredentials || userCredentials.password !== password) {
      throw new Error('Invalid email or password');
    }

    const userData = userCredentials.data;
    setUser(userData);
    localStorage.setItem('edulearn_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edulearn_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
