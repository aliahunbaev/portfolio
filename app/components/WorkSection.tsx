'use client';

import Link from 'next/link';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { projects, Project } from '../data/projects';

interface ProjectItemProps {
  project: Project;
  index: number;
}

function ProjectItem({ project, index }: ProjectItemProps) {
  const { ref, isVisible } = useScrollFadeIn();
  
  return (
    <Link 
      href={`/work/${project.id}`}
      className="group cursor-pointer"
    >
      {/* Project Image */}
      <div className="aspect-[4/3] mb-4 transition-all duration-150 group-hover:rounded-2xl overflow-hidden">
        <img 
          src={project.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Project Title */}
      <h3 
        ref={ref}
        className={`text-2xl md:text-3xl text-black tracking-tight scroll-fade-in ${isVisible ? 'visible' : ''} mb-2`}
        style={{ 
          fontFamily: 'var(--font-lora), Georgia, serif',
          transitionDelay: `${index * 0.1}s`
        }}
      >
        {project.title}
      </h3>
      
      {/* Project Subtitle */}
      <p 
        className="text-xs md:text-sm text-gray-400 uppercase tracking-widest"
        style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
      >
        {project.subtitle}
      </p>
    </Link>
  );
}

export default function WorkSection() {
  return (
    <section className="px-6 md:px-8 py-16 md:py-24">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="mb-4 md:mb-6">
          <h2 
            className="text-lg md:text-xl text-gray-400 uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
          >
            RECENT WORKS
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
