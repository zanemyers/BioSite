import { Fragment } from 'react';
import { FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { site } from '../../siteConfig';
import { volunteering } from './jobEntries';
import { currentJobs, education, interests, skillGroups, summary } from './resumeData';

/**
 * The print sheet the PDF is generated from — see scripts/generate-resume-pdf.ts. Not linked from
 * anywhere, and disallowed in robots.txt.
 *
 * Sized in inches and points rather than the site's rem scale, because the output is a physical
 * Letter page and everything has to land inside one. Colors are literal rather than tokens so the
 * sheet renders identically whichever theme the browser happens to be in. Layout follows the résumé
 * this replaced, minus the older experience the site keeps behind a disclosure.
 *
 * The main column is deliberately kept well under full so bullets can be added to the current role
 * later. `bun run resume:pdf` prints the fill for both columns and fails on overflow.
 */

const INK = '#0f1729';
const MUTED = '#4a5568';
const ACCENT = '#1659e9';
const RULE = '#d8dee9';
const SIDEBAR = '#0e1320';

/** Strips the scheme and any `www.` so the printed handle stays short. */
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');

const contact = [
  { icon: FiPhone, value: site.phone },
  { icon: FiMail, value: site.email },
  { icon: FiGlobe, value: site.website },
  { icon: FiGithub, value: bare(site.github) },
  { icon: FiLinkedin, value: bare(site.linkedin) },
  { icon: FiMapPin, value: site.locationShort },
];

/** Sidebar section label: tracked caps over a hairline. */
function SideHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-2 border-b border-white/20 pb-1 font-display text-[9pt] font-semibold uppercase tracking-[0.16em] text-white/90">
      {children}
    </h2>
  );
}

/** Main-column section label, matching the site's heading-plus-rule rhythm. */
function MainHeading({ children }: { children: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      {/* Inherits INK from the sheet root. */}
      <h2 className="font-display text-[11pt] font-semibold uppercase tracking-[0.14em]">
        {children}
      </h2>
      <span className="h-px flex-1" style={{ backgroundColor: RULE }} />
    </div>
  );
}

/** Title and organization on the left, dates and location on the right. */
function EntryHead({
  title,
  org,
  from,
  to,
  location,
}: {
  title: string;
  org: string;
  from: string;
  to: string;
  location: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-[8pt]">
      <div>
        <p className="text-[10.5pt] font-semibold leading-tight">{title}</p>
        <p className="text-[9.4pt]" style={{ color: ACCENT }}>
          {org}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-mono text-[8.2pt] tabular-nums" style={{ color: MUTED }}>
          {from} – {to}
        </p>
        <p className="font-mono text-[8.2pt]" style={{ color: MUTED }}>
          {location}
        </p>
      </div>
    </div>
  );
}

export default function ResumePrint() {
  return (
    <div
      className="resume-sheet flex overflow-hidden bg-white font-sans"
      style={{ width: '8.5in', height: '11in', color: INK }}
    >
      {/* Flat fill: a decorative gradient here was verified invisible — `aside` creates no stacking
          context, so negatively-stacked children paint behind the sheet's own background. Add
          `isolate` here first if reintroducing one. */}
      <aside
        className="flex w-60 shrink-0 flex-col px-[0.32in] py-[0.38in] text-white"
        style={{ backgroundColor: SIDEBAR }}
      >
        <div>
          <h1 className="font-display text-[24pt] font-bold uppercase leading-[1.05] tracking-tight">
            Zane
            <br />
            Myers
          </h1>
          <div
            aria-hidden="true"
            className="mt-[7pt] h-[2.5pt] w-14"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, #3be1f7)` }}
          />
        </div>

        <div className="mt-[17pt]">
          <SideHeading>Technical Skills</SideHeading>
          <div className="space-y-2">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-[7.6pt] uppercase tracking-[0.12em] text-white/50">
                  {group.title}
                </p>
                {/* Separator rides a nowrap span with a breakable space after, so a wrapped line
                    never begins with a stray dot. */}
                <p className="mt-0.5 text-[8.6pt] leading-[1.45] text-white/90">
                  {group.skills.map((skill, index) => (
                    <Fragment key={skill}>
                      <span className="whitespace-nowrap">
                        {skill}
                        {index < group.skills.length - 1 && (
                          <span className="text-white/30">&nbsp;·</span>
                        )}
                      </span>{' '}
                    </Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[17pt]">
          <SideHeading>Volunteering</SideHeading>
          <div className="space-y-[8pt]">
            {volunteering.map((role) => (
              <div key={`${role.company}-${role.title}`}>
                <p className="text-[8.8pt] font-semibold leading-tight text-white">{role.title}</p>
                <p className="text-[8.2pt] text-white/70">{role.company}</p>
                <p className="mt-[1pt] font-mono text-[7pt] tabular-nums text-white/45">
                  {role.from} – {role.to}
                </p>
                <p className="font-mono text-[7pt] text-white/45">{role.location}</p>
                {role.experiences.length > 0 && (
                  <ul className="mt-1 space-y-[2pt]">
                    {role.experiences.map((item) => (
                      <li key={item} className="flex gap-[4pt] text-[7.8pt] leading-[1.32]">
                        <span
                          aria-hidden="true"
                          className="mt-[3.5pt] h-px w-[4pt] shrink-0 bg-white/40"
                        />
                        <span className="text-white/75">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[17pt]">
          <SideHeading>Interests</SideHeading>
          <ul className="space-y-[2.5pt]">
            {interests.map((interest) => (
              <li key={interest} className="text-[8.6pt] leading-[1.35] text-white/85">
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex-1 px-[0.38in] py-[0.38in]">
        <header>
          <p className="font-display text-[13pt] font-semibold" style={{ color: ACCENT }}>
            Software Engineer
          </p>
          {/* Compact wrapped row — the stacked list this replaced was eating the sidebar. */}
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {contact.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.value}
                  className="flex items-center gap-[4pt] text-[8.4pt]"
                  style={{ color: MUTED }}
                >
                  <Icon size={9} aria-hidden="true" style={{ color: ACCENT }} />
                  <span>{item.value}</span>
                </li>
              );
            })}
          </ul>
          <div aria-hidden="true" className="mt-3 h-px" style={{ backgroundColor: RULE }} />
        </header>

        <section className="mt-[14pt]">
          <MainHeading>Summary</MainHeading>
          <p className="text-[9.4pt] leading-[1.48]" style={{ color: MUTED }}>
            {summary}
          </p>
        </section>

        <section className="mt-[13pt]">
          <MainHeading>Education</MainHeading>
          <EntryHead
            title={education.title}
            org={education.company}
            from={education.from}
            to={education.to}
            location={education.location}
          />
        </section>

        <section className="mt-[13pt]">
          <MainHeading>Experience</MainHeading>
          <div className="space-y-[10pt]">
            {currentJobs.map((job) => (
              <div key={`${job.company}-${job.title}`}>
                <EntryHead
                  title={job.title}
                  org={job.company}
                  from={job.from}
                  to={job.to}
                  location={job.location}
                />
                {job.experiences.length > 0 && (
                  <ul className="mt-1 space-y-[2.5pt]">
                    {job.experiences.map((item) => (
                      <li key={item} className="flex gap-[5pt] text-[9.2pt] leading-[1.38]">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-px w-[5pt] shrink-0"
                          style={{ backgroundColor: ACCENT }}
                        />
                        <span style={{ color: MUTED }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
