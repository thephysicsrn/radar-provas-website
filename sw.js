/**
 * RADAR - Service Worker para PWA
 * Caching inteligente para alta performance mobile e visualização offline
 */

const CACHE_NAME = 'radar-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './operacoes.html',
  './manifest.json',
  './css/main.css',
  './css/components.css',
  './css/animations.css',
  './css/responsive.css',
  './js/animations.js',
  './js/simulator.js',
  './js/command-center.js',
  './js/modal.js',
  './js/app.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/images/team-proctors.jpg',
  './assets/images/classroom-exam.jpg',
  './assets/images/celebration-1year.jpg'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia: Stale-While-Revalidate para máxima velocidade no celular
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
