import { allCities, northernProvinces } from "../../src/content/coverage";
import { brandProfiles } from "../../src/content/brands";
import { neighborhoods } from "../../src/content/neighborhoods";
import { roadProfiles } from "../../src/content/roads";
import { blogPosts } from "../../src/content/blog";
import { services } from "../../src/content/services";
import { persianServiceRoutes } from "../../src/seo/internal-links";
import { seoRegions } from "../../src/seo/locations";
export const indexablePaths = [
  "/", "/services", "/coverage", "/blog", "/rules", "/app", "/assistant", "/about", "/contact", "/pricing",
  "/امداد-خودرو", "/امداد-خودرو-آنلاین", "/شمال", "/brands", "/roads", "/editorial-policy", "/privacy",
  ...allCities.flatMap((city) => [`/${city.slug}`, ...persianServiceRoutes.map((route) => `/${city.slug}/${route.slug}`)]),
  ...northernProvinces.map((province) => `/${province.slug}`),
  ...Object.values(seoRegions).map((region) => `/${region.citySlug}/${region.slug}`),
  ...neighborhoods.map((area) => `/${area.citySlug}/${area.slug}`),
  ...brandProfiles.map((brand) => `/brands/${brand.slug}`),
  ...roadProfiles.map((road) => `/roads/${road.slug}`),
  ...services.map((service) => `/services/${service.slug}`),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
].sort();
export const nonindexablePaths = ["/store"];
export const invalidPaths = [
  "/not-a-real-page", "/کرج/شمال-تهران", "/رشت/شمال-تهران", "/گیلان/یدک-کش",
  "/تهران/گوهردشت", "/کرج/سعادت-آباد", "/تهران/خدمت-نامعتبر", "/چالوس/شمال-تهران",
  "/brands/missing-brand", "/brands/Toyota", "/roads/missing-road", "/services/missing-service", "/blog/missing-post",
];
