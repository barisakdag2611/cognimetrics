import { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import TestRunner from './components/TestRunner';
import ResultsPage from './components/ResultsPage';
import MethodologyPage from './components/MethodologyPage';
import './App.css';

function App() {
  const [page, setPage] = useState('landing');
  const [testResults, setTestResults] = useState(null);

  const startTest = useCallback(() => setPage('test'), []);
  const showResults = useCallback((results) => {
    setTestResults(results);
    setPage('results');
  }, []);
  const showMethodology = useCallback(() => setPage('methodology'), []);
  const goHome = useCallback(() => {
    setPage('landing');
    setTestResults(null);
  }, []);

  return (
    <div className="app">
      {page === 'landing' && (
        <LandingPage onStart={startTest} onMethodology={showMethodology} />
      )}
      {page === 'test' && (
        <TestRunner onComplete={showResults} onQuit={goHome} />
      )}
      {page === 'results' && testResults && (
        <ResultsPage results={testResults} onHome={goHome} onMethodology={showMethodology} />
      )}
      {page === 'methodology' && (
        <MethodologyPage onBack={goHome} />
      )}
    </div>
  );
}

export default App;
