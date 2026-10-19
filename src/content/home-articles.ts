import type { BlogPost } from "./blog";

/** Only card fields may cross the home slider's client boundary. */
export type HomeArticleCard = Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "readTime" | "image">;
export const HOME_ARTICLE_LIMIT = 10;
export function latestHomeArticles(posts: readonly BlogPost[]): HomeArticleCard[] {
  // Publication date, not last edit: refreshing an old guide must not displace new articles.
  return [...posts]
    .sort((a, b) => b.publishedAtIso.localeCompare(a.publishedAtIso) || a.slug.localeCompare(b.slug))
    .slice(0, HOME_ARTICLE_LIMIT)
    .map(({ slug, title, excerpt, category, readTime, image }) => ({ slug, title, excerpt, category, readTime, image }));
}
