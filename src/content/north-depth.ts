import type { LandingFaq } from "./landing-expansion-cities";
import { northMazandaranDepth } from "./north-mazandaran";

export type NorthDepthSection = {
  title: string;
  body: string;
  bullets?: string[];
};

export type NorthDepthLink = {
  /** City slug, road slug or blog slug depending on the list it sits in. */
  slug: string;
  name: string;
};

export type NorthCityDepth = {
  /** Exactly 3 deep, locally grounded sections (hotspots, season, transport). */
  sections: NorthDepthSection[];
  /** Exactly 3 keyword-targeted FAQs appended to the page Questions (FAQ schema automatic). */
  faqs: LandingFaq[];
  /** 3-4 real neighboring cities (cross-province links allowed where geographic). */
  neighbors: NorthDepthLink[];
  /** Relevant road guides (/roads/*). May be empty where no road page fits. */
  roads: NorthDepthLink[];
  /** Exactly 2 related blog guides (/blog/*). */
  guides: NorthDepthLink[];
};

/**
 * North domination plan, round 1: Mazandaran (12 cities).
 * Round 2 adds Gilan (8) + Golestan (4); the merger below stays the single
 * entry point consumed by components and tests.
 */
export const northCityDepth: Record<string, NorthCityDepth> = {
  ...northMazandaranDepth,
};
