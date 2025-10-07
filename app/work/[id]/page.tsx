'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
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
        <section className="px-6 md:px-8 py-24 md:py-32">
          <div 
            ref={titleRef}
            className={`scroll-fade-in ${titleVisible ? 'visible' : ''}`}
          >
            {/* Project Title and Subheader */}
            <div>
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl text-black font-medium inline tracking-tight"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: 600 }}
              >
                {project.title}.{' '}
              </h1>
              <span 
                className="text-3xl md:text-4xl lg:text-5xl text-gray-400 font-medium inline tracking-tight"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: 600 }}
              >
                {project.headerText}
              </span>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        <section className="px-6 md:px-8 pb-16 md:pb-24">
          <div className="w-full aspect-[16/10] overflow-hidden rounded-none">
            <img 
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Introduction Text and Services */}
        <section className="px-6 md:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto">
            <div 
              ref={introRef}
              className={`md:scroll-fade-in ${introVisible ? 'visible' : ''}`}
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Introduction Text */}
                <div className="flex-1">
                  <p 
                    className="text-xl md:text-2xl lg:text-3xl text-black leading-relaxed tracking-tight"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                  >
                    {project.introText}
                  </p>
                </div>
                
                {/* Services List */}
                <div className="md:w-80 flex-shrink-0">
                  <h3 
                    className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-4"
                    style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                  >
                    SERVICES
                  </h3>
                  <ul className="space-y-2">
                    {project.services.map((service, index) => (
                      <li 
                        key={index}
                        className="text-base md:text-lg text-black"
                        style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Grid */}
        <section className="px-6 md:px-8 pb-16 md:pb-24">
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {project.images.map((image, index) => (
              <ProjectImage 
                key={index}
                image={image}
                projectTitle={project.title}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Project Navigation */}
        <section className="px-6 md:px-8 py-16 md:py-24 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Previous Project */}
            {previousProject && (
              <Link 
                href={`/work/${previousProject.id}`}
                className="flex-1 group"
              >
                <p 
                  className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-4"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                >
                  ← PREVIOUS PROJECT
                </p>
                <h3 
                  className="text-2xl md:text-3xl text-black"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                >
                  {previousProject.title}
                </h3>
                <p 
                  className="text-base md:text-lg text-gray-500 mt-2"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  {previousProject.subtitle}
                </p>
              </Link>
            )}

            {/* Next Project */}
            {nextProject && (
              <Link 
                href={`/work/${nextProject.id}`}
                className="flex-1 group text-left md:text-right"
              >
                <p 
                  className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-4"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                >
                  NEXT PROJECT →
                </p>
                <h3 
                  className="text-2xl md:text-3xl text-black"
                  style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                >
                  {nextProject.title}
                </h3>
                <p 
                  className="text-base md:text-lg text-gray-500 mt-2"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  {nextProject.subtitle}
                </p>
              </Link>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-8 py-16 md:py-24">
          <div className="mx-auto">
            <div className="bg-black rounded-2xl aspect-[4/3] md:aspect-[8/3] md:h-auto flex flex-col justify-center items-center px-6 py-16 md:p-12 text-center">
              {/* Title */}
              <h3 
                className="text-4xl md:text-5xl lg:text-6xl text-white mb-12 font-medium"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                Let&apos;s make some magic.
              </h3>

              {/* Buttons */}
              <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 md:justify-center">
                {/* Primary Button */}
                <a 
                  href="https://cal.com/ahunbaev/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto md:flex-1 md:max-w-xs bg-white text-black py-3 md:py-2 px-6 rounded-full font-medium text-lg md:text-base uppercase flex items-center justify-center"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                >
                  BOOK A CALL
                </a>

                {/* Secondary Button */}
                <button 
                  className="w-full md:w-auto md:flex-1 md:max-w-xs border-2 border-white text-white py-3 md:py-2 px-6 rounded-full font-medium text-lg md:text-base uppercase"
                  style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
                >
                  PROJECT FORM
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
