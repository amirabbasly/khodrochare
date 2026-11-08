# Feedback, comparison alignment and upright app screens

- Comparison commitments now use a fixed 16px checkmark column and a right-aligned text column. All five promise labels have matching right edges, including wrapped lines, while preserving the three-column table and wording.
- Feedback now has an editorial heading, a collection badge derived from the actual 30 supplied records, numbered story headers, location artwork, richer glass cards/background and a real support contact link. No feedback text, identity, rating or schema was invented. Desktop three-card layout, centred mobile card with clipped neighbours, RTL navigation, keyboard and reduced-motion behaviour are preserved.
- Removed rotation from the back app preview; both front and back exact owner-supplied screenshots are upright. Image files and existing responsive positioning/download links are unchanged.

Validation: ESLint, production build and all 138 unit tests passed. All 16 targeted browser scenarios passed across desktop/mobile, including pixel-aligned text edges, computed transform:none for both phones, exact screenshots, 30 feedback records, carousel geometry/navigation, glass navigation, magazine and large-screen width checks. Reviewed desktop/mobile feedback and mobile app screenshots in coverage/browser (not committed).
