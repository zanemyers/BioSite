import type React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Projects from './pages/Projects/Projects';
import Resume from './pages/Resume/Resume.tsx';
import Terms from './pages/Terms';
import Updates from './pages/Updates/Updates';

const App: React.FC = () => {
  return (
    <Router>
      <main className="min-h-screen font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
