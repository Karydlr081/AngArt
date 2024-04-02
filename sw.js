const nombreCache = "PortafolioDigital";
// archivos se guarda en el cache guardar todo lo que este dentro de la raiz
const archivos = [
  "./",
  "./index.html",
  "./app.js",
  "./style.css",
  "./bootsrap.min.css",
  "./images/portfolio/Gary.jpg",
  "./images/portfolio/Página.jpg",
  "./images/portfolio/Saco.jpg",
  "./images/portfolio/Snoopy.jpg",
  "./images/portfolio/Videojuego 2d.jpg",
  "./images/portfolio/Videojuego 3D.jpg",
  "./images/shapes/shape-1.png",
  "./images/shapes/shape-2.png",
  "./images/shapes/shape-3.png",
  "./images/shapes/shape-4.png",
  "./images/shapes/shape-5.png",
  "./images/shapes/shape-6.png",
  "./images/1.jpeg",
  "./images/Foto Inicio.png",
  "./js/bootstrap.min.js",
  "./js/jquery.min.js",
  "./js/main.js",
  "./js/popper.min.js",
  "./js/scrollit.min.js",
  "./C..V.pdf"
];

self.addEventListener("install", (e) => {
  console.log("Instalando.....");
  e.waitUntil(
    caches.open(nombreCache).then((cache) => {
      console.log("Agregando al caché");
      return cache
        .addAll(archivos)
        .then(() => console.log("Archivos almacenados en caché correctamente"))
        .catch((error) =>
          console.error("Error al almacenar archivos en caché:", error)
        );
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("activando", e);
});

//compara y actualiza el cache
self.addEventListener("fetch", (e) => {
  console.log("Fetch...", e);
  e.respondWith(
    caches.match(e.request).then((respuestaCache) => {
      return (
        respuestaCache ||
        fetch(e.request)
          .then((respuestaRed) => {
            // Si la respuesta de la red es válida, la almacenamos en la caché
            if (respuestaRed.ok) {
              return caches.open(nombreCache).then((cache) => {
                cache.put(e.request, respuestaRed.clone());
                return respuestaRed;
              });
            }
            return respuestaRed;
          })
          .catch((error) => {
            console.error("Error al recuperar recurso:", error);
            // Puedes retornar una respuesta de fallback aquí si es necesario
          })
      );
    })
  );
});
