import { useState, useCallback, useEffect } from 'react';
import LanguageSelect from './components/LanguageSelect';
import LandingPage from './components/LandingPage';
import TestRunner from './components/TestRunner';
import ResultsPage from './components/ResultsPage';
import MethodologyPage from './components/MethodologyPage';
import { translations } from './data/translations';
import { trackPageView } from './utils/tracking';
import './App.css';

function App() {
  const [page, setPage] = useState('lang-select');
  const [testResults, setTestResults] = useState(null);
  const [lang, setLang] = useState(null);

  const t = lang ? translations[lang] : null;

  // Track every page view
  useEffect(() => {
    trackPageView(page);
  }, [page]);

  // Track initial site visit
  useEffect(() => {
    trackPageView('site_visit');
  }, []);

  const selectLang = useCallback((l) => {
    setLang(l);
    setPage('landing');
  }, []);

  const toggleLang = useCallback(() => {
    setLang(l => l === 'en' ? 'tr' : 'en');
  }, []);

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

  if (page === 'lang-select') {
    return <LanguageSelect onSelect={selectLang} />;
  }

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
