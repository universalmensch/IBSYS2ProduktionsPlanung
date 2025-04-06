// GeneralStoreContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Create the context with default values
const GeneralStoreContext = createContext<any>(undefined);

// Create a provider component to wrap your app
export const GeneralStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [generalStore, setGeneralStore] = useState<any>(null);

  const setGeneralStoreData = (newGeneralStoreData: any) => {
    setGeneralStore(newGeneralStoreData);
  };

  return (
    <GeneralStoreContext.Provider value={{ generalStore, setGeneralStoreData }}>
      {children}
    </GeneralStoreContext.Provider>
  );
};

// Custom hook to easily use the context
export const useGeneralStore = (): any => {
  const context = useContext(GeneralStoreContext);
  if (!context) {
    throw new Error('useGeneralStore must be used within a GeneralStoreProvider');
  }
  return context;
};
