import type { JobProps } from "../../components/JobEntry.tsx";

export const jobs: JobProps[] = [
    {
        color: "orange",
        title: "Application Developer",
        company: "Aprio",
        from: "Jan 2026",
        to: "Present",
        location: "Topeka, Kansas",
        olderExperience: false,
        experiences: [],
    },
    {
        color: "blue",
        title: "Software Engineer (Volunteer)",
        company: "Rescue River",
        from: "Mar 2025",
        to: "Nov 2025",
        location: "Kampala, Uganda",
        olderExperience: false,
        experiences: [
            "Built a full-stack Node/Express.js and React app with an intuitive interface that made scraper management and data automation accessible to non-technical users.",
            "Developed a Playwright scraper to collect sales and marketing data from 100+ Google Maps listings per run, with location targeting and structured Excel exports.",
            "Engineered a fishing report aggregator with Excel input, Playwright scraping, and AI summarization, reducing hours of manual gathering into minutes.",
            "Developed a comparison utility to align scraper outputs and inputs, closing data gaps.",
            "Authored setup and usage docs to streamline on-boarding and maintenance.",
        ],
    },
    {
        color: "green",
        title: "Software Engineer",
        company: "Canopy",
        from: "Feb 2023",
        to: "Jan 2025",
        location: "Manhattan, Kansas",
        olderExperience: false,
        experiences: [
            "Helped design, build, and maintain a multi-sheet Excel import feature in Django/Python, simplifying bulk data entry and automating manual workflows.",
            "Diagnosed and optimized SQL queries and API responses, achieving sub-second average page load times.",
            "Collaborated with product managers and client success teams to refine workflows and resolve critical bugs, improving overall user experience.",
            "Engaged in weekly peer code reviews and provided constructive feedback, strengthening overall code quality and accelerating feature delivery.",
            "Mentored a student developer through weekly code reviews and pair programming, supporting their growth as a software engineer and professional.",
        ],
    },
    {
        color: "purple",
        title: "Ministry Intern",
        company: "Student Mobilization",
        from: "June 2022",
        to: "July 2022",
        location: "Manhattan, Kansas",
        olderExperience: true,
        experiences: [
            "Organized 5+ community events with 20–30 participants each as part of a collaborative team.",
            "Fostered relationships with 10–20 college students through weekly texts, meetups, and faith-based conversations.",
        ],
    },
    {
        color: "red",
        title: "Crew Member",
        company: "Cold Stone Creamery",
        from: "Mar 2022",
        to: "Oct 2022",
        location: "Manhattan, Kansas",
        olderExperience: true,
        experiences: [
            "Served 50+ customers nightly with fast, friendly service.",
        ],
    },
    {
        color: "purple",
        title: "Community Assistant",
        company: "Kansas State University",
        from: "Aug 2019",
        to: "May 2022",
        location: "Manhattan, Kansas",
        olderExperience: true,
        experiences: [
            "Provided essential daily and emergency support to 500+ residents.",
        ],
    },
];

export const volunteering: JobProps[] = [
    {
        color: "blue",
        title: "Therapy Technician",
        company: "Hope Speaks",
        from: "June 2025",
        to: "July 2025",
        location: "Kampala, Uganda",
        olderExperience: true,
        experiences: [
            "Assisted speech therapist with toileting children and transporting them between sessions.",
            "Computed averages from session data to assist in progress tracking.",
            "Engaged children in play-based therapy activities.",
        ],
    },
    {
        color: "green",
        title: "Youth Leader",
        company: "Faith Manhattan Church",
        from: "Sep 2019",
        to: "Jan 2025",
        location: "Manhattan, Kansas",
        olderExperience: true,
        experiences: [
            "Facilitated weekly high school small group discussions.",
            "Led and supported preschool Sunday school.",
            "Participated as an adult sponsor on a mission trip to Ghana.",
        ],
    },
];