import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { mailto, site } from '../siteConfig';
import { navigation } from './Header';

const socialLinks = [
  { name: 'GitHub', href: site.github, icon: FiGithub },
  { name: 'LinkedIn', href: site.linkedin, icon: FiLinkedin },
  { name: 'Email', href: mailto, icon: FiMail },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border">
      {/* Gradient hairline across the seam. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Let's Connect</h2>
            <p className="mt-3 max-w-sm text-muted-foreground leading-relaxed">
              Feel free to reach out for collaborations or just to say hello!
            </p>
            <a
              href={mailto}
              className="group mt-5 inline-flex items-center gap-2 font-mono text-sm text-accent"
            >
              {site.email}
              <FiArrowUpRight
                aria-hidden="true"
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <nav aria-label="Footer">
            <h3 className="eyebrow">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.resumePath}
                  download
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow">Elsewhere</h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                const isMail = link.href.startsWith('mailto:');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={isMail ? undefined : '_blank'}
                    rel={isMail ? undefined : 'noopener noreferrer'}
                    aria-label={link.name}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/70 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <p className="mt-5 font-mono text-xs leading-relaxed text-muted-foreground">
              {site.location}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-border pt-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} Zane Myers. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <Link
              to="/privacy-policy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
