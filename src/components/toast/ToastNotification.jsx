import React, { useState, useEffect } from 'react';
import './ToastNotification.css';

function ToastNotification({ message, duration, onClose, isExiting }) {
  const [progress, setProgress] = useState(100);

  const [isExitingInternal, setIsExitingInternal] = useState(false);

  useEffect(() => {
    if (isExiting) {
      setIsExitingInternal(true);
    }

    const closeTimer = setTimeout(() => {
      setIsExitingInternal(true);
    }, duration);

    return () => clearTimeout(closeTimer);
  }, [duration, isExiting]);



  useEffect(() => {
    if (isExitingInternal) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, isExitingInternal]);

  useEffect(() => {
    if (isExitingInternal) {

      const removeTimer = setTimeout(() => {
        onClose();
      }, 300);

      return () => clearTimeout(removeTimer);
    }
  }, [isExitingInternal, onClose]);

  return (
    <div className={`toast-notification ${isExitingInternal ? 'exiting' : ''}`}>
      <div className="toast-message">{message}</div>
      <div className="toast-progress-bar">
        <div
          className="toast-progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>

  );
}

export default ToastNotification;