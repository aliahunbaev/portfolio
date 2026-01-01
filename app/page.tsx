'use client';

import { useEffect, useState } from 'react';

const links = [
  {
    title: 'Combát',
    description: 'Community & Creative Studio',
    href: 'https://instagram.com/combatcreatif',
    image: '/combatlink.png',
  },
  {
    title: 'YouTube',
    description: 'Design, business, & life in NYC',
    href: 'https://youtube.com/@playfighter',
    image: '/link1.jpg',
  },
  {
    title: 'Playfighter',
    description: 'Letters on building a life of play',
    href: 'https://playfighter.substack.com',
    image: '/link5.png',
  },
];

const aboutSections = [
  {
    id: 'how-i-started',
    title: 'How I Started',
    content: [
      "I've been drawing my whole life, and I got this identity as an \"artist\" reinforced by everyone around me.",
      "It was one of the primary ways I was known. And how I knew myself.",
      "I'm so lucky this label got thrown on me. It's so much harder to make stuff when you think you're \"just not creative.\"",
      "My earliest career interests were being a ninja, Wild Kratt brother, pro-fisherman, paleontologist, or a Lego set designer.",
      "After I turned 9, I was mostly interested in being a painter or writer.",
      "Math (and school in general) has always been easy for me as well. My mom wanted me to be a doctor and my father told me to study computer science.",
      "I said, \"Fuck no, they're all nerds, I'm never doing that shit.\"",
      "In high school, I found so much good shit. Tarantino, Wes Anderson movies, Wu-Tang, Miles Davis, actually endless inspiration.",
      "My desire for a creative life grew. So did my ambition.",
      "I didn't know what to do with that though. I spent a long time thinking.",
      "One morning in 11th grade, I was sitting in my Calculus BC class talking to the girls next to me. My teacher Mr. Moon walked in, and he got really interested in what I said (Pretty sure I asked something like \"when's the last time you cried\" or \"why do you get out of bed in the morning\").",
      "He paused and asked me, \"what are you doing after high school?\"",
      "I said I'm studying architecture.",
      "He put his hands on his hips and looked at the ceiling and spoke in a mathematical tone, as if solving an equation \"Right, because smart artists go into architecture.\"",
      "Then he looked at me and said plainly, \"You should be a programmer.\"",
      "I told him I don't want a boring life.",
      "He told me that the tech world is full of nerds who are good at programming but have no vision. But if you're smart enough to use the tools, and have the taste of an artist, you have so much room to do amazing things. And make more money.",
      "I shot the idea down again, but the seed was planted.",
      "This persuasive genius played to my ego and my desires so well.",
      "In the following year, I read the biography of Steve Jobs, read the essays of Paul Graham, watched The Social Network, and fell down the rabbit hole of startups and entrepreneurship.",
      "And here I am, a CS major, writing the code for this website."
    ]
  },
  {
    id: 'my-goal',
    title: "My Goal",
    content: [
      "I've enjoyed <i>a lot</i> of books, movies, music, documentaries, magazines, biographies, podcasts throughout my childhood.",
      "I'm so grateful for the art I've come across, and the people who made them. It's made me believe that",
      "1. life is beautiful<br />2. i can do great things",
      "I love art that makes you feel strong and excited to live.",
      "I want to make stuff like that. I have this huge list of people who've enriched my life. Most of them never knew me.",
      "I'd like to be on someone else's list.",
      "My goal is to make enough money to never think about it again,",
      "bring joy and fulfillment to the lives of others,",
      "and have a lot of fun.",
      "In short: build a cool company with cool people."
    ]
  },
  {
    id: 'motivations',
    title: "Motivations",
    content: [
      "honestly I do a lot of what I do because I think it's cool.",
      "i remember one day i was thinking about how, when you're in a group, if someone sings or raps or tells jokes or does <i>something</i>, it makes the experience so much more enjoyable. for everyone involved.",
      "as opposed to the people who just kinda sit back, because they don't have the skill or feel too shy.",
      "i think of birds singing. they just do it naturally, and it makes things nicer.",
      "so i think it's cool to have a business, make art, build software, create wealth, get jacked, play the saxophone, freestyle, write a book, etc.",
      "i'm lucky enough that most of the things I want to do, I actually <i>can</i>. I'm healthy enough, my living conditions are secure, I have access to the internet, and I stumbled into a good mindset before turning 18.",
      "It just takes some courage and a lot of practice.",
      "I'm extremely afraid of wasting life.",
      "We're given this opportunity, why not use all of it?"
    ]
  },
  {
    id: 'future-vision',
    title: "Where I See Myself in 3,650 Days",
    content: [
      "I see myself leading Combat. I always had this idea that the pinnacle of what I want to do in this world would look something like a school.",
      "But a good one. You go and learn how to box, paint, give speeches, to think for yourself, to be okay with pissing people off, to find a way to actually create wealth, to flirt, to cultivate both peace & progress.",
      "Just a Human Potential Extracting Machine. The closest equivalents are startup incubators (Y Combinator), groups like buildspace or Founders Inc., or a studio like Teenage Engineering or Aime Leon Dore.",
      "In any case, I'm fly as fuck, surrounded by great people. I see myself as a good boxer & nice on the sax. I also see myself with an absolute baddie. Kind curious creative baddie."
    ]
  }
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      const timeString = now.toLocaleTimeString('en-US', options);
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="min-h-screen">
        {/* Single Container */}
        <div className="relative min-h-screen">
          {/* Location & Time - Top */}
          <div className="px-4 py-6 lg:px-6 lg:py-6">
            <div className="max-w-2xl mx-auto flex items-center gap-2 text-gray-400 text-xs tracking-widest uppercase" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
              <p>Brooklyn, NY</p>
              <span>•</span>
              <p>{currentTime}</p>
              <p>EST</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 pb-12 lg:px-6">
            <div className="max-w-2xl mx-auto">
              {/* Profile Photo */}
              <div className="mb-6">
                <img
                  src="/photo.webp"
                  alt="Ali Ahunbaev"
                  draggable="false"
                  className="max-w-xs md:max-w-sm rounded-3xl object-cover select-none"
                  style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.06)' }}
                />
              </div>

              {/* Name & Subtitle */}
              <div className="mb-8">
                <div className="select-none mb-4">
                  <h1
                    className="text-2xl md:text-2xl text-gray-900 tracking-tight leading-none mb-1"
                    style={{ fontFamily: 'var(--font-century-schoolbook), Georgia, serif' }}
                  >
                    Ali Ahunbáev
                  </h1>
                  <h2
                    className="text-2xl md:text-2xl text-blue-400 tracking-tight leading-none"
                    style={{ fontFamily: 'var(--font-century-schoolbook), Georgia, serif' }}
                  >
                    Designer & Developer
                  </h2>
                </div>
              </div>

              {/* Intro Section */}
              <div className="mb-12 space-y-4 text-gray-700 text-sm tracking-wide leading-relaxed" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                <p>What's up, I'm Ali.</p>
                <p>The first time I remember "being an artist" was drawing a Crayola portrait of my mother. I was around 3 years old. She liked it.</p>
                <p>I'm 19 now, and still think of myself that way.</p>
                <p>I'm currently studying Computer Science at NYU. It's been my dream to move to New York since I was 15. Couldn't be happier (or broker).</p>
                <p>I spend most of my time working to create beautiful things. I find this pursuit difficult, fulfilling, and wildly fun.</p>
                <p>The rest of my attention is divided between the gym, shawarma, books, movies, and women.</p>
              </div>

              {/* What I'm Working On */}
              <div className="mb-16 pb-12 -mx-4 px-4 lg:-mx-6 lg:px-6 border-b border-gray-200">
                <h3 className="text-sm uppercase text-gray-600 tracking-wider mb-6" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>What I'm Working On</h3>
                <div className="space-y-4 text-gray-700 text-sm tracking-wide leading-relaxed" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                  <p>
                    <a href="https://instagram.com/combatcreatif" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline underline-offset-4">COMBAT®</a> – design studio. Visual identity & digital experiences for creative brands.
                  </p>
                  <p>
                    <span className="text-blue-400">Marble</span> – building software to track nutrition & training. Sculpt your body like marble.
                  </p>
                  <p>
                    <span className="text-blue-400">Boxing</span> – I gotta do justice to my first name.
                  </p>
                  <p>
                    <a href="https://youtube.com/@playfighter" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline underline-offset-4">YouTube</a> – making videos about design, business, and life in NYC.
                  </p>
                  <p>
                    <a href="https://playfighter.substack.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline underline-offset-4">Playfighter</a> – writing letters about design, building, and life in NYC every week.
                  </p>
                </div>
              </div>

              {/* Link Cards */}
              <div className="space-y-4 mb-16 pb-12 -mx-4 px-4 lg:-mx-6 lg:px-6 border-b border-gray-200">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative aspect-[3/1] rounded-3xl overflow-hidden transition-all duration-200">
                      <img
                        src={link.image}
                        alt={link.title}
                        draggable="false"
                        className="absolute inset-0 w-full h-full object-cover select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <h2
                          className="text-xl text-white mb-1 tracking-tight group-hover:italic"
                          style={{ fontFamily: 'var(--font-century-schoolbook), Georgia, serif' }}
                        >
                          {link.title}
                        </h2>
                        <p className="text-xs text-white/90 uppercase tracking-widest" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Expandable About Sections */}
              <div className="space-y-3 mb-16">
                {aboutSections.map((section) => {
                  const isExpanded = expandedSections.includes(section.id);
                  return (
                    <div key={section.id} className={`border border-gray-200 rounded-3xl overflow-hidden transition-colors ${isExpanded ? 'bg-gray-50' : ''}`}>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <h3 className="text-sm uppercase text-gray-600 text-left tracking-wider" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                          {section.title}
                        </h3>
                        <span className="text-gray-400 text-base flex-shrink-0 ml-4" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4">
                          <div className="space-y-3 text-gray-600 text-sm tracking-wide  leading-relaxed pt-2" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                            {section.content.map((paragraph, idx) => (
                              <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Reach Out Section */}
              <div className="mt-12 pt-12 mb-12 -mx-4 px-4 lg:-mx-6 lg:px-6 border-t border-gray-200">
                <div className="space-y-4 text-gray-700 text-sm tracking-wide leading-relaxed" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                  <p>My friends tend to be creative, curious, excited people.</p>
                  <p>If you want to talk about what you're building or enjoy anything I share, please <a href="mailto:alizahunbaev@gmail.com" className="text-blue-400 underline underline-offset-4">reach out</a>. I always love a good conversation.</p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 pb-12 -mx-4 px-4 lg:-mx-6 lg:px-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-400" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                  <p>© {new Date().getFullYear()} Ali Ahunbáev</p>
                  <a
                    href="https://www.youtube.com/watch?v=UF8uR6Z6KLc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tracking-widest uppercase hover:text-gray-600 transition-colors"
                  >
                    Stay Hungry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
