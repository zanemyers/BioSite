import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkillCard from '../components/SkillsCard';
import { Download, MapPin, Calendar } from 'lucide-react';

const frontendSkills = ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'];
const backendSkills = ['Node.js', 'Python', 'PostgreSQL', 'AWS'];
const designTools = ['Figma', 'Adobe Creative Suite', 'Git', 'Docker'];

export default function Home() {
  return (
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Hi, I'm <span className="text-blue-600">Zane Myers</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A passionate developer, designer, and problem solver creating meaningful digital experiences.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Download size={20} />
                      <span>Download Resume</span>
                    </button>
                    <button className="border border-border text-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors">
                      Get In Touch
                    </button>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
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
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                      alt="Working environment"
                      className="rounded-lg shadow-lg"
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-foreground">About Me</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm a dedicated professional with a passion for creating innovative solutions and meaningful connections.
                    With years of experience in technology and design, I bring a unique perspective to every project I work on.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When I'm not coding or designing, you can find me exploring new places, reading about emerging technologies,
                    or spending time with family and friends. I believe in continuous learning and always strive to push the
                    boundaries of what's possible.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center space-x-3">
                      <MapPin size={20} className="text-blue-600" />
                      <span className="text-foreground">Manhattan, KS</span>
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
                <SkillCard name="Design & Tools" skills={designTools} color="bg-purple-600" />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  );
}