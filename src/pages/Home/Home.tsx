import {
  FiArrowRight,
  FiBriefcase,
  FiChevronDown,
  FiDownload,
  FiMail,
  FiMapPin,
} from 'react-icons/fi';
import SkillsCard from '../../components/SkillsCard';
import UpdateCard from '../../components/UpdateCard';
import Button from '../../components/ui/Button';
import Reveal from '../../components/ui/Reveal';
import SectionHeading from '../../components/ui/SectionHeading';
import { mailto, site } from '../../siteConfig';
import { sortedUpdates } from '../Updates/updateEntries';
import aboutMePicture from './imgs/about_me.jpg';
import profilePicture from './imgs/profile.jpg';

const frontendSkills = [
  { name: 'React', level: 60 },
  { name: 'TypeScript', level: 65 },
  { name: 'HTML', level: 90 },
  { name: 'Bootstrap 5', level: 80 },
];

const backendSkills = [
  { name: 'Node.js', level: 75 },
  { name: 'Python', level: 85 },
  { name: 'PostgreSQL', level: 70 },
  { name: 'REST API', level: 80 },
];

const otherTools = [
  { name: 'Playwright', level: 85 },
  { name: 'Git', level: 85 },
  { name: 'Docker', level: 60 },
];

const [latestUpdate] = sortedUpdates;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-title"
        className="relative isolate flex items-center overflow-hidden pb-20 pt-14 md:min-h-[80vh] md:pb-24 md:pt-16"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-lines absolute inset-x-0 top-0 h-152" />
          <div className="absolute -top-28 left-1/2 h-80 w-184 -translate-x-1/2 rounded-full bg-accent/15 blur-[100px]" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow flex flex-wrap items-center gap-2">
                {site.role} — {site.location}
                <span aria-hidden="true" className="animate-caret h-3 w-0.5 bg-accent" />
              </p>

              <h1
                id="hero-title"
                className="mt-6 text-5xl font-semibold tracking-tight text-foreground text-balance md:text-7xl"
              >
                Hi, I'm <span className="text-gradient">Zane Myers</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
                A developer and problem solver who enjoys learning new technologies and building
                things that are genuinely useful.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  href={site.resumePath}
                  download
                  variant="primary"
                  size="lg"
                  icon={<FiDownload size={16} />}
                >
                  Download Resume
                </Button>
                <Button href={mailto} variant="outline" size="lg" icon={<FiMail size={16} />}>
                  Get In Touch
                </Button>
              </div>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-linear-to-br from-accent/25 via-cyan/20 to-violet/20 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-5 rounded-[2.5rem] border border-border/70"
                />
                <div
                  aria-hidden="true"
                  className="animate-float pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-linear-to-br from-accent/70 to-cyan/40 opacity-70 blur-md"
                />

                <div className="ring-gradient relative rounded-3xl border border-border bg-card/60 p-2.5 shadow-xl backdrop-blur-md">
                  <div className="overflow-hidden rounded-[1.35rem]">
                    <img
                      src={profilePicture}
                      alt="Zane Myers"
                      loading="eager"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1.5 -top-1.5 h-6 w-6 rounded-tl-xl border-l border-t border-accent/60"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-br-xl border-b border-r border-cyan/60"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 lg:flex"
        >
          <span className="micro-label">Scroll</span>
          <span className="h-8 w-px bg-linear-to-b from-border-strong to-transparent" />
          <FiChevronDown size={14} aria-hidden="true" className="animate-float text-accent" />
        </div>
      </section>

      {/* About */}
      <section aria-label="About me" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-last lg:order-first">
              <div className="ring-gradient overflow-hidden rounded-2xl border border-border bg-card/50 p-2 shadow-lg backdrop-blur-md">
                <img
                  src={aboutMePicture}
                  alt="My Family"
                  loading="lazy"
                  className="w-full rounded-xl object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <SectionHeading eyebrow="01 — About" title="About Me" />
              <div className="mt-6 max-w-2xl space-y-5">
                <p className="text-muted-foreground leading-relaxed">
                  I’m a software developer who enjoys turning messy problems into clean, reliable
                  solutions. My work focuses on building data-driven tools and web applications,
                  often combining backend systems with thoughtful frontend experiences to make
                  complex information usable.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Outside of work, I enjoy exploring new places, digging into emerging technologies,
                  and spending time with my family. I’m motivated by learning, enjoy a good
                  challenge, and like pushing myself to build things that are both practical and
                  well-crafted.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <span className="chip">
                  <FiMapPin size={13} aria-hidden="true" className="text-accent" />
                  {site.location}
                </span>
                <span className="chip">
                  <FiBriefcase size={13} aria-hidden="true" className="text-accent" />
                  {site.role} at {site.employer}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hairline" />
      </div>

      {/* Skills */}
      <section aria-label="Skills and expertise" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="02 — Skills"
              title="Skills & Expertise"
              description="A diverse set of skills accumulated through years of experience and continuous learning."
              className="mx-auto max-w-2xl"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            <Reveal className="h-full">
              <SkillsCard name="Frontend Development" skills={frontendSkills} color="accent" />
            </Reveal>
            <Reveal delay={80} className="h-full">
              <SkillsCard name="Backend Development" skills={backendSkills} color="cyan" />
            </Reveal>
            <Reveal delay={160} className="h-full">
              <SkillsCard name="Design & Tools" skills={otherTools} color="violet" />
            </Reveal>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hairline" />
      </div>

      {/* Latest update */}
      {latestUpdate && (
        <section aria-label="Latest update" className="relative py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading eyebrow="03 — Latest" title="Latest Update" />
            </Reveal>

            <Reveal delay={80} className="mt-10">
              <UpdateCard {...latestUpdate} clamp />

              <div className="mt-7">
                <Button
                  to="/updates"
                  variant="outline"
                  size="md"
                  iconAfter={<FiArrowRight size={16} />}
                >
                  Read all updates
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Closing — the buttons carry it; no prose. */}
      <section aria-label="Keep exploring" className="relative pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="panel ring-gradient isolate overflow-hidden rounded-2xl px-6 py-14 text-center md:px-14 md:py-20">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="grid-lines absolute inset-0" />
                <div className="absolute -bottom-24 left-1/2 h-64 w-136 -translate-x-1/2 rounded-full bg-accent/15 blur-[90px]" />
              </div>

              <SectionHeading align="center" eyebrow="04 — Elsewhere" title="Take a look around" />

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button to="/projects" size="lg" iconAfter={<FiArrowRight size={16} />}>
                  View Projects
                </Button>
                <Button to="/resume" variant="outline" size="lg">
                  Read Resume
                </Button>
                <Button href={mailto} variant="ghost" size="lg" icon={<FiMail size={16} />}>
                  Email me
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
