import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './src/pages/Home/Home';
import Resume from './src/pages/Resume/Resume.tsx';
import Projects from './src/pages/Projects/Projects';
import Updates from './src/pages/Updates/Updates';
import Terms from './src/pages/Terms';
import Privacy from './src/pages/Privacy';
import NotFound from './src/pages/NotFound';

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
}

export default App;