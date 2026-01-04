import React from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function Terms() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="min-h-screen bg-background py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                        Terms of Service
                    </h1>
                    <p className="text-sm text-muted-foreground mb-10">
                        Last updated: January 2026
                    </p>

                    <section className="space-y-6 text-foreground leading-relaxed">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">1. Purpose of the Site</h2>
                            <p>
                                This website is a personal portfolio intended to share information
                                about my work, projects, experiences, and interests. All content is
                                provided for informational purposes only.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">2. Use of Content</h2>
                            <div className="space-y-4">
                                <p>
                                    All content on this site, including text, images, and code samples,
                                    is owned by me unless otherwise stated.
                                </p>

                                <div>
                                    <p className="font-medium">You may:</p>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li>View and read the content for personal or professional reference.</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-medium">You may not:</p>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li>
                                            Reproduce, distribute, or use content for commercial purposes
                                            without permission.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">3. No Guarantees</h2>
                            <p>
                                While I strive to keep information accurate and up to date, I make
                                no guarantees about the completeness, reliability, or accuracy of
                                any content on this site. Any reliance you place on the information
                                provided is at your own risk.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">4. External Links</h2>
                            <p>
                                This website may contain links to external websites. I am not
                                responsible for the content, availability, or practices of those
                                third-party sites.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
                            <p>
                                I am not liable for any losses or damages arising from the use of
                                this website, including but not limited to indirect or
                                consequential losses.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">6. Changes to These Terms</h2>
                            <p>
                                I may update these Terms of Service at any time without prior
                                notice. Changes will be reflected on this page with an updated
                                revision date.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
                            <p>
                                If you have questions about these Terms of Service, please reach
                                out using the contact information provided on this website.
                            </p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}