export function GET(request: Request) {
  return Response.redirect(new URL("/pricing", request.url), 308);
}
