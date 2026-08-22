const CACHE_NAME = "foco30-v1";

const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-1200.png",
  "./icon-900.png"
];


self.addEventListener("install", (event) => {

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting())

  );

});


self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys()
      .then((keys) => {

        return Promise.all(

          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))

        );

      })
      .then(() => self.clients.claim())

  );

});


self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    networkFirst(event.request)
  );

});


async function networkFirst(request) {

  try {

    const response = await fetch(request);

    if (response.ok) {

      const cache = await caches.open(
        CACHE_NAME
      );

      await cache.put(
        request,
        response.clone()
      );

    }

    return response;

  } catch {

    const cachedResponse =
      await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response(
      "Recurso indisponível offline.",
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      }
    );

  }

}