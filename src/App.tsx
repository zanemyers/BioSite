import type React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Projects from './pages/Projects/Projects';
import Resume from './pages/Resume/Resume';
import ResumePrint from './pages/Resume/ResumePrint';
import Terms from './pages/Terms';
import Updates from './pages/Updates/Updates';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/*
         * Dev only, and outside Layout: the print sheet carries no header, footer, or backdrop.
         * `import.meta.env.DEV` is replaced with a literal at build time, so this branch and the
         * ResumePrint module are both dropped from the production bundle. The PDF generator runs
         * against the dev server for the same reason — see scripts/generate-resume-pdf.ts.
         */}
        {import.meta.env.DEV && <Route path="/resume/print" element={<ResumePrint />} />}

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
