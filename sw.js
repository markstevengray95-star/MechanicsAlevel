const CACHE='mechanics-lab-v7';
const CORE=['./','./index.html','./styles.css?v=7','./app.js?v=7','./manifest.webmanifest'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).catch(()=>{}));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    const hadOldMechanicsCache=keys.some(key=>key.startsWith('mechanics-lab-')&&key!==CACHE);
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
    if(hadOldMechanicsCache){
      const windows=await self.clients.matchAll({type:'window'});
      for(const client of windows){
        try{ await client.navigate(client.url); }catch(_){}
      }
    }
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
