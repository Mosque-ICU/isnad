import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LRUCache } from 'lru-cache';
import { v4 as uuidv4 } from 'uuid';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //rate limit api max 100 requests per 60 seconds
  const tokenCache = new LRUCache({
    max: 100,
    ttl: 60 * 1000
  });

  const limit = 100;

  //check if isnad.icu cookie exists
  let isnadCookie = request.cookies.get('isnad-icu');
  const response = NextResponse.next();

  if (!isnadCookie?.name) {
    //create isnad.icu cookie if it doesn't exist
    const token = uuidv4();
    response.cookies.set({
      name: 'isnad-icu',
      value: token
    });

    isnadCookie = { value: token, name: 'isnad-icu' };
  }

  const tokenCount = (tokenCache.get(isnadCookie?.value) as number[]) || [0];
  if (tokenCount[0] === 0) {
    tokenCache.set(isnadCookie?.value, tokenCount);
  }
  tokenCount[0] += 1;

  const currentUsage = tokenCount[0];
  const isRateLimited = currentUsage >= limit;

  if (isRateLimited) {
    //set rate limit header
    response.headers.set('X-RateLimit-Limit', limit.toString());
    return NextResponse.json(
      { errors: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  return response;
}

// Run on all api routes
export const config = {
  matcher: '/api/:path*'
};
