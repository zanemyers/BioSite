import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkillCard from '../components/SkillsCard';
import { Download, MapPin, Calendar } from 'lucide-react';

const frontendSkills = [
  { name: 'React', level: 60 },
  { name: 'TypeScript', level: 65 },
  { name: 'HTML', level: 90 },
  { name: 'Bootstrap 5', level: 80 },
];

const backendSkills = [
  { name: 'Node.js', level: 75 },
  { name: 'Python', level: 85 },
  { name: 'PostgreSQL', level: 70 },
  { name: 'REST API', level: 80 },
];

const otherTools = [
  { name: 'Playwright', level: 85 },
  { name: 'Git', level: 85 },
  { name: 'Docker', level: 60 },
];


export default function Home() {
  return (
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="bg-blue-50 dark:bg-blue-950 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Hi, I'm <span className="text-blue-600">Zane Myers</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A developer and problem solver who enjoys learning new technologies and building things that are genuinely useful.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="/zm-resume.pdf"
                        download
                        className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Download size={18} />
                      <span>Download Resume</span>
                    </a>
                    <a href="mailto:zane15myers@gmail.com">
                      <button className="border border-border text-foreground px-6 py-3 rounded-lg bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
                        Get In Touch
                      </button>
                    </a>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                    <img
                        src="/about_me/profile.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                      src="/about_me/about_me.jpg"
                      alt="My Family"
                      className="rounded-lg shadow-lg"
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-foreground">About Me</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    I’m a software developer who enjoys turning messy problems into clean, reliable solutions.
                    My work focuses on building data-driven tools and web applications, often combining backend systems
                    with thoughtful frontend experiences to make complex information usable.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Outside of work, I enjoy exploring new places, digging into emerging technologies,
                    and spending time with my family. I’m motivated by learning, enjoy a good challenge,
                    and like pushing myself to build things that are both practical and well-crafted.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center space-x-3">
                      <MapPin size={20} className="text-blue-600" />
                      <span className="text-foreground">Manhattan, Kansas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar size={20} className="text-blue-600" />
                      <span className="text-foreground">Available for work</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Skills & Expertise</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A diverse set of skills accumulated through years of experience and continuous learning.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <SkillCard name="Frontend Development" skills={frontendSkills} color="bg-blue-600" />
                <SkillCard name="Backend Development" skills={backendSkills} color="bg-green-600" />
                <SkillCard name="Design & Tools" skills={otherTools} color="bg-purple-600" />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}