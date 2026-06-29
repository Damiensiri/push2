importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener("install",()=>{
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch",event=>{
  const request=event.request;

  if(request.method!=="GET" || request.mode!=="navigate") return;

  event.respondWith(
    fetch(request,{cache:"no-store"}).catch(async()=>{
      return (await caches.match(request)) ||
             (await caches.match("/index.html"));
    })
  );
});
