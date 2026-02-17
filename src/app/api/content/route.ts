import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'id';
  
  const filePath = path.join(process.cwd(), `messages/${locale}.json`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read content file' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { locale, section, data } = body;
    
    if (!locale || !section || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const filePath = path.join(process.cwd(), `messages/${locale}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const fullData = JSON.parse(fileContents);
    
    const keys = section.split('.');
    let current = fullData;
    
    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    // Set the value
    current[keys[keys.length - 1]] = data;

    fs.writeFileSync(filePath, JSON.stringify(fullData, null, 2));
    
    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}