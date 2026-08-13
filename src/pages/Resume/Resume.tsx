import type { IconType } from 'react-icons';
import {
  FiArrowUpRight,
  FiDownload,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlus,
} from 'react-icons/fi';
import JobEntry, { type JobProps } from '../../components/JobEntry';
import Button from '../../components/ui/Button';
import Reveal from '../../components/ui/Reveal';
import SectionHeading, { Eyebrow } from '../../components/ui/SectionHeading';
import Tag, { type TagTone } from '../../components/ui/Tag';
import { TimelineRail } from '../../components/ui/Timeline';
import { mailto, site } from '../../siteConfig';
import { jobs, volunteering } from './jobEntries';

const frontendSkills = [
  'React',
  'Vue.js',
  'TypeScript',
  'Javascript',
  'HTML',
  'CSS',
  'Bootstrap 5',
];
const backendSkills = [
  'Python',
  'Django',
  'Node.js',
  'Express.js',
  'Rest APIs',
  'PostgreSQL',
  'MySQL',
];
const otherSkills = ['Git', 'Docker', 'Playwright', 'Just'];
const interests = [
  'Web Development',
  'App Development (IOS)',
  'AI Integrations',
  'Mentorship & Personal Development',
  'International Missions & Travel',
];

const skillGroups: { title: string; tone: TagTone; skills: string[] }[] = [
  { title: 'Frontend', tone: 'accent', skills: frontendSkills },
  { title: 'Backend', tone: 'cyan', skills: backendSkills },
  { title: 'Tools & Other', tone: 'violet', skills: otherSkills },
];

interface ContactItem {
  label: string;
  value: string;
  icon: IconType;
  href?: string;
  external?: boolean;
}

const contact: ContactItem[] = [
  { label: 'Email', value: site.email, icon: FiMail, href: mailto },
  { label: 'Phone', value: site.phone, icon: FiPhone, href: site.phoneHref },
  { label: 'Location', value: site.locationShort, icon: FiMapPin },
  {
    label: 'Website',
    value: site.website,
    icon: FiGlobe,
    href: site.websiteUrl,
    external: true,
  },
];

/** Same shape as a job so the degree can ride the shared timeline. Purple = K-State. */
const education: JobProps = {
  color: 'purple',
  title: 'Bachelor of Science in Computer Science',
  company: 'Kansas State University',
  from: 'Aug 2018',
  to: 'Dec 2022',
  location: 'Manhattan, Kansas',
  experiences: [],
};

const currentJobs = jobs.filter((job) => !job.olderExperience);
const olderJobs = jobs.filter((job) => job.olderExperience);

const contactShell =
  'group flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3';

export default function Resume() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20 lg:px-8">
      <div className="space-y-8 md:space-y-10">
        {/* Page head */}
        <Reveal>
          <section
            aria-labelledby="resume-title"
            className="panel ring-gradient overflow-hidden p-6 sm:p-8 md:p-10"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines" />

            <div className="relative">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <Eyebrow>Résumé</Eyebrow>
                  <h1
                    id="resume-title"
                    className="mt-5 text-4xl font-semibold tracking-tight text-balance text-foreground md:text-6xl"
                  >
                    Zane Myers
                  </h1>
                  <p className="mt-3 font-mono text-sm text-muted-foreground md:text-base">
                    Software Engineer
                  </p>
                </div>
                <Button href={site.resumePath} download size="lg" icon={<FiDownload size={16} />}>
                  Download PDF
                </Button>
              </div>

              <div className="mt-8 hairline" />

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {contact.map((item) => {
                  const Icon = item.icon;
                  const inner = (
                    <>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-muted/50 text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                        <Icon size={15} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block micro-label">{item.label}</span>
                        <span className="block truncate text-sm text-foreground">{item.value}</span>
                      </span>
                      {item.href && (
                        <FiArrowUpRight
                          size={14}
                          aria-hidden="true"
                          className="ml-auto shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-accent"
                        />
                      )}
                    </>
                  );

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className={`${contactShell} transition-colors duration-300 hover:border-accent/40 hover:bg-muted/70`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={contactShell}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 text-sm italic text-muted-foreground">
                References available upon request
              </p>
            </div>
          </section>
        </Reveal>

        {/* Summary */}
        <Reveal delay={80}>
          <section
            id="summary"
            aria-label="Professional Summary"
            className="panel p-6 sm:p-8 md:p-10"
          >
            <SectionHeading eyebrow="01 — Summary" title="Professional Summary" />
            <p className="mt-6 border-l border-accent/40 pl-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Software developer with 2+ years of full-stack experience building web applications
              using Python, Django, Vue.js, React, and Node.js. Experienced in automating workflows,
              integrating Al tools, and maintaining CI/CD pipelines. Proven collaborator with a
              passion for clean, maintainable code, mentorship, and user-focused design.
            </p>
          </section>
        </Reveal>

        {/* Experience */}
        <Reveal>
          <section
            id="experience"
            aria-label="Professional Experience"
            className="panel p-6 sm:p-8 md:p-10"
          >
            <SectionHeading eyebrow="02 — Experience" title="Professional Experience" />

            <div className="relative mt-8">
              <TimelineRail />
              <ol className="space-y-5 md:space-y-6">
                {currentJobs.map((job) => (
                  <JobEntry key={job.title} {...job} />
                ))}
              </ol>
            </div>

            <details className="group/older mt-6">
              <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 transition-colors duration-300 hover:border-accent/40 hover:bg-muted/70">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-border bg-muted/50 text-accent">
                  <FiPlus
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-open/older:rotate-45"
                  />
                </span>
                <span className="text-sm font-medium text-foreground">Older Experience</span>
                <span className="chip ml-auto tabular-nums">+{olderJobs.length}</span>
              </summary>

              <div className="relative mt-5">
                <TimelineRail />
                <ol className="space-y-5 md:space-y-6">
                  {olderJobs.map((job) => (
                    <JobEntry key={job.title} {...job} />
                  ))}
                </ol>
              </div>
            </details>
          </section>
        </Reveal>

        {/* Education */}
        <Reveal>
          <section id="education" aria-label="Education" className="panel p-6 sm:p-8 md:p-10">
            <SectionHeading eyebrow="03 — Education" title="Education" />

            {/* No rail — a single node has nothing to connect. */}
            <div className="relative mt-8">
              <ol>
                <JobEntry {...education} />
              </ol>
            </div>
          </section>
        </Reveal>

        {/* Skills */}
        <Reveal>
          <section id="skills" aria-label="Technical Skills" className="panel p-6 sm:p-8 md:p-10">
            <SectionHeading eyebrow="04 — Stack" title="Technical Skills" />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.title} className="rounded-xl border border-border bg-muted/40 p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {String(group.skills.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Tag key={skill} tone={group.tone}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Volunteering */}
        <Reveal>
          <section id="volunteering" aria-label="Volunteering" className="panel p-6 sm:p-8 md:p-10">
            <SectionHeading eyebrow="05 — Service" title="Volunteering" />

            <div className="relative mt-8">
              <TimelineRail />
              <ol className="space-y-5 md:space-y-6">
                {volunteering.map((entry) => (
                  <JobEntry key={entry.title} {...entry} />
                ))}
              </ol>
            </div>
          </section>
        </Reveal>

        {/* Interests */}
        <Reveal>
          <section id="interests" aria-label="Interests" className="panel p-6 sm:p-8 md:p-10">
            <SectionHeading eyebrow="06 — Interests" title="Interests" />

            <div className="mt-8 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Tag key={interest} tone="default" className="whitespace-normal">
                  {interest}
                </Tag>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
