import { FiClock } from 'react-icons/fi';
import { Clause } from '../components/ui/Clause';
import Reveal from '../components/ui/Reveal';

export default function Privacy() {
  return (
    <section
      aria-labelledby="privacy-title"
      className="mx-auto max-w-4xl px-4 pt-14 pb-20 sm:px-6 md:pt-20 md:pb-28 lg:px-8"
    >
      <Reveal>
        <span className="chip">
          <FiClock size={12} aria-hidden="true" />
          Last updated: January 2026
        </span>
        <h1
          id="privacy-title"
          className="mt-5 text-4xl font-semibold tracking-tight text-foreground text-balance md:text-6xl"
        >
          Privacy Policy
        </h1>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <div className="panel p-6 sm:p-8 md:p-10">
          <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
            This website is a personal portfolio and informational site. It does not collect, store,
            or process personal data from visitors.
          </p>

          <div aria-hidden="true" className="my-8 hairline" />

          <div className="space-y-8">
            <Clause title="Information Collection">
              <p>
                No contact forms, account creation, email subscriptions, or data submissions are
                present on this website. Visitors are not asked to provide any personal information.
              </p>
            </Clause>

            <Clause title="Cookies & Tracking">
              <p>
                This website does not use cookies, tracking pixels, or analytics tools to monitor
                visitor behavior.
              </p>
            </Clause>

            <Clause title="Third-Party Services">
              <p>
                This website does not integrate with third-party services that collect personal data
                from visitors.
              </p>
            </Clause>

            <Clause title="Changes to This Policy">
              <p>
                If the functionality of this website changes in the future, this Privacy Policy will
                be updated accordingly.
              </p>
            </Clause>
          </div>
        </div>

        <div aria-hidden="true" className="mt-12 hairline" />
      </Reveal>
    </section>
  );
}
