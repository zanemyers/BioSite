import { FiCalendar, FiMapPin } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import Tag, { type TagTone, toneText } from './ui/Tag';
import { TimelineNode } from './ui/Timeline';

type JobColor = 'blue' | 'green' | 'purple' | 'red' | 'orange';

interface Tone {
  /** Tag tone this data color borrows its text color from, via `toneText`. */
  tone: TagTone;
  dot: string;
  ring: string;
}

/** The five data colors mapped onto tokens (plus Tag's palette) so both themes stay legible. */
const tones: Record<JobColor, Tone> = {
  blue: { tone: 'accent', dot: 'bg-accent', ring: 'border-accent/50' },
  green: { tone: 'green', dot: 'bg-emerald-500', ring: 'border-emerald-500/50' },
  purple: { tone: 'violet', dot: 'bg-violet', ring: 'border-violet/50' },
  red: { tone: 'red', dot: 'bg-red-500', ring: 'border-red-500/50' },
  orange: { tone: 'orange', dot: 'bg-orange-500', ring: 'border-orange-500/50' },
};

/** What JobEntry renders. The data in jobEntries.ts adds its own filtering flag on top. */
export interface JobProps {
  color: JobColor;
  title: string;
  company: string;
  from: string;
  to: string;
  location: string;
  experiences: string[];
}

/** One timeline entry: a glowing rail node plus a glass card. Renders an `<li>`. */
export default function JobEntry(props: JobProps) {
  const tone = tones[props.color];
  const isCurrent = props.to === 'Present';

  return (
    <li>
      <Reveal className="group relative pl-8 sm:pl-10">
        <TimelineNode
          className="absolute left-0 top-6.75 md:top-7.75"
          dot={tone.dot}
          ring={tone.ring}
          pulse={isCurrent}
        />

        <div className="rounded-xl border border-border bg-muted/40 p-5 shadow-sm transition-colors duration-300 hover:border-accent/35 hover:bg-muted/70 md:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-foreground md:text-xl">{props.title}</h3>
              <p className={`mt-1 text-sm font-medium ${toneText(tone.tone)}`}>{props.company}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Tag tone={isCurrent ? 'accent' : 'default'} className="tabular-nums">
                <FiCalendar size={12} aria-hidden="true" />
                <span>
                  {props.from} – {props.to}
                </span>
              </Tag>
              <Tag>
                <FiMapPin size={12} aria-hidden="true" />
                <span>{props.location}</span>
              </Tag>
            </div>
          </div>

          {props.experiences.length > 0 && (
            <ul className="mt-4 space-y-2.5 border-t border-border/70 pt-4">
              {props.experiences.map((experience) => (
                <li
                  key={experience}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-2.75 h-px w-3.5 shrink-0 opacity-60 ${tone.dot}`}
                  />
                  <span>{experience}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </li>
  );
}
