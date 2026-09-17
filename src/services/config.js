// Base URL for statically-hosted catalog/mock data. These JSON files live
// in public/data/ and are copied verbatim into the GitHub Pages web build
// (see .github/workflows/deploy.yml) — fetching them here is a real HTTPS
// network call, not a bundled import.
//
// Hosted via jsDelivr's GitHub CDN mirror of this same public repo rather
// than the GitHub Pages URL directly. GitHub Pages is a pure static host
// with no server-side logic: an OPTIONS preflight request to it 405s with
// no Access-Control-Allow-Origin header at all (only plain GET responses
// carry that header). Most browsers never send a preflight for a plain
// unauthenticated fetch(), so this was invisible from a normal browser or
// the deployed app itself — but Expo Snack's web preview runtime does
// trigger one, so importing this repo into Snack failed with "No
// 'Access-Control-Allow-Origin' header is present" even though the exact
// same fetch worked everywhere else. jsDelivr answers OPTIONS correctly
// (verified: 200 + `access-control-allow-origin: *`), so it works in both
// environments. The deploy workflow purges jsDelivr's cache on every push
// so catalog updates don't wait out its ~7 day default cache lifetime.
export const DATA_BASE_URL = "https://cdn.jsdelivr.net/gh/SarikaVerma/FurnoApp@main/public/data";
