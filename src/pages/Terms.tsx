import { FiClock } from 'react-icons/fi';
import { Clause, Item } from '../components/ui/Clause';
import Reveal from '../components/ui/Reveal';

export default function Terms() {
  return (
    <section
      aria-labelledby="terms-title"
      className="mx-auto max-w-4xl px-4 pt-14 pb-20 sm:px-6 md:pt-20 md:pb-28 lg:px-8"
    >
      <Reveal>
        <span className="chip">
          <FiClock size={12} aria-hidden="true" />
          Last updated: January 2026
        </span>
        <h1
          id="terms-title"
          className="mt-5 text-4xl font-semibold tracking-tight text-foreground text-balance md:text-6xl"
        >
          Terms of Service
        </h1>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <div className="panel p-6 sm:p-8 md:p-10">
          <div className="space-y-8">
            <Clause index="01" title="Purpose of the Site">
              <p>
                This website is a personal portfolio intended to share information about my work,
                projects, experiences, and interests. All content is provided for informational
                purposes only.
              </p>
            </Clause>

            <Clause index="02" title="Use of Content">
              <p>
                All content on this site, including text, images, and code samples, is owned by me
                unless otherwise stated.
              </p>

              <div className="space-y-2 border-l border-border pl-4">
                <p className="font-medium text-foreground">You may:</p>
                <ul className="space-y-2">
                  <Item>View and read the content for personal or professional reference.</Item>
                </ul>
              </div>

              <div className="space-y-2 border-l border-border pl-4">
                <p className="font-medium text-foreground">You may not:</p>
                <ul className="space-y-2">
                  <Item>
                    Reproduce, distribute, or use content for commercial purposes without
                    permission.
                  </Item>
                </ul>
              </div>
            </Clause>

            <Clause index="03" title="No Guarantees">
              <p>
                While I strive to keep information accurate and up to date, I make no guarantees
                about the completeness, reliability, or accuracy of any content on this site. Any
                reliance you place on the information provided is at your own risk.
              </p>
            </Clause>

            <Clause index="04" title="External Links">
              <p>
                This website may contain links to external websites. I am not responsible for the
                content, availability, or practices of those third-party sites.
              </p>
            </Clause>

            <Clause index="05" title="Limitation of Liability">
              <p>
                I am not liable for any losses or damages arising from the use of this website,
                including but not limited to indirect or consequential losses.
              </p>
            </Clause>

            <Clause index="06" title="Changes to These Terms">
              <p>
                I may update these Terms of Service at any time without prior notice. Changes will
                be reflected on this page with an updated revision date.
              </p>
            </Clause>

            <Clause index="07" title="Contact">
              <p>
                If you have questions about these Terms of Service, please reach out using the
                contact information provided on this website.
              </p>
            </Clause>
          </div>
        </div>

        <div aria-hidden="true" className="mt-12 hairline" />
      </Reveal>
    </section>
  );
}
