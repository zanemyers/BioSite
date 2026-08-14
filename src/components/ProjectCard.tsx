import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Tag from './ui/Tag';

interface Props {
  title: string;
  description: string;
  image: string;
  /** Optional dark-mode variant, swapped in CSS so both are preloaded and the toggle is instant. */
  imageDark?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  deprecated?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  imageDark,
  technologies,
  githubUrl,
  liveUrl,
  deprecated,
}: Props) {
  return (
    <article className="panel panel-interactive group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] ${
            imageDark ? 'dark:hidden' : ''
          }`}
        />
        {imageDark && (
          <img
            src={imageDark}
            alt={`Screenshot of ${title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 not-dark:hidden group-hover:scale-[1.06]"
          />
        )}
        {/* Scrim melts the screenshot into the card body instead of butting against it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-card/80 via-card/10 to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-card-foreground text-balance">{title}</h3>
          {deprecated && (
            <Tag tone="warn" className="mt-0.5 shrink-0">
              Deprecated
            </Tag>
          )}
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-5 mb-6 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Tag key={tech} tone="accent">
              {tech}
            </Tag>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-5 border-t border-border/70 pt-5">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`View ${title} on GitHub`}
            >
              <FiGithub
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5"
              />
              Code
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-mono text-xs text-accent decoration-accent/40 underline-offset-4 hover:underline"
              aria-label={`View ${title} live demo`}
            >
              <FiExternalLink
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
