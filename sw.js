const CACHE='pad-pantry-v1.2';

const ASSETS=[
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png'
];

// 安裝：先準備離線所需檔案
self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 啟用：清除舊版快取
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(
        keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))
      ))
      .then(()=>self.clients.claim())
  );
});

// 有網路時優先抓最新版；離線時才使用快取
self.addEventListener('fetch',event=>{
  const request=event.request;

  if(request.method!=='GET')return;

  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  event.respondWith(
    fetch(request)
      .then(response=>{
        if(response && response.ok){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(request,copy));
        }
        return response;
      })
      .catch(async()=>{
        const cached=await caches.match(request);
        if(cached)return cached;

        if(request.mode==='navigate'){
          return caches.match('./index.html');
        }

        return Response.error();
      })
  );
});
