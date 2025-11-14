import React from 'react';
import MatrixRowDisplay from '../matrix/MatrixRowDisplay';

const createEmptyMatrix = () => Array(5).fill(null).map(() => Array(5).fill(0));

function CustomMatrixInput({
  isRandom,
  onToggleRandom,
  customMatrix,
  onMatrixChange,
  numOnes,
  onNumOnesChange
}) {

  const matrix = Array.isArray(customMatrix) ? customMatrix : createEmptyMatrix();

  const handleCellClick = (rowIndex, cellIndex) => {
    const newMatrix = matrix.map(row => [...row]);
    newMatrix[rowIndex][cellIndex] = 1 - newMatrix[rowIndex][cellIndex];
    onMatrixChange(newMatrix);
  };

  const handleNumOnesChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 25) value = 25;
    onNumOnesChange(value);
  };

  const handleResetMatrix = () => {
    onMatrixChange(createEmptyMatrix());
  };

  return (
    <div className="settings-group">
      <h3>1. 관계 행렬(Matrix) 설정</h3>
      <label className="settings-label">
        <input
          type="checkbox"
          checked={isRandom}
          onChange={(e) => onToggleRandom(e.target.checked)}
        />
        무작위 관계 행렬 사용 (Random)
      </label>
      {isRandom && (
        <div className="settings-input-container random-matrix-options">
          <p>무작위로 생성할 '1'의 개수를 설정하세요. (0 ~ 25)</p>
          <label>
            '1'의 개수:
            <input
              type="number"
              className="max-ones-input"
              value={numOnes}
              onChange={handleNumOnesChange}
              min="0"
              max="25"
            />
          </label>
          <p className="settings-info">
            설정값이 높을 수록 최종 폐포가 전부 1로 찰 확률이 높아집니다.
          </p>
        </div>
      )}

      {!isRandom && (
        <div className="settings-input-container">
          <div className="custom-matrix-header">
            <p>사용할 관계 행렬을 직접 클릭하여 입력하세요.</p>
            <button
              className="reset-matrix-button"
              onClick={handleResetMatrix}
            >
              초기화
            </button>
          </div>

          <div className="custom-matrix-input-area">
            {matrix.map((row, index) => (
              <MatrixRowDisplay
                key={index}
                rowData={row}
                isActive={true}
                onCellClick={(cellIndex) => handleCellClick(index, cellIndex)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomMatrixInput;