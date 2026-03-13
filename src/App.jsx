import { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import TestRunner from './components/TestRunner';
import ResultsPage from './components/ResultsPage';
import MethodologyPage from './components/MethodologyPage';
import { translations } from './data/translations';
import './App.css';

function App() {
  const [page, setPage] = useState('landing');
  const [testResults, setTestResults] = useState(null);
  const [lang, setLang] = useState('en');

  const t = translations[lang];
  const toggleLang = useCallback(() => setLang(l => l === 'en' ? 'tr' : 'en'), []);

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
      <button className="lang-toggle" onClick={toggleLang}>
        {t.langSwitch}
      </button>
      {page === 'landing' && (
        <LandingPage t={t} onStart={startTest} onMethodology={showMethodology} />
      )}
      {page === 'test' && (
        <TestRunner t={t} lang={lang} onComplete={showResults} onQuit={goHome} />
      )}
      {page === 'results' && testResults && (
        <ResultsPage t={t} results={testResults} onHome={goHome} onMethodology={showMethodology} />
      )}
      {page === 'methodology' && (
        <MethodologyPage t={t} lang={lang} onBack={goHome} />
      )}
    </div>
  );
}

export default App;
