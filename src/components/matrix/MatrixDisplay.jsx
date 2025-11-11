import React from 'react';
import './MatrixDisplay.css';

function MatrixDisplay({ matrix }) {
  const displayMatrix = Array.isArray(matrix) ? matrix : [];

  return (
    <div className="matrix-display">
      {Array(5).fill(0).map((_, i) => (
        Array(5).fill(0).map((_, j) => {
          const value = (displayMatrix[i] && displayMatrix[i][j] !== undefined)
                          ? displayMatrix[i][j]
                          : 0;

          const cellClassName = `matrix-display-cell ${value === 1 ? 'is-active' : ''}`;

          return (
            <div key={`${i}-${j}`} className={cellClassName}>
              {value}
            </div>
          );
        })
      ))}
    </div>
  );
}

export default MatrixDisplay;