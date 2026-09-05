import { NextRequest, NextResponse } from "next/server";
import { legacyRedirects } from "@/seo/redirects";
export function proxy(request: NextRequest) {
  let pathname: string;
  try { pathname = decodeURIComponent(request.nextUrl.pathname); }
  catch { return new NextResponse("Invalid URL encoding", { status: 400, headers: { "X-Robots-Tag": "noindex" } }); }
  const destination = legacyRedirects[pathname];
  if (destination) { const target = request.nextUrl.clone(); target.pathname = destination; return NextResponse.redirect(target, 308); }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!api/|_next/|images/|fonts/|icons/).*)"] };
