import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const projects = [
    {
      title: 'Flybox',
      description: 'A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and order processing.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      githubUrl: 'https://github.com/zanemyers/Flybox',
      liveUrl: 'https://flybox.zm1.org'
    },
    {
      title: 'Placeholder',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['React', 'TypeScript', 'Socket.io', 'MongoDB', 'Express'],
      githubUrl: '#',
      liveUrl: '#'
    },
  ];

  return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">My Projects</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A collection of projects that showcase my skills in full-stack development,
                design, and problem-solving. Each project represents a unique challenge and learning experience.
              </p>
            </div>

            {/* Featured Project */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">Featured Project</h2>
              <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto">
                    <img
                        src={projects[0].image}
                        alt={projects[0].title}
                        className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-card-foreground mb-4">{projects[0].title}</h3>
                    <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                      {projects[0].description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[0].technologies.map((tech) => (
                          <span
                              key={tech}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                        {tech}
                      </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a
                          href={projects[0].githubUrl}
                          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        View Code
                      </a>
                      <a
                          href={projects[0].liveUrl}
                          className="border border-border text-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* All Projects Grid */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-8">All Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(1).map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        technologies={project.technologies}
                        githubUrl={project.githubUrl}
                        liveUrl={project.liveUrl}
                    />
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="mt-16 text-center">
              <div className="bg-blue-600 text-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  I'm always open to discussing new opportunities and interesting projects.
                  Let's connect and see how we can create something amazing together.
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get In Touch
                </button>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
  );
}