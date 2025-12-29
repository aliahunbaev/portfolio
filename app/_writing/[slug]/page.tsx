import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CalEmbed from '../../components/CalEmbed';
import { getEssayBySlug, getNextEssay, getPreviousEssay, getAllEssays } from '../../lib/essays';
import EssayContent from './EssayContent';

export async function generateStaticParams() {
  const essays = await getAllEssays();
  return essays.map((essay) => ({
    slug: essay.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);
  
  if (!essay) {
    return {
      title: 'Essay Not Found | Ali Ahunbáev',
    };
  }

  return {
    title: `${essay.title} | Ali Ahunbáev`,
  };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const essay = await getEssayBySlug(slug);
  const nextEssay = await getNextEssay(slug);
  const previousEssay = await getPreviousEssay(slug);

  if (!essay) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <EssayContent 
        essay={essay}
        nextEssay={nextEssay}
        previousEssay={previousEssay}
      />
      
      <Footer />
    </div>
  );
}
