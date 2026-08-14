import type { JobProps } from '../../components/JobEntry';
import type { TagTone } from '../../components/ui/Tag';
import { jobs } from './jobEntries';

/**
 * Everything the résumé says, in one place. Both /resume and the print route the PDF is generated
 * from read this, so the two can't drift apart.
 */

export const summary =
  'Software developer with 2+ years of full-stack experience building web applications using ' +
  'Python, Django, Vue.js, React, and Node.js. Experienced in automating workflows, integrating ' +
  'AI tools, and maintaining CI/CD pipelines. Proven collaborator with a passion for clean, ' +
  'maintainable code, mentorship, and user-focused design.';

export const skillGroups: { title: string; tone: TagTone; skills: string[] }[] = [
  {
    title: 'Frontend',
    tone: 'accent',
    skills: ['React', 'Vue.js', 'TypeScript', 'Javascript', 'HTML', 'CSS', 'Bootstrap 5'],
  },
  {
    title: 'Backend',
    tone: 'cyan',
    skills: ['Python', 'Django', 'Node.js', 'Express.js', 'Rest APIs', 'PostgreSQL', 'MySQL'],
  },
  { title: 'Tools & Other', tone: 'violet', skills: ['Git', 'Docker', 'Playwright', 'Just'] },
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
