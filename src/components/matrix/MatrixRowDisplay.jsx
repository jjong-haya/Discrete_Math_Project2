import React from 'react';
import './MatrixRowDisplay.css';

function MatrixRowDisplay({ rowData, isActive, onCellClick = () => {} }) {
  const safeRowData = Array.isArray(rowData) ? rowData : [];
  const displayData = [...safeRowData];

  while (displayData.length < 5) {
    displayData.push(0);
  }

  const rowClassName = `matrix-row-display ${isActive ? 'active' : ''}`;

  return (
    <div className={rowClassName}>
      {displayData.slice(0, 5).map((cell, index) => {
        const valueClass = cell === 1 ? 'is-value-1' : '';
        return (
          <div
            key={index}
            className={`matrix-cell ${valueClass}`}
            onClick={() => onCellClick(index)}
          >
            {cell}
          </div>
        );
      })}
    </div>
  );
}

export default MatrixRowDisplay;