import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeRelation } from '../logic/relationLogic';
import MatrixDisplay from '../components/matrix/MatrixDisplay';
import CustomMatrixInput from '../components/config/CustomMatrixInput';
import './RandomProblemPage.css';

const createRandomMatrix = (numOnes) => {
    const newMatrix = Array(5).fill(null).map(() => Array(5).fill(0));

    const positions = Array.from({ length: 25 }, (_, i) => i);

    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    for (let i = 0; i < numOnes; i++) {
        const pos = positions[i];
        const row = Math.floor(pos / 5);
        const col = pos % 5;
        newMatrix[row][col] = 1;
    }

    return newMatrix;
};

const emptyMatrix = Array(5).fill(null).map(() => Array(5).fill(0));

function RandomProblemPage() {
    const navigate = useNavigate();
    const [problemMatrix, setProblemMatrix] = useState(null);
    const [problemResult, setProblemResult] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const [isMatrixRandom, setIsMatrixRandom] = useState(true);
    const [customMatrix, setCustomMatrix] = useState(emptyMatrix);
    const [numOnes, setNumOnes] = useState(5);

    const generateNewProblem = () => {
        let matrix;
        if (isMatrixRandom) {
            matrix = createRandomMatrix(numOnes);
        } else {
            matrix = deepCopy(customMatrix);
        }
        const newResult = analyzeRelation(matrix);

        setProblemMatrix(matrix);
        setProblemResult(newResult);
        setShowAnswer(false);
    };

    const deepCopy = (matrix) => matrix.map((row) => [...row]);

    useEffect(() => {
        generateNewProblem();
    }, []);

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const handleNextProblem = () => {
        generateNewProblem();
        setShowSettings(false);
    };

    const handleCloseSettings = () => {
        setShowSettings(false);
    };

    if (!problemMatrix || !problemResult) {
        return <div>문제 로딩 중...</div>;
    }

    return (
        <>
            <div className="random-problem-container">
                <button className="settings-button" onClick={() => setShowSettings(true)}>
                    ⚙️
                </button>

                <div className='problem-title'>무작위 행렬 문제</div>
                <hr />

                <div className='problem-stitle'>문제: 다음 관계 행렬을 분석하시오.</div>
                <div className='problem-subtitle'> 집합 A = {'{ 1 , 2 , 3 , 4 , 5 }'}</div>
                <MatrixDisplay matrix={problemMatrix} />
                <hr />

                {showAnswer && (
                    <div className="result-details">
                        <div className='result-stitle'>2. 동치 관계 판별</div>
                        <ul>
                            <li>반사 관계 (Reflexive): {problemResult.isReflexive ? ' O' : ' X'}</li>
                            <li>대칭 관계 (Symmetric): {problemResult.isSymmetric ? ' O' : ' X'}</li>
                            <li>추이 관계 (Transitive): {problemResult.isTransitive ? ' O' : ' X'}</li>
                        </ul>
                        <div className="result-summary">
                            {problemResult.isEquivalence
                                ? '✅ 위 관계는 동치 관계입니다.'
                                : '❌ 위 관계는 동치 관계가 아닙니다.'}
                        </div>
                        <hr />
                        {problemResult.isEquivalence && (
                            <div className="result-section">
                                <div className='result-stitle'>3. 동치류 (Equivalence Classes)</div>
                                <div className="code-block">{problemResult.classes}</div>
                            </div>
                        )}
                        {!problemResult.isEquivalence && (
                            <div className="result-section">
                                <div className='result-stitle' >4. 폐포(Closure) 변환 과정</div>
                                {problemResult.closures.map((closure, index) => (
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
                                <MatrixDisplay matrix={problemResult.finalEquivalenceMatrix} />
                                <div className='result-summary'>
                                    최종 판별: 위 행렬은 동치 관계입니다.
                                </div>
                                <hr />
                                <div className='result-stitle'>5. 최종 동치류</div>
                                <p className="code-block">{problemResult.finalClasses}</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="problem-controls">
                    {!showAnswer && (
                        <button onClick={handleShowAnswer} className="control-button show-answer">
                            정답 보기
                        </button>
                    )}
                    <button onClick={handleNextProblem} className="control-button next-problem">다음 문제
                    </button>
                    <button onClick={() => navigate('/')} className="control-button back-home">
                        홈으로
                    </button>
                </div>
            </div>

            {showSettings && (
                <div className="modal-overlay" onClick={handleCloseSettings}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-button" onClick={handleCloseSettings}>×</button>

                        <div className="settings-panel">
                            <CustomMatrixInput
                                isRandom={isMatrixRandom}
                                onToggleRandom={setIsMatrixRandom}
                                customMatrix={customMatrix}
                                onMatrixChange={setCustomMatrix}
                                numOnes={numOnes}
                                onNumOnesChange={setNumOnes}
                            />
                        </div>

                        <button className="modal-done-button control-button back-home" onClick={handleCloseSettings}>
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default RandomProblemPage;