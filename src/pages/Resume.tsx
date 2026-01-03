import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Download, Calendar, MapPin, Mail, Phone, Globe } from 'lucide-react';

const frontendSkills = ["React", "Vue.js", "TypeScript", "Javascript", "HTML", "CSS", "Bootstrap 5", ];
const backendSkills = ["Python", "Django", "Node.js", "Express.js", "Rest APIs", "PostgreSQL", "MySQL"];
const otherSkills = ["Git", "Docker", "Playwright", "Just"]
const interests = ["Web Development", "App Development (IOS)", "AI Integrations", "Mentorship & Personal Development", "International Missions & Travel"]

interface JobProps {
  color: string;
  title: string;
  company: string;
  from: string;
  to: string;
  location: string;
  children?: React.ReactNode
}

const JobEntry = (props: JobProps) => (
    <div className="space-y-6 mt-4">
      <div className={`border-l-4 pl-6 border-${props.color}-600`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold text-card-foreground">{props.title}</h3>
            <p className={`text-${props.color}-600 font-medium`}>{props.company}</p>
          </div>
          <div className="flex flex-col text-muted-foreground text-sm mt-1 md:mt-0 md:items-end">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1 shrink-0" />
              <span>{props.from} – {props.to}</span>
            </div>
            <div className="mt-0.5">{props.location}</div>
          </div>
        </div>
        <ul className="list-disc list-outside text-muted-foreground space-y-2 mt-3">
          {props.children}
        </ul>
      </div>
    </div>
)

interface SkillProps {
  color: string;
  title: string;
  skills: string[],
}

const SkillSection = (props: SkillProps) => (
    <div>
      <h3 className="font-semibold text-card-foreground mb-3">{props.title}</h3>
      <div className="flex flex-wrap gap-2">
        {props.skills.map((skill) => (
            <span key={skill} className={`px-3 py-1 bg-${props.color}-100 text-${props.color}-800 text-sm rounded-full`}>
              {skill}
            </span>
        ))}
      </div>
    </div>
)

export default function Resume() {
  return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-card-foreground mb-2">Zane Myers</h1>
                  <p className="text-xl text-muted-foreground">Software Engineer</p>
                </div>
                <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Download size={18} />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground w-full">
                <div className="flex items-center gap-2 flex-1 min-w-[220px]">
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <Mail size={16} />
                  </span>
                  <span className="whitespace-nowrap">
                    zane15myers@gmail.com
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-[180px]">
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <Phone size={16} />
                  </span>
                  <span className="whitespace-nowrap">
                    +1 (620) 504-2094
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-[160px]">
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </span>
                  <span className="whitespace-nowrap">
                    Manhattan, KS
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-[120px]">
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <Globe size={16} />
                  </span>
                  <span className="whitespace-nowrap">
                    zm1.org
                  </span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <section className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Professional Summary</h2>
              <p className="text-muted-foreground leading-relaxed">
                Software developer with 2+ years of full-stack experience building web applications
                using Django, Vue.js, React, and Node.js. Experienced in automating workflows,
                integrating Al tools, and maintaining CI/CD pipelines. Proven collaborator with a passion
                for clean, maintainable code, mentorship, and user-focused design.
              </p>
            </section>

            {/* Experience */}
            <section className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Professional Experience</h2>

              <div className="space-y-8">
                <JobEntry color="blue" title="Software Engineer (Volunteer)" company="Rescue River" from="Mar 2025" to="Nov 2025" location="Kampala, Uganda">
                  <li>
                    Built a full-stack Node/Express.js and React app with an intuitive interface that made scraper management and data automation accessible to non-technical users.
                  </li>
                  <li>
                    Developed a Playwright scraper to collect sales and marketing data from 100+ Google Maps listings per run, with location targeting and structured Excel exports.
                  </li>
                  <li>
                    Engineered a fishing report aggregator with Excel input, Playwright scraping, and AI summarization, reducing hours of manual gathering into minutes.
                  </li>
                  <li>
                    Developed a comparison utility to align scraper outputs and inputs, closing data gaps.
                  </li>
                  <li>
                    Authored setup and usage docs to streamline on-boarding and maintenance.
                  </li>
                </JobEntry>

                <JobEntry color="green" title="Software Engineer" company="Canopy" from="Feb 2023" to="Jan 2025" location="Manhattan, Kansas">
                  <li>
                    Helped design, build, and maintain a multi-sheet Excel import feature in Django/ Python, simplifying bulk data entry and automating manual workflows.
                  </li>
                  <li>
                    Diagnosed and optimized SQL queries and API responses, achieving sub-second average page load times.
                  </li>
                  <li>
                    Collaborated with product managers and client success teams to refine workflows and resolve critical bugs, improving overall user experience.
                  </li>
                  <li>
                    Engaged in weekly peer code reviews and provided constructive feedback, strengthening overall code quality and accelerating feature delivery.
                  </li>
                  <li>
                    Mentored a student developer through weekly code reviews and pair programming, supporting their growth both as a software engineer and a professional.
                  </li>
                </JobEntry>

                <JobEntry color="purple" title="Ministry Intern" company="Student Mobilization" from="June 2022" to="July 2022" location="Manhattan, Kansas">
                  <li>
                    Organized 5+ community events with (20–30 participants each) with a collaborative team.
                  </li>
                  <li>
                    Fostered relationships with 10-20 college students through weekly texts, meetups, and faith-based conversations.
                  </li>
                </JobEntry>

                <details className="mt-6">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-card-foreground">
                    Older Experience
                  </summary>

                  <JobEntry color="blue" title="Crew Member" company="Cold Stone Creamery" from="Mar 2022" to="Oct 2022" location="Manhattan, Kansas">
                    <li>Served 50+ customers nightly with fast, friendly service.</li>
                  </JobEntry>

                  <JobEntry color="green" title="Community Assistant" company="Kansas State University" from="Aug 2019" to="May 2022" location="Manhattan, Kansas">
                    <li>Provided essential daily and emergency support to 500+ residents.</li>
                  </JobEntry>
                </details>

              </div>
            </section>

            {/* Education */}
            <section className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Education</h2>

              <div className="border-l-4 border-blue-600 pl-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">Bachelor of Science in Computer Science</h3>
                    <p className="text-blue-600 font-medium">Kansas State University</p>
                  </div>
                  <div className="flex flex-col text-muted-foreground text-sm mt-1 md:mt-0 md:items-end">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1 shrink-0" />
                      <span>Aug 2018 – Dec 2022</span>
                    </div>
                    <div className="mt-0.5">Manhattan, Kansas</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkillSection color="blue" title="Frontend" skills={frontendSkills}/>
                <SkillSection color="green" title="Backend" skills={backendSkills}/>
                <SkillSection color="purple" title="Tools & Other " skills={otherSkills}/>
              </div>
            </section>

            {/* Volunteering */}
            <section className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Volunteering</h2>

              <div className="space-y-8">
                <JobEntry color="blue" title="Therapy Technician" company="Hope Speaks" from="June 2025" to="July 2025" location="Kampala, Uganda">
                  <li>Assisted speech therapist with toileting children and transporting them between sessions.</li>
                  <li>Computed averages from session data to assist in progress tracking.</li>
                  <li>Engaged children in play-based therapy activities.</li>
                </JobEntry>

                <JobEntry color="green" title="Youth Leader" company="Faith Manhattan Church" from="Sep 2019" to="Jan 2025" location="Manhattan, Kansas">
                  <li>Facilitated weekly high school small group discussions.</li>
                  <li>Led and supported preschool Sunday school.</li>
                  <li>Participated as an adult sponsor on a mission trip to Ghana.</li>
                </JobEntry>
              </div>
            </section>

            {/* Interests */}
            <section className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((skill) => (
                    <span key={skill} className={`px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full`}>
                      {skill}
                    </span>
                ))}
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
  );
}