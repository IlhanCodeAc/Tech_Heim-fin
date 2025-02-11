import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for the user context
interface UserContextType {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component to wrap your app and manage the user's state
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
