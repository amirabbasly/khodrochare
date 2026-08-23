import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  let pathname = request.nextUrl.pathname;

  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // Keep the original pathname when a malformed escape sequence is received.
  }

  if (pathname === "/قیمت-خدمات") {
    return NextResponse.redirect("https://khodrochare.ir/pricing", 308);
  }

  return NextResponse.next();
}
