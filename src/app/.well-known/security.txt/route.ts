const securityText = `Contact: mailto:info@khodrochare.ir
Expires: 2027-09-01T00:00:00.000Z
Preferred-Languages: fa, en
Canonical: https://khodrochare.ir/.well-known/security.txt
`;

export function GET() {
  return new Response(securityText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
