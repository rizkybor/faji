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
    
    // Return NavigationItems or default if empty
    if (!data.NavigationItems) {
      return NextResponse.json([
        { label: data.Index?.nav?.home || "Home", href: "/", type: "system" },
        { label: data.Index?.nav?.about || "About", href: "/about", type: "system" },
        { label: data.Index?.nav?.program || "Program", href: "/program", type: "system" },
        { label: data.Index?.nav?.gallery || "Gallery", href: "/gallery", type: "system" },
        { label: data.Index?.nav?.live || "Live", href: "/live", type: "system" }
      ]);
    }
    return NextResponse.json(data.NavigationItems);
  } catch (error) {
    return NextResponse.json([], { status: 200 }); // Return empty if error/not found
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, item, index } = body;
    
    // We need to update both ID and EN files to keep structure in sync
    const locales = ['id', 'en'];
    
    for (const locale of locales) {
      const filePath = getFilePath(locale);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const fullData = JSON.parse(fileContents);
      
      if (!fullData.NavigationItems) {
        // Initialize with default items if empty
        fullData.NavigationItems = [
          { label: fullData.Index?.nav?.home || "Home", href: "/", type: "system" },
          { label: fullData.Index?.nav?.about || "About", href: "/about", type: "system" },
          { label: fullData.Index?.nav?.program || "Program", href: "/program", type: "system" },
          { label: fullData.Index?.nav?.gallery || "Gallery", href: "/gallery", type: "system" },
          { label: fullData.Index?.nav?.live || "Live", href: "/live", type: "system" }
        ];
      }

      if (action === 'add') {
        const newItem = {
          label: item.label[locale] || item.label['id'], // Fallback to ID label if EN missing
          href: item.href,
          type: item.type || 'custom'
        };
        fullData.NavigationItems.push(newItem);
        
        // Also initialize CustomPage entry if it's a custom page
        if (item.type === 'custom' && !fullData.CustomPages?.[item.slug]) {
          if (!fullData.CustomPages) fullData.CustomPages = {};
          fullData.CustomPages[item.slug] = {
            title: newItem.label,
            slug: item.slug,
            subtitle: '',
            content: '',
            isVisible: true
          };
        }
      } else if (action === 'update') {
        if (fullData.NavigationItems[index]) {
          fullData.NavigationItems[index] = {
            ...fullData.NavigationItems[index],
            label: item.label[locale] || item.label['id'],
            href: item.href
          };
        }
      } else if (action === 'delete') {
        // Remove from navigation
        const deletedItem = fullData.NavigationItems[index];
        fullData.NavigationItems.splice(index, 1);
        
        // Optional: Remove from CustomPages too? 
        // Let's keep the page content safe, just remove from menu for now.
      } else if (action === 'reorder') {
        // Simple swap logic or full replace
        if (body.items) {
             // If full list provided (e.g. drag and drop result), we need to map the labels correctly per locale
             // This is tricky because the client sends one order but we have two files with different labels.
             // Strategy: The client sends the new order of HREF/Types. We rebuild the list preserving local labels.
             const newOrder = body.items; // Array of { href, type }
             const currentItems = fullData.NavigationItems;
             
             const reordered = newOrder.map((orderedItem: any) => {
               const found = currentItems.find((i: any) => i.href === orderedItem.href);
               return found || orderedItem; // Keep existing label if found
             });
             
             fullData.NavigationItems = reordered;
        }
      }

      fs.writeFileSync(filePath, JSON.stringify(fullData, null, 2));
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update navigation' }, { status: 500 });
  }
}