/* Pump Operator Hydraulics — offline helper.
   Saves the app on the phone so it opens with no signal.
   The page itself is checked online first (so updates arrive), with the saved copy as the fallback. */
const VERSION = 'v5';
const APP_CACHE = `pump-hydraulics-${VERSION}`;
const FONT_CACHE = 'pump-hydraulics-fonts';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=IBM+Plex+Mono:wght@400;500&family=Saira+Condensed:wght@500;600;700&display=swap';

function withTimeout(promise, ms){
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then(v => { clearTimeout(t); resolve(v); }, e => { clearTimeout(t); reject(e); });
  });
}

async function saveFonts(){
  // The app works with backup fonts if this fails; it is retried on the next update.
  const cache = await caches.open(FONT_CACHE);
  const res = await fetch(FONT_CSS, {mode:'cors'});
  if (!res.ok) return;
  const css = await res.clone().text();
  await cache.put(FONT_CSS, res);
  const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map(m => m[1]);
  await Promise.all(urls.map(async (u) => {
    const r = await fetch(u, {mode:'cors'});
    if (r.ok) await cache.put(u, r);
  }));
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(APP_CACHE);
    await cache.addAll(APP_FILES);
    try { await withTimeout(saveFonts(), 10000); } catch (e) { /* offline or blocked: backup fonts are used */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => k.startsWith('pump-hydraulics-') && k !== APP_CACHE && k !== FONT_CACHE)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function fontFromCache(req){
  const cache = await caches.open(FONT_CACHE);
  const hit = await cache.match(req.url);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok || res.type === 'opaque') cache.put(req.url, res.clone());
    return res;
  } catch (e) {
    return Response.error();
  }
}

async function pageOnlineFirst(req){
  const cache = await caches.open(APP_CACHE);
  try {
    const res = await withTimeout(fetch(req), 4000);
    if (res && res.ok) cache.put('./index.html', res.clone());
    return res;
  } catch (e) {
    return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com'){
    event.respondWith(fontFromCache(req));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate'){
    event.respondWith(pageOnlineFirst(req));
    return;
  }
  event.respondWith(caches.match(req, {ignoreSearch:true}).then(hit => hit || fetch(req)));
});
