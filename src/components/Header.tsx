import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'About', href: '/' },
    { name: 'Resume', href: '/resume' },
    { name: 'Projects', href: '/projects' },
    { name: 'Life Updates', href: '/updates' }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-foreground hover:text-muted-foreground transition-colors">
                Zane Myers
              </Link>
              <div className="hidden md:flex items-center">
                <nav className="flex space-x-8">
                  {navigation.map((item) => (
                      <Link
                          key={item.name}
                          to={item.href}
                          className={`px-3 py-2 text-sm font-medium transition-colors ${
                              isActive(item.href)
                                  ? 'text-blue-600 border-b-2 border-blue-600'
                                  : 'text-muted-foreground hover:text-blue-600'
                          }`}
                      >
                        {item.name}
                      </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="hidden md:flex">
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <div className="md:hidden border-t border-border bg-card">
                <div className="py-3 px-4 flex items-center justify-between">
                  <div>
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-foreground">
                      Your Name
                    </Link>
                  </div>
                  <div>
                    <ThemeToggle />
                  </div>
                </div>
                <nav className="py-2 space-y-1 px-4 pb-4">
                  {navigation.map((item) => (
                      <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                              isActive(item.href)
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-muted-foreground hover:text-blue-600 hover:bg-secondary'
                          }`}
                      >
                        {item.name}
                      </Link>
                  ))}
                </nav>
              </div>
          )}
        </div>
      </header>
  );
};

export default Header;