'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CalEmbed from '../../components/CalEmbed';
import { getProjectById, getNextProject, getPreviousProject } from '../../data/projects';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

// Component for individual image items
function ProjectImage({ image, projectTitle, index }: { image: { url: string; caption?: string; size: 'full' | 'two-thirds' | 'half' | 'third' }; projectTitle: string; index: number }) {
  const { ref, isVisible } = useScrollFadeIn();
  
  const sizeClasses = {
    'full': 'col-span-12',
    'two-thirds': 'col-span-12 md:col-span-8',
    'half': 'col-span-12 md:col-span-6',
    'third': 'col-span-12 md:col-span-4'
  };

  return (
    <div 
      ref={ref}
      className={`${sizeClasses[image.size]} scroll-fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="w-full overflow-hidden rounded-none">
        <img 
          src={image.url}
          alt={image.caption || `${projectTitle} image ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      {image.caption && (
        <p 
          className="mt-4 text-sm md:text-base text-gray-500"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          {image.caption}
        </p>
      )}
    </div>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const project = getProjectById(projectId);
  const nextProject = getNextProject(projectId);
  const previousProject = getPreviousProject(projectId);

  const { ref: titleRef, isVisible: titleVisible } = useScrollFadeIn();
  const { ref: introRef, isVisible: introVisible } = useScrollFadeIn();

  // Set page title
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Ali Ahunbáev`;
    }
  }, [project]);

  // Touch handling for swipe gestures
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && nextProject) {
      router.push(`/work/${nextProject.id}`);
    }
    if (isRightSwipe && previousProject) {
      router.push(`/work/${previousProject.id}`);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && previousProject) {
        router.push(`/work/${previousProject.id}`);
      } else if (e.key === 'ArrowRight' && nextProject) {
        router.push(`/work/${nextProject.id}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previousProject, nextProject, router]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link href="/" className="text-black underline">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Navbar />
      
      <main>
        {/* Header/Hero Section */}
        <section className="px-4 py-24 md:py-32">
          <div 
            ref={titleRef}
            className={`scroll-fade-in ${titleVisible ? 'visible' : ''}`}
          >
            {/* Project Title and Subheader */}
            <div className="flex flex-col md:flex-row md:gap-2 gap-0">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl text-black font-medium tracking-tight"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                {project.title}.{' '}
              </h1>
              <span 
                className="text-3xl md:text-4xl lg:text-5xl text-gray-400 font-medium tracking-tight"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                {project.headerText}
              </span>
            </div>
          </div>
        </section>

        {/* Cover Image and Introduction */}
        <section className="px-4 pb-16 md:pb-24">
          <div 
            ref={introRef}
            className={`md:scroll-fade-in ${introVisible ? 'visible' : ''} max-w-6xl`}
          >
            <div className="flex flex-col lg:flex-row gap-4 md:gap-4">
              {/* Cover Image */}
              <div className="w-full lg:w-[70%]">
                <div className="aspect-[5/3] w-full overflow-hidden rounded-2xl">
                  <img 
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

                {/* Text Content and Metadata */}
                <div className="w-full lg:w-[30%] flex flex-col gap-4">
                  {/* Introduction Text in White Div */}
                  <div className="bg-white rounded-2xl p-4 md:p-3 flex" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.06)' }}>
                    <p 
                      className="text-base text-gray-700 leading-normal"
                      style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                    >
                      {project.introText}
                    </p>
                  </div>
                
                {/* Metadata: Services & Link */}
                <div className="flex flex-row gap-8 md:gap-12">
                  {/* Services */}
                  <div className="flex-1">
                    <h4 
                      className="text-xs text-gray-400 uppercase tracking-widest mb-4"
                      style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif' }}
                    >
                      Services
                    </h4>
                    <div className="space-y-2">
                      {project.services.map((service, index) => (
                        <div 
                          key={index}
                          className="text-sm text-black leading-relaxed"
                          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                        >
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Website Link */}
                  {project.websiteUrl && (
                    <div className="flex-1">
                      <h4 
                        className="text-xs text-gray-400 uppercase tracking-widest mb-4"
                        style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif' }}
                      >
                        Website
                      </h4>
                      <a 
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-black leading-relaxed underline hover:no-underline inline-block break-all"
                        style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                      >
                        {project.websiteUrl.replace(/^https?:\/\//, '')}
                      </a>
                      {project.instagramUrl && (
                        <>
                          <br />
                          <a 
                            href={project.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-black leading-relaxed underline hover:no-underline inline-block mt-2"
                            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                          >
                            @{project.instagramUrl.replace('https://instagram.com/', '')}
                          </a>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Grid */}
        <section className="pb-16 md:pb-24">
          {project.images.map((image, index) => {
            const isFirstOrLast = index === 0 || index === project.images.length - 1;
            const isFullWidth = image.size === 'full';
            const shouldBeFullBleed = isFirstOrLast && isFullWidth;

            if (shouldBeFullBleed) {
              return (
                <div key={index} className="w-full mb-4">
                  <img 
                    src={image.url}
                    alt={image.caption || `${project.title} image ${index + 1}`}
                    className="w-full h-auto"
                  />
                  {image.caption && (
                    <p 
                      className="mt-4 px-4 text-sm md:text-base text-gray-500"
                      style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                    >
                      {image.caption}
                    </p>
                  )}
                </div>
              );
            }

            return null;
          })}
          
          <div className="px-4">
            <div className="grid grid-cols-12 gap-4">
              {project.images.map((image, index) => {
                const isFirstOrLast = index === 0 || index === project.images.length - 1;
                const isFullWidth = image.size === 'full';
                const shouldBeFullBleed = isFirstOrLast && isFullWidth;

                if (shouldBeFullBleed) return null;

                return (
                  <ProjectImage 
                    key={index}
                    image={image}
                    projectTitle={project.title}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Showcase Sections */}
        {project.showcaseSections && project.showcaseSections.map((section, sectionIndex) => {
          const hasGridBackground = section.hasGridBackground !== false; // Default true
          const useGridLayout = section.useGridLayout === true;
          
          return (
            <section key={sectionIndex} className="px-4 pb-16 md:pb-24">
              {/* Section Header */}
              <div className="mb-4 md:mb-4">
                <h3 
                  className="text-lg md:text-xl text-gray-400 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                >
                  {section.title}
                </h3>
              </div>
              
              {useGridLayout ? (
                // Grid layout - images expand to fill width
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {section.images.map((showcaseImage, index) => {
                    const isLastImage = index === section.images.length - 1;
                    const isHardtokillLastSection = project.id === 'hardtokill' && section.title === 'CURATED SITE PHOTOGRAPHY';
                    
                    return (
                    <div key={index} className={`flex flex-col ${isLastImage && isHardtokillLastSection ? 'col-span-2' : ''}`}>
                      <div 
                        className="w-full rounded-xl overflow-hidden"
                        style={{ 
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                        }}
                      >
                        {showcaseImage.urlMobile && (
                          <img 
                            src={showcaseImage.urlMobile}
                            alt={showcaseImage.caption}
                            className="w-full lg:hidden h-auto"
                          />
                        )}
                        <img 
                          src={showcaseImage.url}
                          alt={showcaseImage.caption}
                          className={`w-full h-auto ${showcaseImage.urlMobile ? 'hidden lg:block' : ''}`}
                        />
                      </div>
                      <p 
                        className="mt-4 text-sm text-gray-600 whitespace-pre-line"
                        style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                      >
                        {showcaseImage.caption}
                      </p>
                    </div>
                    );
                  })}
                </div>
              ) : (
                // Centered flex layout with fixed heights
                <div 
                  className={`w-full ${hasGridBackground ? 'px-8 md:px-16 py-16 md:py-20 rounded-2xl' : 'py-8'}`}
                  style={hasGridBackground ? {
                    background: '#f8f9fa',
                    backgroundImage: `
                      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: 'center center'
                  } : {}}
                >
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center md:items-start flex-wrap">
                    {section.images.map((showcaseImage, index) => (
                      <div key={index} className="flex flex-col items-center w-full md:w-auto">
                        <div 
                          className="w-full md:w-auto rounded-xl overflow-hidden"
                          style={{ 
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                          }}
                        >
                          {showcaseImage.urlMobile && (
                            <img 
                              src={showcaseImage.urlMobile}
                              alt={showcaseImage.caption}
                              className="w-full lg:hidden h-auto"
                            />
                          )}
                          <img 
                            src={showcaseImage.url}
                            alt={showcaseImage.caption}
                            className={`w-full lg:w-auto lg:h-80 h-auto ${showcaseImage.urlMobile ? 'hidden lg:block' : ''}`}
                          />
                        </div>
                        <p 
                          className="mt-4 text-sm text-gray-600 text-center whitespace-pre-line"
                          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                        >
                          {showcaseImage.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}


        {/* Project Navigation */}
        <section className="px-4 py-16 md:py-24">
          <div className="flex flex-row justify-end">
            {/* Next Project */}
            {nextProject && (
              <Link 
                href={`/work/${nextProject.id}`}
                className="group flex items-center gap-2"
              >
                <h3 
                  className="text-xl md:text-2xl text-black"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                >
                  {nextProject.title}
                </h3>
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-16 md:pt-24 lg:px-4">
          <CalEmbed />
        </section>
      </main>
      <Footer />
    </div>
  );
}
