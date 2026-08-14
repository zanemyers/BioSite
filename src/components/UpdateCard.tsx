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
   * How the photo is seated. `cover` (default) bleeds edge to edge in a 16:9 frame and suits
   * landscape shots. `tall` is for portraits, and has three stages keyed off the card's own width:
   *
   * - **48rem and up**: beside the text rather than above it, capped at 400px tall. Both Home's
   *   ~1216px teaser and the feed's 840px card reach this. Stacked this wide, a 300px photo sits in
   *   ~450px of empty gutter, which reads as a layout bug rather than a choice.
   * - **28rem to 48rem**: stacked, the whole photo uncropped at its own proportions, centered and
   *   capped at 400px tall. Gutters remain, but the alternative is a 600px-tall photo. On the feed
   *   this is roughly a 480–816px viewport.
   * - **Below 28rem**, a phone: no cap, no frame, no side layout. The photo fills the card's full
   *   width at its own ratio. Nothing is cropped, deliberately — a centre crop into a landscape
   *   frame takes the tops of heads off a 3:4 photo, which is worse than a tall card.
   *
   * All three are container queries, not viewport ones, so a card in a narrow column behaves like a
   * phone even on a wide screen.
   */
  imageFit?: 'cover' | 'tall';
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

  /* `@min-[48rem]:block` matters for the tall float below: a flex container is its own formatting
     context, so its lines would refuse to wrap around the float and it would sit beside it instead.
     Harmless everywhere else — the children are blocks either way. */
  const body = (
    <div className="flex min-w-0 flex-1 flex-col p-6 md:p-7 @min-[48rem]:block">
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
      {/* No measure cap: the body fills the card. `max-w-prose` (65ch) left 154px dead on the right
          of every landscape card once the feed went to an 840px card. */}
      <p
        className={`mt-3 text-muted-foreground leading-relaxed whitespace-pre-line ${
          clamp ? 'line-clamp-3' : ''
        }`}
      >
        {content}
      </p>
    </div>
  );

  /* Tall photos change at two container widths, 28rem and 48rem — see `imageFit`. The hover zoom is
     left off for them: above 28rem the photo is uncropped, so there's no overflow to zoom into
     without clipping it. Cover photos keep the zoom, since their frame always crops. */
  const picture =
    imageFit === 'tall' ? (
      /* Floated at 48rem+ rather than made a flex column, so text long enough to outrun the photo
         wraps underneath it instead of leaving a tall blank column beside it. Self-adjusting: short
         entries never wrap and simply sit alongside. `pt-7` matches the body's `md:p-7` so the
         photo's top edge lines up with the category tags rather than sitting proud of them. No
         vertical divider here — a full-height rule would cut through the wrapped text. */
      <div className="border-b border-border @min-[28rem]:py-5 @min-[48rem]:float-left @min-[48rem]:mr-7 @min-[48rem]:mb-2 @min-[48rem]:border-b-0 @min-[48rem]:pt-7 @min-[48rem]:pl-7">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="mx-auto h-auto w-full @min-[28rem]:max-h-100 @min-[28rem]:w-auto @min-[28rem]:rounded-xl"
        />
      </div>
    ) : (
      /* Same float as the tall case, capped on width rather than height: a 16:9 photo held to 400px
         tall would be 711px wide and swallow the card. Two nested boxes so the float can be inset
         without disturbing the stacked case below 48rem — the outer one carries the position and
         padding, the inner one stays a 16:9 frame and just gains a width cap. */
      <div className="border-b border-border @min-[48rem]:float-left @min-[48rem]:mr-7 @min-[48rem]:mb-2 @min-[48rem]:border-b-0 @min-[48rem]:pt-7 @min-[48rem]:pl-7">
        <div className="relative aspect-video overflow-hidden @min-[48rem]:w-100 @min-[48rem]:rounded-xl">
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
      </div>
    );

  /* `flow-root` so the card encloses the floated photo rather than collapsing behind it. It sits on
     this inner wrapper rather than the article because an element can't respond to a container query
     it declares itself — `@min-[48rem]:` on the `@container` article would resolve against an
     ancestor and silently never match. */
  return (
    <article className="panel panel-interactive group @container flex flex-col overflow-hidden">
      <div className="flex flex-1 flex-col @min-[48rem]:flow-root">
        {image && picture}
        {body}
      </div>
    </article>
  );
}
