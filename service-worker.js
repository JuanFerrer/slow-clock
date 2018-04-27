/* globals importScripts */

importScripts("js/cache-polyfill.js");

self.addEventListener("install", function (e) {
	e.waitUntil(
		caches.open("tocheck").then(function (cache) {
			return cache.addAll([
				".",
				"index.html",
				"index.html?homescreen=1",
				"?homescreen=1",
				"css/style.css",
				"css/bootstrap.min.css",
				"js/index.js",
				"3rd-party/jquery-3.3.1.min.js",
				"3rd-party/bootstrap.bundle.min.js",
				"img/settings.svg",
				"img/info.svg",
				"img/clock-face.svg",
				"img/sunrise.svg",
				"img/clock-hand-flat.svg",
				"img/sunset.svg",
				"img/noon.svg"
			]);
		})
	);
});

self.addEventListener("fetch", function (event) {
	//console.log(event.request.url);
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
