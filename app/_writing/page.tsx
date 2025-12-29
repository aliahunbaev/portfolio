import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllEssays } from '../lib/essays';

export default async function WritingPage() {
  const essays = await getAllEssays();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Header Section */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto">
            <h1 
              className="text-lg md:text-xl text-gray-400 uppercase tracking-widest mb-12"
              style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif', letterSpacing: '0.05em' }}
            >
              WRITING
            </h1>

            {/* Essays List */}
            {essays.length === 0 ? (
              <p 
                className="text-xl text-gray-500"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                No essays yet. Check back soon.
              </p>
            ) : (
              <div className="space-y-8 md:space-y-12">
                {essays.map((essay) => (
                  <Link 
                    key={essay.slug}
                    href={`/writing/${essay.slug}`}
                    className="group block"
                  >
                    <article className="border-b border-gray-200 pb-8 md:pb-12 transition-all">
                      {/* Essay Title */}
                      <h2 
                        className="text-3xl md:text-4xl lg:text-5xl text-black mb-3 group-hover:font-semibold group-hover:tracking-tight"
                        style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
                      >
                        {essay.title}
                      </h2>
                      
                      {/* Essay Date */}
                      <time 
                        className="text-sm md:text-base text-gray-400 uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-chivo), Arial, sans-serif' }}
                        dateTime={essay.date}
                      >
                        {formatDate(essay.date)}
                      </time>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


