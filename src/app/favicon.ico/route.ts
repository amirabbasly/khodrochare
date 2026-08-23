export function GET(request: Request) {
  return Response.redirect(new URL("/favicon-32x32.png", request.url), 308);
}
