import { NextResponse } from 'next/server';

// Pre-defined gallery data to avoid filesystem access in serverless environment
// This prevents bundle size issues on Vercel
const GALLERY_DATA: Record<string, string[]> = {
  logo: [
    '/logo/image.png',
    '/logo/image copy.png',
    '/logo/image copy 2.png',
    '/logo/image copy 3.png',
    '/logo/image copy 4.png',
    '/logo/image copy 5.png',
    '/logo/image copy 6.png',
    '/logo/image copy 7.png',
    '/logo/image copy 8.png',
    '/logo/image copy 9.png',
    '/logo/image copy 10.png',
    '/logo/image copy 11.png',
    '/logo/image copy 12.png',
    '/logo/image copy 13.png',
    '/logo/image copy 14.png',
    '/logo/image copy 15.png',
    '/logo/image copy 16.png',
    '/logo/image copy 17.png',
    '/logo/image copy 18.png',
    '/logo/image copy 19.png',
    '/logo/image copy 20.png',
    '/logo/image copy 21.png',
    '/logo/image copy 22.png',
    '/logo/image copy 23.png',
    '/logo/image copy 24.png',
  ],
  businesscard: [
    '/businesscard/amp.png',
    '/businesscard/junction.png',
    '/businesscard/shone.png',
    '/businesscard/wizwealth.png',
  ],
  brochures: [
    '/brochures/ALA.png',
    '/brochures/azooba.png',
    '/brochures/charismix.png',
    '/brochures/currypoint.png',
    '/brochures/menu.png',
    '/brochures/menu2.png',
    '/brochures/naturalstone.png',
    '/brochures/naturalstone2.png',
    '/brochures/tastyjunction.png',
  ],
  signages: [
    '/signages/image.png',
    '/signages/image copy.png',
    '/signages/image copy 2.png',
    '/signages/image copy 3.png',
    '/signages/image copy 4.png',
    '/signages/image copy 5.png',
  ],
  socialmediacreatives: [
    '/socialmediacreatives/image.png',
    '/socialmediacreatives/image copy.png',
    '/socialmediacreatives/image copy 2.png',
    '/socialmediacreatives/image copy 3.png',
    '/socialmediacreatives/image copy 4.png',
    '/socialmediacreatives/image copy 5.png',
    '/socialmediacreatives/image copy 6.png',
    '/socialmediacreatives/image copy 7.png',
    '/socialmediacreatives/image copy 8.png',
    '/socialmediacreatives/image copy 9.png',
    '/socialmediacreatives/image copy 10.png',
    '/socialmediacreatives/image copy 11.png',
    '/socialmediacreatives/image copy 12.png',
    '/socialmediacreatives/image copy 13.png',
    '/socialmediacreatives/image copy 14.png',
    '/socialmediacreatives/image copy 15.png',
    '/socialmediacreatives/image copy 16.png',
    '/socialmediacreatives/image copy 17.png',
    '/socialmediacreatives/image copy 18.png',
    '/socialmediacreatives/image copy 19.png',
    '/socialmediacreatives/image copy 20.png',
    '/socialmediacreatives/image copy 21.png',
    '/socialmediacreatives/image copy 22.png',
    '/socialmediacreatives/image copy 23.png',
    '/socialmediacreatives/image copy 24.png',
    '/socialmediacreatives/image copy 25.png',
  ],
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  // Next.js 16: params is a Promise — must be awaited
  const { category } = await params;

  const images = GALLERY_DATA[category];
  if (!images) {
    return NextResponse.json({ error: 'Unknown category' }, { status: 404 });
  }

  return NextResponse.json({ images }, {
    headers: { 'Cache-Control': 'public, max-age=86400' },
  });
}
