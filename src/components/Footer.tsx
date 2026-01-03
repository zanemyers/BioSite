import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/zanemyers', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/zane-myers-s15', icon: Linkedin },
    { name: 'Email', href: 'mailto:zane15myers@gmail.com', icon: Mail }
  ];

  return (
      <footer className="bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-foreground mb-2">Let's Connect</h3>
              <p className="text-muted-foreground">Feel free to reach out for collaborations or just to say hello!</p>
            </div>

            <div className="flex space-x-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-blue-50"
                        aria-label={link.name}
                    >
                      <Icon size={20} />
                    </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2026 Zane Myers. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;