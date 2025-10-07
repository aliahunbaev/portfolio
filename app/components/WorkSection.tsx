'use client';

import Link from 'next/link';
import { projects } from '../data/projects';

export default function WorkSection() {

  return (
    <section className="px-4 py-16 md:py-24">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-6">
          {projects.map((project) => {
            return (
              <Link 
                key={project.id} 
                href={`/work/${project.id}`}
                className="group cursor-pointer"
              >
                {/* Project Image */}
                <div className="aspect-[3/4] mb-3 rounded-2xl transition-all duration-150 overflow-hidden">
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Project Title */}
                <h3 
                  className="text-base md:text-lg text-black tracking-tight mb-1"
                  style={{ 
                    fontFamily: 'var(--font-lora), Georgia, serif'
                  }}
                >
                  {project.title}
                </h3>
                
                {/* Project Subtitle */}
                <p 
                  className="text-xs text-gray-400 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif' }}
                >
                  {project.subtitle}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
