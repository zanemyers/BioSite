import { FiCalendar } from 'react-icons/fi';
import Tag, { type TagTone } from './ui/Tag';

/**
 * The categories an entry can be filed under, and the tone each renders in. Key order is the
 * filter order on the Updates page.
 */
const categoryTones = {
  professional: 'accent',
  personal: 'green',
  learning: 'orange',
  travel: 'violet',
} satisfies Record<string, TagTone>;

export type UpdateCategory = keyof typeof categoryTones;

/** Filter order on the Updates page. Cast because `Object.keys` always widens to `string[]`. */
export const updateCategories = Object.keys(categoryTones) as UpdateCategory[];

/** One entry in updateEntries.ts — content only, no presentation flags. */
export interface UpdateEntry {
  title: string;
  content: string;
  date: Date;
  category: UpdateCategory[];
  image?: string;
  /**
   * How the photo fills its frame. `cover` (default) bleeds edge to edge in a 16:9 frame, which
   * suits landscape shots. Use `contain` for portrait or otherwise tall photos — it shows the
   * whole image, centered, rather than cropping the subject out of a wide frame.
   */
  imageFit?: 'cover' | 'contain';
}

/** An entry plus the per-placement presentation choices the pages make. */
type UpdateCardProps = UpdateEntry & {
  /** Truncates the body to three lines — used by teaser placements like Home. */
  clamp?: boolean;
  /** Hides the in-card date at lg+, where the feed shows it on the timeline rail instead. */
  dateInRail?: boolean;
};

const pad = (value: number) => String(value).padStart(2, '0');

export default function UpdateCard({
  title,
  content,
  date,
  category,
  image,
  imageFit = 'cover',
  clamp = false,
  dateInRail = false,
}: UpdateCardProps) {
  // Built from local parts so the machine-readable date can't drift a day across time zones.
  const isoDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const body = (
    <div className="flex min-w-0 flex-1 flex-col p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex flex-wrap gap-2">
          {category.map((cat) => (
            <Tag key={cat} tone={categoryTones[cat]}>
              {cat}
            </Tag>
          ))}
        </div>
        <span className={`chip ml-auto ${dateInRail ? 'lg:hidden' : ''}`}>
          <FiCalendar size={12} aria-hidden="true" />
          <time dateTime={isoDate}>{formattedDate}</time>
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-card-foreground text-balance md:text-2xl">
        {title}
      </h3>
      <p
        className={`mt-3 max-w-prose text-muted-foreground leading-relaxed whitespace-pre-line ${
          clamp ? 'line-clamp-3' : ''
        }`}
      >
        {content}
      </p>
    </div>
  );

  /* Contained photos keep their own proportions, so nothing gets cropped and the hover zoom —
     which would crop — is left off. Cover photos bleed edge to edge in a 16:9 frame. */
  const picture =
    imageFit === 'contain' ? (
      /* Width-capped rather than height-capped, so the photo always fills its box at its own
         proportions and is never letterboxed. Container queries — not viewport ones — drive the
         padding and rounding, so the moment the card itself is narrower than the cap the photo
         goes fully flush, exactly like the 16:9 covers above. */
      <div className="border-b border-border @min-[28rem]:py-5">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="mx-auto h-auto w-full max-w-md @min-[28rem]:rounded-xl"
        />
      </div>
    ) : (
      <div className="relative aspect-video overflow-hidden border-b border-border">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {/* Vignette settles the photo into the glass instead of ending on a hard edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/25 to-transparent"
        />
      </div>
    );

  return (
    <article className="panel panel-interactive group @container flex flex-col overflow-hidden">
      {image && picture}
      {body}
    </article>
  );
}
