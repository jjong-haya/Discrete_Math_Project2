import React, { createContext, useState, useContext, useCallback } from 'react';
import ToastNotification from '../components/toast/ToastNotification';

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

let toastId = 0;
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, duration = 5000) => {
    const id = toastId++;
    const newToast = { id, message, duration };
    setToasts([newToast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};