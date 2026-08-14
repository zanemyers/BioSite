import { FiArrowUpRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import ProjectCard, { type Props as Project } from '../../components/ProjectCard';
import Button from '../../components/ui/Button';
import Reveal from '../../components/ui/Reveal';
import SectionHeading, { Eyebrow } from '../../components/ui/SectionHeading';
import Tag from '../../components/ui/Tag';
import { mailto } from '../../siteConfig';
import bioSitePicture from './imgs/bioSite.jpg';
import bioSiteDarkPicture from './imgs/bioSite_dark.jpg';
import budgeteerPicture from './imgs/budgeteer.jpg';
import flyboxPicture from './imgs/flybox.jpg';
import flybox2DarkPicture from './imgs/flybox2_dark.jpg';
import flybox2LightPicture from './imgs/flybox2_light.jpg';

/** The first entry is rendered as the featured hero; the rest fill the grid. */
const projects: Project[] = [
  {
    title: 'Flybox 2.0',
    description:
      'A fly-fishing shop locator and report aggregator built with Next.js. Searches Google Maps for fly-fishing shops, scrapes contact info and fishing report links, then uses Google Gemini to summarize findings. Users can download a summarized report and shop directory.',
    image: flybox2LightPicture,
    imageDark: flybox2DarkPicture,
    technologies: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Google Gemini',
      'SerpAPI',
      'Leaflet',
      'Docker',
    ],
    githubUrl: 'https://github.com/zanemyers/Flybox-2.0',
    liveUrl: 'https://flybox.zm1.org',
  },
  {
    title: 'Budgeteer (WIP)',
    description: 'An Idea for how to do budgets better.',
    image: budgeteerPicture,
    technologies: ['Python', 'Django', 'JavaScript', 'SCSS', 'Just', 'HTML'],
    githubUrl: 'https://github.com/zanemyers/Budgeteer',
  },
  {
    title: 'BioSite',
    description: "A website all about me! And guess what... you're already there!",
    image: bioSitePicture,
    imageDark: bioSiteDarkPicture,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Router'],
    githubUrl: 'https://github.com/zanemyers/BioSite',
    liveUrl: 'https://zm1.org',
  },
  {
    title: 'Flybox',
    description:
      'Flybox collects and aggregates fly-fishing shop data by scraping Google Maps and individual shop websites. It outputs structured, analyzable datasets that highlight online sales, fishing reports, and digital presence.',
    image: flyboxPicture,
    technologies: ['TypeScript', 'JavaScript', 'SCSS', 'Docker', 'Just'],
    githubUrl: 'https://github.com/zanemyers/Flybox',
    deprecated: true,
  },
];

export default function Projects() {
  const featured = projects[0];
  const rest = projects.slice(1);
  const total = String(projects.length).padStart(2, '0');

  return (
    <>
      {/* Page head */}
      <section
        className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 md:pt-20 md:pb-16 lg:px-8"
        aria-labelledby="projects-title"
      >
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h1
            id="projects-title"
            className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-foreground text-balance"
          >
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            A collection of projects that showcase my skills in full-stack development, design, and
            problem-solving. Each project represents a unique challenge and learning experience.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="chip tabular-nums">
              <span className="text-foreground">{total}</span>
              projects
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-linear-to-r from-border to-transparent"
            />
          </div>
        </Reveal>
      </section>

      {/* Featured */}
      <section
        aria-label="Featured project"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <Reveal>
          <SectionHeading eyebrow="01 — Spotlight" title="Featured Project" />
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div className="panel ring-gradient overflow-hidden rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
              <div className="relative aspect-video lg:aspect-auto lg:min-h-112">
                <img
                  src={featured.image}
                  alt={`Screenshot of ${featured.title}`}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover object-top-left ${
                    featured.imageDark ? 'dark:hidden' : ''
                  }`}
                />
                {featured.imageDark && (
                  <img
                    src={featured.imageDark}
                    alt={`Screenshot of ${featured.title}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top-left not-dark:hidden"
                  />
                )}
                {/* Scrim: bottom-up on mobile, left-to-right into the copy on desktop. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-card/85 via-card/15 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-card/10 lg:to-card/60"
                />
              </div>

              <div className="relative flex flex-col justify-center gap-6 p-6 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3">
                  <Tag tone="accent" className="uppercase tracking-[0.18em]">
                    Featured
                  </Tag>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-linear-to-r from-accent/40 to-transparent"
                  />
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    01 / {total}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-card-foreground text-balance">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    {featured.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {featured.technologies.map((tech) => (
                    <Tag key={tech} tone="accent">
                      {tech}
                    </Tag>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {featured.githubUrl && (
                    <Button
                      href={featured.githubUrl}
                      external
                      icon={<FiGithub size={16} />}
                      aria-label={`View Code for ${featured.title}`}
                    >
                      View Code
                    </Button>
                  )}
                  {featured.liveUrl && (
                    <Button
                      href={featured.liveUrl}
                      external
                      variant="outline"
                      icon={<FiExternalLink size={16} />}
                      aria-label={`Live Demo for ${featured.title}`}
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div aria-hidden="true" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hairline" />
      </div>

      {/* All projects */}
      <section
        aria-label="All projects"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <Reveal>
          <SectionHeading eyebrow="02 — Index" title="All Projects" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {rest.map((project, index) => (
            <Reveal key={project.title} className="h-full" delay={index * 80}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section
        aria-label="Contact"
        className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-28 lg:px-8"
      >
        <Reveal>
          <div className="panel ring-gradient overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 left-1/2 h-56 w-152 max-w-[120%] -translate-x-1/2 rounded-full bg-accent/12 blur-3xl"
            />
            <div className="relative">
              <SectionHeading
                align="center"
                eyebrow="03 — Contact"
                title="Interested in Working Together?"
                description="I'm always open to discussing new opportunities and interesting projects. Let's connect and see how we can create something amazing together."
              />
              <div className="mt-9 flex justify-center">
                <Button href={mailto} size="lg" iconAfter={<FiArrowUpRight size={16} />}>
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
