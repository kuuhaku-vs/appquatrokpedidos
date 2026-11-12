// Service worker do app Pedidos 4K: deixa o app instalável e abre rápido.
// Página e ícones: busca na rede primeiro (para sempre pegar a versão nova) e usa o cache se estiver sem internet.
// Chamadas ao Protheus e à planilha (outros endereços) não passam pelo cache.
const CACHE = 'pedidos4k-v3';
const BASE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/logo-96.png', './icons/icon-32.png', './icons/apple-touch-icon.png', './icons/logo-grupo4k-sm.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if(e.request.method !== 'GET' || url.origin !== location.origin) return; // Protheus, planilha, fontes: direto na rede
  e.respondWith(
    fetch(e.request).then(res => {
      if(res.ok){ const copia = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)) }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});

// Clique na notificação de pedido novo: volta para o site (ou abre, se estiver fechado)
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(ls => {
    const c = ls.find(x => x.url.startsWith(self.registration.scope));
    return c ? c.focus() : self.clients.openWindow(self.registration.scope);
  }));
});
