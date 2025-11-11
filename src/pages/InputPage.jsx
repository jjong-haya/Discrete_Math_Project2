import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatrix } from '../context/MatrixContext';
import { useToast } from '../context/ToastContext';
import { analyzeRelation } from '../logic/relationLogic';
import MatrixRowDisplay from '../components/matrix/MatrixRowDisplay';
import './InputPage.css';

const parseRowInput = (rowStr) => {
  const chars = rowStr.split('');
  const parsed = chars.map((val) => (val === '1' ? 1 : 0));
  while (parsed.length < 5) {
    parsed.push(0);
  }
  return parsed.slice(0, 5);
};

function InputPage() {
  const navigate = useNavigate();
  const { setMatrix, setAnalysisResult } = useMatrix();
  const { addToast } = useToast();
  const [rowInputs, setRowInputs] = useState(['', '', '', '', '']);
  const [activeRow, setActiveRow] = useState(null);
  const [rowErrors, setRowErrors] = useState([false, false, false, false, false]);

  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    const truncatedValue = value.slice(0, 5);
    const regex = /^[01]*$/;
    const newInputs = [...rowInputs];
    const newErrors = [...rowErrors];

    if (!regex.test(truncatedValue)) {
      addToast("0과 1만 입력할 수 있습니다.");
      newErrors[index] = true;
    } else {
      newErrors[index] = false;
    }
    newInputs[index] = truncatedValue;
    setRowInputs(newInputs);
    setRowErrors(newErrors);
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    const currentRowString = rowInputs[rowIndex];
    let parsedRow = parseRowInput(currentRowString);
    parsedRow[cellIndex] = 1 - parsedRow[cellIndex];
    const newRowString = parsedRow.join('');
    const newRowInputs = [...rowInputs];
    newRowInputs[rowIndex] = newRowString;
    setRowInputs(newRowInputs);
    const newErrors = [...rowErrors];
    newErrors[rowIndex] = false;
    setRowErrors(newErrors);
  };

  const handleSubmit = () => {
    const newMatrix = Array(5).fill(null).map(() => Array(5).fill(0));
    let matrixHasZero = false;
    let hasError = false;
    let firstErrorIndex = -1;
    for (let i = 0; i < 5; i++) {
      const input = rowInputs[i];
      if (rowErrors[i]) {
        if (!hasError) {
          firstErrorIndex = i;
          addToast(`[${i + 1}번째 행] 0 또는 1이 아닌 값이 있습니다.`);
        }
        hasError = true;
      }
      if (input.length > 0 && input.length < 5) {
        if (!hasError) {
          firstErrorIndex = i;
          addToast(`[${i + 1}번째 행]은 5자리를 모두 입력해야 합니다.`);
        }
        hasError = true;
      }
      const parsedRow = parseRowInput(input);
      for (let j = 0; j < 5; j++) {
        if (parsedRow[j] === 0) {
          matrixHasZero = true;
        }
        newMatrix[i][j] = parsedRow[j];
      }
    }

    if (hasError) {
      if (firstErrorIndex !== -1) {
        setActiveRow(firstErrorIndex);
        if (inputRefs.current[firstErrorIndex]) {
          inputRefs.current[firstErrorIndex].focus();
        }
      }
      return;
    }

    setMatrix(newMatrix);
    const results = analyzeRelation(newMatrix);
    setAnalysisResult(results);
    navigate('/result');
  };

  return (
    <div className="input-container">
      <div className="input-title-container">
        <div className="input-title">관계 행렬 입력 (5x5)</div>
        <div className="input-description">
          각 행의 값을 5자리로 입력하세요. (띄어쓰기 X)
        </div>
      </div>

      <div className="input-form">
        {rowInputs.map((value, index) => (
          <div key={index} className="input-group">
            <MatrixRowDisplay
              rowData={parseRowInput(value)}
              isActive={activeRow === index}
              onCellClick={(cellIndex) => handleCellClick(index, cellIndex)}
            />
            <input
              type="text"
              className={`matrix-row-input ${rowErrors[index] ? 'error' : ''}`}
              maxLength={5}
              value={value}
              placeholder={`${index + 1}행 (ex: 10100)`}
              ref={(el)=>(inputRefs.current[index]=el)}
              onFocus={() => setActiveRow(index)}
              onBlur={() => setActiveRow(null)}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        결과 보기
      </button>
    </div>
  );
}

export default InputPage;