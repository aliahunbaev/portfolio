import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface Essay {
  slug: string;
  title: string;
  date: string;
  content: string;
}

const essaysDirectory = path.join(process.cwd(), 'content/writing');

export async function getAllEssays(): Promise<Essay[]> {
  // Check if directory exists
  if (!fs.existsSync(essaysDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(essaysDirectory);
  const allEssaysData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(essaysDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Convert markdown to HTML
        const processedContent = await remark()
          .use(html)
          .process(content);
        const contentHtml = processedContent.toString();

        return {
          slug,
          title: data.title,
          date: data.date,
          content: contentHtml,
        };
      })
  );

  // Sort essays by date (newest first)
  return allEssaysData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getEssayBySlug(slug: string): Promise<Essay | null> {
  try {
    const fullPath = path.join(essaysDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title,
      date: data.date,
      content: contentHtml,
    };
  } catch (error) {
    return null;
  }
}

export async function getNextEssay(currentSlug: string): Promise<Essay | null> {
  const allEssays = await getAllEssays();
  const currentIndex = allEssays.findIndex((essay) => essay.slug === currentSlug);
  
  if (currentIndex === -1 || currentIndex === allEssays.length - 1) {
    return allEssays[0];
  }
  
  return allEssays[currentIndex + 1];
}

export async function getPreviousEssay(currentSlug: string): Promise<Essay | null> {
  const allEssays = await getAllEssays();
  const currentIndex = allEssays.findIndex((essay) => essay.slug === currentSlug);
  
  if (currentIndex === -1 || currentIndex === 0) {
    return allEssays[allEssays.length - 1];
  }
  
  return allEssays[currentIndex - 1];
}


