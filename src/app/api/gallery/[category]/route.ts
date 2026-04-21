import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Map URL-safe category slugs → public sub-folders
const FOLDER_MAP: Record<string, string> = {
  logo:         'logo',
  businesscard: 'businesscard',
  brochures:    'brochures',
  signages:     'signages',
};

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

export async function GET(
  _req: Request,
  { params }: { params: { category: string } }
) {
  const folder = FOLDER_MAP[params.category];
  if (!folder) {
    return NextResponse.json({ error: 'Unknown category' }, { status: 404 });
  }

  const dir = path.join(process.cwd(), 'public', folder);

  if (!fs.existsSync(dir)) {
    return NextResponse.json({ images: [] });
  }

  const files = fs.readdirSync(dir).filter((f) =>
    IMAGE_EXTS.has(path.extname(f).toLowerCase())
  );

  // Return public-relative URLs
  const images = files.map((f) => `/${folder}/${f}`);

  return NextResponse.json({ images }, {
    headers: { 'Cache-Control': 'public, max-age=3600' }
  });
}
