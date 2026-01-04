import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const projects = [
    {
      title: 'Flybox',
      description: 'Flybox collects and aggregates fly-fishing shop data by scraping Google Maps and individual shop websites. It outputs structured, analyzable datasets that highlight online sales, fishing reports, and digital presence.',
      image: '/project_images/flybox.png',
      technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Bootstrap 5', 'Just', 'Docker', 'SCSS'],
      githubUrl: 'https://github.com/zanemyers/Flybox',
      liveUrl: 'https://flybox.zm1.org'
    },
    {
      title: 'Budgeteer (WIP)',
      description: 'An Idea for how to do budgets better.',
      image: '/project_images/budgeteer.jpg',
      technologies: ['Python', 'Django', 'JavaScript', 'SCSS', 'Just', 'HTML'],
      githubUrl: 'https://github.com/zanemyers/Budgeteer',
    },
    {
      title: 'BioSite',
      description: "A website all about me! And guess what... you're already there!",
      image: '/project_images/bioSite.png',
      technologies: ['React', 'Typescript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/zanemyers/BioSite',
      liveUrl: 'https://zm1.org'
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
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Code
                      </a>
                      <a
                          href={projects[0].liveUrl}
                          className="border border-border text-foreground px-6 py-3 rounded-lg border-gray-300  hover:bg-gray-300 dark:hover:text-black transition-colors"
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
                <a href="mailto:zane15myers@gmail.com">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Get In Touch
                </button>
                </a>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
  );
}