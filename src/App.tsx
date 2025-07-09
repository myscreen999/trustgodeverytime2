import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import DirectorMessage from './components/DirectorMessage';
import Services from './components/Services';
import Projects from './components/Projects';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PasswordSetup from './pages/PasswordSetup';

const HomePage = () => (
  <ErrorBoundary>
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <Presentation />
        <DirectorMessage />
        <Services />
        <Projects />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  </ErrorBoundary>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/password-setup" element={<ErrorBoundary><PasswordSetup /></ErrorBoundary>} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;