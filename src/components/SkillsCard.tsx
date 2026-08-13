interface Skills {
  name: string;
  level: number;
}

interface Props {
  name: string;
  skills: Skills[];
  /** Semantic accent key driving the card's gradient. */
  color: 'accent' | 'cyan' | 'violet';
}

const SEGMENTS = 12;
const TICK = `calc(100% / ${SEGMENTS} - 3px)`;
const PITCH = `calc(100% / ${SEGMENTS})`;
/* Ticked meter: the mask cuts the track into segments, the gradient is clipped to the fill. */
const MASK = `repeating-linear-gradient(to right,#000 0 ${TICK},transparent ${TICK} ${PITCH})`;

const gradients: Record<Props['color'], string> = {
  accent: 'from-accent to-cyan',
  cyan: 'from-cyan to-accent',
  violet: 'from-violet to-accent',
};

export default function SkillsCard({ name, skills, color }: Props) {
  const gradient = gradients[color];
  const initials = name
    .split(/\s+/)
    .filter((word) => /^[a-z]/i.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <article className="panel panel-interactive flex h-full flex-col p-6">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-linear-to-br ${gradient} font-mono text-[11px] font-bold text-accent-foreground`}
        >
          {initials}
        </span>
        <h3 className="text-xl font-semibold text-card-foreground">{name}</h3>
      </div>

      <div className="mt-5 h-px bg-linear-to-r from-border via-border to-transparent" />

      <ul className="mt-5 space-y-4">
        {skills.map((skill) => {
          const filled = Math.round((skill.level / 100) * SEGMENTS);
          const remainder = ((1 - filled / SEGMENTS) * 100).toFixed(2);

          return (
            <li key={skill.name}>
              <span className="font-mono text-xs text-foreground">{skill.name}</span>
              {/* The meter is decorative; screen readers get the value as text instead. */}
              <span className="sr-only">{skill.level} out of 100</span>
              <div
                aria-hidden="true"
                className="relative mt-2 h-1.5 w-full"
                style={{ maskImage: MASK, WebkitMaskImage: MASK }}
              >
                <div className="absolute inset-0 bg-border-strong/60" />
                <div
                  className={`absolute inset-0 bg-linear-to-r ${gradient}`}
                  style={{ clipPath: `inset(0 ${remainder}% 0 0)` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
