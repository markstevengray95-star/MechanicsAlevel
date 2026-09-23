const CACHE='mechanics-lab-v17';
const CORE=['./','./index.html','./styles.css?v=15','./app.js?v=15','./mechanics-assessment-enhancements.js?v=1','./textbook-expansion-v1.js?v=1','./equation-coach-v2.js?v=1','./manifest.webmanifest'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).catch(()=>{}));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  const sameOrigin=url.origin===self.location.origin;
  const isCore=sameOrigin && (
    req.mode==='navigate' ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/app.js') ||
    url.pathname.endsWith('/mechanics-assessment-enhancements.js') ||
    url.pathname.endsWith('/textbook-expansion-v1.js') ||
    url.pathname.endsWith('/equation-coach-v2.js') ||
    url.pathname.endsWith('/styles.css') ||
    url.pathname.endsWith('/manifest.webmanifest')
  );

  if(isCore){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(req,{cache:'no-store'});
        const cache=await caches.open(CACHE);
        cache.put(req,fresh.clone());
        return fresh;
      }catch(error){
        const cached=await caches.match(req,{ignoreSearch:false});
        if(cached) return cached;
        throw error;
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached=await caches.match(req);
    if(cached) return cached;
    const fresh=await fetch(req);
    if(sameOrigin){
      const cache=await caches.open(CACHE);
      cache.put(req,fresh.clone());
    }
    return fresh;
  })());
});
