'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CalEmbed from '../../components/CalEmbed';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

interface Essay {
  slug: string;
  title: string;
  date: string;
  content: string;
}

interface EssayContentProps {
  essay: Essay;
  nextEssay: Essay | null;
  previousEssay: Essay | null;
}

export default function EssayContent({ essay, nextEssay, previousEssay }: EssayContentProps) {
  const router = useRouter();
  const { ref: titleRef, isVisible: titleVisible } = useScrollFadeIn();
  const { ref: contentRef, isVisible: contentVisible } = useScrollFadeIn();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Touch handling for swipe gestures
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
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

    if (isLeftSwipe && nextEssay) {
      router.push(`/writing/${nextEssay.slug}`);
    }
    if (isRightSwipe && previousEssay) {
      router.push(`/writing/${previousEssay.slug}`);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && previousEssay) {
        router.push(`/writing/${previousEssay.slug}`);
      } else if (e.key === 'ArrowRight' && nextEssay) {
        router.push(`/writing/${nextEssay.slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previousEssay, nextEssay, router]);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <main>
        {/* Header Section */}
        <section className="px-4 py-24 md:py-32">
          <div 
            ref={titleRef}
            className={`max-w-3xl mx-auto scroll-fade-in ${titleVisible ? 'visible' : ''}`}
          >
            {/* Back to Writing Link */}
            <Link 
              href="/writing"
              className="inline-flex items-center gap-2 mb-8 text-gray-400 hover:text-black transition-colors"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span 
                className="text-sm uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif' }}
              >
                Back to Writing
              </span>
            </Link>

            {/* Essay Title */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl text-black mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {essay.title}
            </h1>
            
            {/* Essay Date */}
            <time 
              className="text-sm md:text-base text-gray-400 uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif' }}
              dateTime={essay.date}
            >
              {formatDate(essay.date)}
            </time>
          </div>
        </section>

        {/* Essay Content */}
        <section className="px-4 pb-16 md:pb-24">
          <div 
            ref={contentRef}
            className={`max-w-3xl mx-auto scroll-fade-in ${contentVisible ? 'visible' : ''}`}
          >
            <article 
              className="prose prose-lg max-w-none essay-content"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: essay.content }}
            />
          </div>
        </section>

        {/* Essay Navigation */}
        <section className="px-4 py-16 md:py-24 border-t border-gray-200">
          <div className="max-w-3xl mx-auto flex flex-row justify-between gap-8">
            {/* Previous Essay */}
            {previousEssay ? (
              <Link 
                href={`/writing/${previousEssay.slug}`}
                className="flex-1 group flex items-center gap-2"
              >
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
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <div>
                  <p 
                    className="text-xs text-gray-400 uppercase tracking-widest mb-1"
                    style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif' }}
                  >
                    Previous
                  </p>
                  <h3 
                    className="text-lg md:text-xl text-black"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                  >
                    {previousEssay.title}
                  </h3>
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}

            {/* Next Essay */}
            {nextEssay ? (
              <Link 
                href={`/writing/${nextEssay.slug}`}
                className="flex-1 group flex items-center justify-end gap-2 text-right"
              >
                <div>
                  <p 
                    className="text-xs text-gray-400 uppercase tracking-widest mb-1"
                    style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif' }}
                  >
                    Next
                  </p>
                  <h3 
                    className="text-lg md:text-xl text-black"
                    style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                  >
                    {nextEssay.title}
                  </h3>
                </div>
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
            ) : (
              <div className="flex-1"></div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-16 md:pt-24 lg:px-4">
          <CalEmbed />
        </section>
      </main>
    </div>
  );
}

