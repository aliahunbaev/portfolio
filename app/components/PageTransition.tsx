'use client';

import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50); // Small delay to ensure smooth transition

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-opacity duration-600 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
}

