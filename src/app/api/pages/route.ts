import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get file path
const getFilePath = (locale: string) => path.join(process.cwd(), `messages/${locale}.json`);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'id';
  
  try {
    const filePath = getFilePath(locale);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Return CustomPages or empty object
    return NextResponse.json(data.CustomPages || {});
  } catch (error) {
    return NextResponse.json({}, { status: 200 }); // Return empty if error/not found
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { locale, action, slug, pageData } = body;
    
    const filePath = getFilePath(locale || 'id');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const fullData = JSON.parse(fileContents);
    
    if (!fullData.CustomPages) {
      fullData.CustomPages = {};
    }

    if (action === 'create' || action === 'update') {
      if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
      fullData.CustomPages[slug] = {
        ...fullData.CustomPages[slug],
        ...pageData,
        updatedAt: new Date().toISOString()
      };
    } else if (action === 'delete') {
      if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
      delete fullData.CustomPages[slug];
    } else if (action === 'toggleVisibility') {
      if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
      if (fullData.CustomPages[slug]) {
        fullData.CustomPages[slug].isVisible = !fullData.CustomPages[slug].isVisible;
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(fullData, null, 2));
    
    return NextResponse.json({ success: true, pages: fullData.CustomPages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update pages' }, { status: 500 });
  }
}