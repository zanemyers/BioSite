import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const  ProjectCard = (props: Props) => {
  return (
      <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video overflow-hidden">
          <img
              src={props.image}
              alt={props.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-2">{props.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{props.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {props.technologies.map((tech) => (
                <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
              {tech}
            </span>
            ))}
          </div>

          <div className="flex space-x-4">
            {props.githubUrl && (
                <a
                    href={props.githubUrl}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-card-foreground transition-colors"
                    aria-label={`View ${props.title} on GitHub`}
                >
                  <Github size={18} />
                  <span className="text-sm">Code</span>
                </a>
            )}
            {props.liveUrl && (
                <a
                    href={props.liveUrl}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label={`View ${props.title} live demo`}
                >
                  <ExternalLink size={18} />
                  <span className="text-sm">Live Demo</span>
                </a>
            )}
          </div>
        </div>
      </div>
  );
};

export default ProjectCard;