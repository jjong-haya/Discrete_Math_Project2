import React from 'react';
import { useMatrix } from '../context/MatrixContext';
import { useNavigate } from 'react-router-dom';
import MatrixDisplay from '../components/matrix/MatrixDisplay';
import './ResultPage.css';

function ResultPage() {
  const navigate = useNavigate();
  const { matrix, analysisResult } = useMatrix();
  if (!analysisResult) {
    return (
      <div className="result-container">
        <p>분석 데이터가 없습니다. 먼저 행렬을 입력해주세요.</p>
        <button onClick={() => navigate('/input')}>입력 페이지로</button>
      </div>
    );
  }
  return (
    <div className="result-container">
      <div className='result-title'>결과 도출</div>
      <hr></hr>
      <div className='result-stitle'>1. 입력된 관계 행렬</div>
      <MatrixDisplay matrix={matrix} />
      <hr></hr>
      <div className="result-details">
        <div className='result-stitle'>2. 동치 관계 판별</div>
        <ul>
          <li>
            반사 관계 (Reflexive):
            {analysisResult.isReflexive ? ' O' : ' X'}
          </li>
          <li>
            대칭 관계 (Symmetric):
            {analysisResult.isSymmetric ? ' O' : ' X'}
          </li>
          <li>
            추이 관계 (Transitive):
            {analysisResult.isTransitive ? ' O' : ' X'}
          </li>
        </ul>
        <div className="result-summary">
            {analysisResult.isEquivalence
              ? '✅ 위 관계는 동치 관계입니다.'
              : '❌ 위 관계는 동치 관계가 아닙니다.'}
        </div>
        <hr></hr>
        {analysisResult.isEquivalence && (
          <div className="result-section">
            <div className='result-stitle'>3. 동치류 (Equivalence Classes)</div>
            <div className="code-block">{analysisResult.classes}</div>
          </div>
        )}

        {!analysisResult.isEquivalence && (
          <div className="result-section">
            <div className='result-stitle' >4. 폐포(Closure) 변환 과정</div>
            {analysisResult.closures.map((closure, index) => (
              <div key={index} className="closure-step">
                <div className='clocure-stitle'>{closure.type} 변환</div>
                <div className="closure-matrices">
                  <div>
                    <div>변환 전:</div>
                    <MatrixDisplay matrix={closure.before} />
                  </div>
                  <div>
                    <div>변환 후:</div>
                    <MatrixDisplay matrix={closure.after} />
                  </div>
                </div>
              </div>
            ))}

            <hr />

            <div className='result-stitle'>최종 동치 폐포(Equivalence Closure) 관계</div>
            <MatrixDisplay matrix={analysisResult.finalEquivalenceMatrix} />
            <div className='result-summary'>
                최종 판별: 위 행렬은 동치 관계입니다.
            </div>
            <hr></hr>
            <div className='result-stitle'>5. 최종 동치류</div>
            <p className="code-block">{analysisResult.finalClasses}</p>
          </div>
        )}
      </div>

      <button onClick={() => navigate('/input')} className="back-button">
        다시 입력하기
      </button>
    </div>

  );
}

export default ResultPage;