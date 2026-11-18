type IllustratedArticle = { image: string };
/** Shared artwork is branding, not an illustration specific to a technical guide. */
export function sharedArticleImages(posts: readonly IllustratedArticle[]): Set<string> {
  const counts = new Map<string, number>();
  for (const post of posts) counts.set(post.image, (counts.get(post.image) ?? 0) + 1);
  return new Set([...counts].filter(([, count]) => count > 1).map(([image]) => image));
}
