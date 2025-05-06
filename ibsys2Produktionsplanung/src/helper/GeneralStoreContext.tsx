import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import GeneralStore from '../dtos/GeneralStoreDTO';
interface GeneralStoreContextType {
  generalStore: GeneralStore | null;
  setGeneralStoreData: (data: GeneralStore) => void;
}

const GeneralStoreContext = createContext<GeneralStoreContextType | null>(null);

export const GeneralStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [generalStore, setGeneralStore] = useState<GeneralStore | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('generalStore');
    if (storedData) {
      setGeneralStore(JSON.parse(storedData));
    }
  }, []);

  const setGeneralStoreData = (newGeneralStoreData: GeneralStore) => {
    setGeneralStore(newGeneralStoreData);
  };

  return (
    <GeneralStoreContext.Provider value={{ generalStore, setGeneralStoreData }}>
      {children}
    </GeneralStoreContext.Provider>
  );
};

export const useGeneralStore = (): GeneralStoreContextType => {
  const context = useContext(GeneralStoreContext);
  if (!context) {
    throw new Error('useGeneralStore must be used within a GeneralStoreProvider');
  }
  return context;
};
