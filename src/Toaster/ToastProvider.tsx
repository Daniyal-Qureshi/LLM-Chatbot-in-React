import React, {
  createContext, useContext, ReactNode, useMemo,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';

interface ToasterContextType {
  showToaster: (
    message: string,
    type: 'success' | 'error' | 'info' | 'default'
  ) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

interface ToasterProviderProps {
  children: ReactNode;
}

export function ToasterProvider({ children }: ToasterProviderProps) {
  const showToaster = (
    message: string,
    type: 'success' | 'error' | 'info' | 'default',
  ) => {
    toast(message, { type });
  };

  return (
    <ToasterContext.Provider value={useMemo(() => ({ showToaster }), [])}>
      {children}
      <ToastContainer theme="dark" />
    </ToasterContext.Provider>
  );
}

export function useToaster() {
  const context = useContext(ToasterContext);
  if (context === undefined) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
}
