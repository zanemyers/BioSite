import type { JobProps } from '../../components/JobEntry';
import type { TagTone } from '../../components/ui/Tag';
import { jobs } from './jobEntries';

/**
 * Everything the résumé says, in one place. Both /resume and the print route the PDF is generated
 * from read this, so the two can't drift apart.
 */

export const summary =
  'Software developer with 3+ years of experience building full-stack web applications and data ' +
  'pipelines using Python, Django, React, and Node.js. Experienced in ETL, workflow automation, ' +
  'AI tooling, and CI/CD. Proven collaborator with a passion for clean, maintainable code, ' +
  'mentorship, and user-focused design.';

/**
 * Ordered most-central-to-current-work first, not alphabetically: with four to six entries a group,
 * readers only reliably take in the first one or two, so position is the signal. Data keeps its
 * kinds together — capability, then libraries, then warehouses — and orders by currency inside each.
 *
 * `Tools & Other` is the exception, and line packing is why: the print sidebar renders each group as
 * one wrapped run, and promoting `Linux` ahead of `GitHub Actions` pushes that run from two lines to
 * three — 17px of a sheet with 35px to spare. Measured, not guessed. Leave the order alone unless
 * you re-run `bun run resume:pdf` and watch the sidebar fill.
 */
export const skillGroups: { title: string; tone: TagTone; skills: string[] }[] = [
  {
    title: 'Frontend',
    tone: 'accent',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vue.js'],
  },
  { title: 'Backend', tone: 'cyan', skills: ['Python', 'Django', 'REST APIs', 'Node.js'] },
  {
    title: 'Data',
    tone: 'green',
    skills: ['ETL Pipelines', 'Polars', 'SQLAlchemy', 'SQL Server', 'PostgreSQL'],
  },
  {
    title: 'Tools & Other',
    tone: 'violet',
    skills: ['Git', 'Docker', 'GitHub Actions', 'Playwright', 'Linux', 'Claude Code'],
  },
];

/**
 * Page-only, the way `olderExperience` is: shown behind a disclosure on /resume and deliberately
 * absent from the PDF, which has room for four groups and no more. Flat rather than grouped — the
 * set is too lopsided to card up, with one entry each for Backend and Data.
 */
export const additionalSkills = [
  'JavaScript',
  'HTML',
  'CSS',
  'SCSS',
  'Bootstrap 5',
  'Express.js',
  'MySQL',
  'dlt',
  'Just',
  'cron',
  'Automation Anywhere',
];

export const interests = [
  'Web Development',
  'App Development (iOS)',
  'AI Integrations',
  'Mentorship & Personal Development',
  'International Missions & Travel',
];

/** Same shape as a job so the degree can ride the shared timeline. Purple = K-State. */
export const education: JobProps = {
  color: 'purple',
  title: 'Bachelor of Science in Computer Science',
  company: 'Kansas State University',
  from: 'Aug 2018',
  to: 'Dec 2022',
  location: 'Manhattan, Kansas',
  experiences: [],
};

export const currentJobs = jobs.filter((job) => !job.olderExperience);
export const olderJobs = jobs.filter((job) => job.olderExperience);
