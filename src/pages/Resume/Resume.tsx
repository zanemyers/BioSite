import React from 'react';
import Header from '../../components/Header.tsx';
import Footer from '../../components/Footer.tsx';
import JobEntry from "../../components/JobEntry.tsx";
import { Calendar, Download, MapPin, Mail, Phone, Globe } from 'lucide-react';
import { jobs, volunteering } from "./jobEntries.ts"

const frontendSkills = ["React", "Vue.js", "TypeScript", "Javascript", "HTML", "CSS", "Bootstrap 5", ];
const backendSkills = ["Python", "Django", "Node.js", "Express.js", "Rest APIs", "PostgreSQL", "MySQL"];
const otherSkills = ["Git", "Docker", "Playwright", "Just"]
const interests = ["Web Development", "App Development (IOS)", "AI Integrations", "Mentorship & Personal Development", "International Missions & Travel"]

const skillColorMap = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
  green: { bg: 'bg-green-100', text: 'text-green-800' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-800' },
} as const;

interface SkillProps {
  color: "blue" | "green" | "purple";
  title: string;
  skills: string[],
}

const SkillSection = (props: SkillProps) => {
  const color = skillColorMap[props.color] || skillColorMap.blue;

  return (
    <div>
      <h3 className="font-semibold text-card-foreground mb-3">{props.title}</h3>
      <div className="flex flex-wrap gap-2">
        {props.skills.map((skill) => (
            <span key={skill} className={`px-3 py-1 ${color.bg} ${color.text} text-sm rounded-full`}>
              {skill}
            </span>
        ))}
      </div>
    </div>
  )
}

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
                <a
                    href="/zm-resume.pdf"
                    download
                    className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download PDF</span>
                </a>

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
                    St. George, KS
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
              <p className="text-muted-foreground mt-4 text-sm italic">
                References available upon request
              </p>
            </div>

            {/* Professional Summary */}
            <section className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Professional Summary</h2>
              <p className="text-muted-foreground leading-relaxed">
                Software developer with 2+ years of full-stack experience building web applications
                using Python, Django, Vue.js, React, and Node.js. Experienced in automating workflows,
                integrating Al tools, and maintaining CI/CD pipelines. Proven collaborator with a passion
                for clean, maintainable code, mentorship, and user-focused design.
              </p>
            </section>

            {/* Experience */}
            <section className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Professional Experience</h2>

              <div className="space-y-8">
                {jobs.filter(j => !j.olderExperience).map(job => <JobEntry key={job.title} {...job}/>)}

                <details className="mt-6">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-card-foreground">
                    Older Experience
                  </summary>

                  {jobs.filter(j => j.olderExperience).map(job => <JobEntry key={job.title} {...job}/>)}
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
                {volunteering.map(v => (<JobEntry key={v.title} {...v}/>))}
              </div>
            </section>

            {/* Interests */}
            <section className="bg-card shadow-lg rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm rounded-full">
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