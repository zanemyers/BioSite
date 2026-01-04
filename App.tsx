import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './src/pages/Home';
import Resume from './src/pages/Resume';
import Projects from './src/pages/Projects';
import Updates from './src/pages/Updates';
import Terms from './src/pages/Terms';
import Privacy from './src/pages/Privacy';
import NotFound from './src/pages/NotFound';

const App: React.FC = () => {
  return (
      <Theme appearance="inherit" radius="large" scaling="100%">
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                pauseOnHover
            />
          </main>
        </Router>
      </Theme>
  );
}

export default App;