# Hero statistics, responsive request card and scroll performance

- Preserved the published centred mobile feedback carousel, editorial magazine, glass mobile dock and rounded glass desktop header.
- Replaced the hero badge with «دارای مجوز یکتا اتحادیه کشوری» and the three feature labels with owner-supplied figures: support satisfaction 4.8, successful services 20,000+, active ambassadors 450+. These are supplied business figures, not independently verified metrics; no aggregate-rating structured data was added.
- Counts animate once on viewport entry, without React state updates per frame. Final figures are server-rendered and accessible; reduced-motion shows final values. Hero slide changes no longer remount the count component.
- Hid only the home request-preview card below the existing desktop breakpoint (1024px). Other online-service links/pages remain intact.
- Replaced AOS runtime scroll handlers/initial offset measurements with native IntersectionObserver. Existing data-aos attributes, stagger and CSS are retained. MutationObserver registers streamed sections/client navigation, and all observers/frames are cleaned up. This avoids loading the AOS runtime on the client and handles changing desktop layouts without scroll polling.
- Removed preload priority from the shared logo (which can have a CSS-hidden desktop/mobile instance); visible logos still load eagerly. Kept the intentional first hero-image and font preloads. The warning supplied no actual resource URL, so this does not establish that every possible unused-preload warning is gone.
- `Unchecked runtime.lastError` about a closed response channel commonly comes from browser extensions. No extension messaging API was found/modified; reproduction without extensions is needed before attributing it to the website.

## Validation
- ESLint and production build passed.
- 138 unit tests passed.
- 14 browser scenarios passed across mobile and desktop: final count values, reduced motion, responsive visibility, slide stability, below-fold scroll reveal and navigation, existing feedback geometry/glass styles/magazine behaviour.
- The scroll test waits for streamed layout height before recording geometry (classes can be registered while Next's streaming container is hidden).
- Production SEO audit: zero failures, all indexable pages reachable.
- No comparative Lighthouse/CWV benchmark or production deployment was performed. Performance improvements above describe code/network changes, not a measured speed score.
