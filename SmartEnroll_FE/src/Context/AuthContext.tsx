import React, { createContext, useState, useEffect } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "../Service/type";

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  apiUser: User | null;
  setApiUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  apiUser: null,
  setApiUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [apiUser, setApiUser] = useState<User | null>(null);

  useEffect(() => {
    // Kiểm tra localStorage khi component mount
    const savedUser = localStorage.getItem('apiUser');
    if (savedUser) {
      setApiUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSetApiUser = (user: User | null) => {
    setApiUser(user);
    if (user) {
      localStorage.setItem('apiUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('apiUser');
    }
  };

  const logout = async () => {
    setFirebaseUser(null);
    handleSetApiUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      firebaseUser, 
      apiUser, 
      setApiUser: handleSetApiUser, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
