import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InputPage from './pages/InputPage';
import ResultPage from './pages/ResultPage';
import RandomProblemPage from './pages/RandomProblemPage'; // [추가]

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/random-problem" element={<RandomProblemPage />} />
      </Routes>
    </div>
  );
}

export default App;