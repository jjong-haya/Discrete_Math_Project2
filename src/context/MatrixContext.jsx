import React, { createContext, useState, useContext } from 'react';
const MatrixContext = createContext();
export const useMatrix = () => useContext(MatrixContext);
export const MatrixProvider = ({ children }) => {

  const [matrix, setMatrix] = useState(
    Array(5).fill(null).map(() => Array(5).fill(0))
  );

  const [analysisResult, setAnalysisResult] = useState(null);

  const value = {
    matrix,
    setMatrix,
    analysisResult,
    setAnalysisResult,
  };

  return (
    <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>
  );
};