import { useState } from 'react';
import UpdateCard, { type UpdateCategory, updateCategories } from '../../components/UpdateCard';
import Reveal from '../../components/ui/Reveal';
import { Eyebrow } from '../../components/ui/SectionHeading';
import { TimelineNode } from '../../components/ui/Timeline';
import { sortedUpdates } from './updateEntries';

// Derived from the tone map, so a new category can't be added without appearing in the filter.
const categories = ['all', ...updateCategories] as const;

/** Rail stamp: "JUL 17" above the year, so it reads as a scale rather than card metadata. */
const stampDay = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();

export default function Updates() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | UpdateCategory>('all');

  const filteredUpdates =
    selectedCategory === 'all'
      ? sortedUpdates
      : sortedUpdates.filter((update) => update.category.includes(selectedCategory));

  const count = String(filteredUpdates.length).padStart(2, '0');

  return (
    <>
      {/* Page head */}
      <section className="pt-14 md:pt-20" aria-labelledby="updates-title">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow>Life updates</Eyebrow>
            <h1
              id="updates-title"
              className="mt-5 text-4xl font-semibold tracking-tight text-foreground text-balance md:text-6xl"
            >
              Life <span className="text-gradient">Updates</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
              A glimpse into my journey - professional milestones, personal adventures, learning
              experiences, and everything in between.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Feed */}
      <section className="pb-20 pt-10 md:pb-28 md:pt-14" aria-labelledby="feed-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="feed-heading" className="sr-only">
            Update feed
          </h2>

          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Segmented control: a stadium on desktop, a rounded block once the pills wrap. */}
            <fieldset className="panel flex min-w-0 flex-wrap items-center gap-1.5 rounded-3xl p-1.5 lg:rounded-full">
              <legend className="sr-only">Filter updates by category</legend>
              {categories.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={active}
                    aria-controls="updates-feed"
                    className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      active
                        ? 'border-accent bg-accent text-accent-foreground shadow-glow'
                        : 'border-border bg-card/60 text-muted-foreground hover:border-accent/40 hover:text-foreground'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                );
              })}
            </fieldset>

            <p aria-live="polite" className="micro-label sm:shrink-0">
              <span className="tabular-nums text-foreground">{count}</span>{' '}
              {filteredUpdates.length === 1 ? 'Entry' : 'Entries'}
            </p>
          </Reveal>

          <div aria-hidden="true" className="mt-8 hairline" />

          <div id="updates-feed" className="mt-10 lg:mt-14">
            {filteredUpdates.length === 0 ? (
              <Reveal className="rounded-xl border border-dashed border-border-strong bg-muted/30 px-6 py-16 text-center">
                <p className="micro-label">No results</p>
                <p className="mt-3 text-muted-foreground">No updates found for this category.</p>
              </Reveal>
            ) : (
              <div className="relative">
                {/* Timeline rail — desktop only, so it never crowds the prose on mobile. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-24 hidden w-px bg-linear-to-b from-transparent via-border-strong to-transparent lg:block"
                />

                <ol className="space-y-10 lg:space-y-16">
                  {filteredUpdates.map((update, index) => (
                    <li key={update.title} className="relative lg:pl-30">
                      {/* Hidden from AT: the card already exposes this date semantically. */}
                      <div
                        aria-hidden="true"
                        className="absolute left-0 top-6 hidden w-30 items-center justify-end gap-5 pr-4.25 lg:flex"
                      >
                        <span className="flex flex-col items-end leading-tight">
                          <span className="font-mono text-sm font-medium tabular-nums text-foreground">
                            {stampDay(update.date)}
                          </span>
                          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                            {update.date.getFullYear()}
                          </span>
                        </span>
                        <TimelineNode className="relative" />
                      </div>

                      {/* Stagger only the first cards; later ones reveal as they scroll in. */}
                      <Reveal delay={Math.min(index, 2) * 80}>
                        <UpdateCard {...update} dateInRail />
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
