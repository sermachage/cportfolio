// app/api/medium/route.ts
import { NextResponse } from 'next/server';

interface MediumItem {
  guid: string;
  title: string;
  description?: string;
  content?: string;
  pubDate: string;
  link: string;
  categories?: string[];
}

interface RSS2JSONResponse {
  status: string;
  items: MediumItem[];
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  category: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'machage_';

  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    console.log('Fetching from RSS2JSON:', apiUrl);
    
    const response = await fetch(apiUrl, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RSS2JSONResponse = await response.json();
    console.log('Received items:', data.items?.length);
    
    if (data.status !== 'ok') {
      throw new Error('RSS2JSON returned error status');
    }
    
    const articles: Article[] = data.items
      .slice(0, 3) // Only get the latest 3 articles
      .map((item: MediumItem) => ({
        id: item.guid,
        title: item.title,
        excerpt: stripHtml(item.description || item.content || '').substring(0, 150) + '...',
        date: new Date(item.pubDate).getFullYear().toString(),
        url: item.link,
        category: item.categories?.[0] || 'Article'
      }));
    
    return NextResponse.json({ articles });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', error);
    return NextResponse.json(
      { error: errorMessage, articles: [] },
      { status: 500 }
    );
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}