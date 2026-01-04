    import React from "react";
    import Header from "../components/Header.tsx";
    import Footer from "../components/Footer.tsx";

    export default function Privacy() {
        return (
            <div className="flex flex-col min-h-screen bg-background">
                <Header />

                <main className="flex-1 py-20 px-4 max-w-3xl mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold text-foreground mb-2">
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-muted-foreground mb-10">
                            Last updated: January 2026
                        </p>

                        <section className="space-y-6 text-foreground leading-relaxed">
                            <p>
                                This website is a personal portfolio and informational site. It does
                                not collect, store, or process personal data from visitors.
                            </p>

                            <div>
                                <h2 className="text-xl font-semibold mb-2">
                                    Information Collection
                                </h2>
                                <p>
                                    No contact forms, account creation, email subscriptions, or data
                                    submissions are present on this website. Visitors are not asked to
                                    provide any personal information.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-2">
                                    Cookies & Tracking
                                </h2>
                                <p>
                                    This website does not use cookies, tracking pixels, or analytics
                                    tools to monitor visitor behavior.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-2">
                                    Third-Party Services
                                </h2>
                                <p>
                                    This website does not integrate with third-party services that
                                    collect personal data from visitors.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-2">
                                    Changes to This Policy
                                </h2>
                                <p>
                                    If the functionality of this website changes in the future, this
                                    Privacy Policy will be updated accordingly.
                                </p>
                            </div>
                        </section>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }