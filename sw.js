const firstCacheName = 'restapp-v2';

const cachedFiles = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'/data/restaurants.json'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(firstCacheName)
			.then(cache => cache.addAll(cachedFiles))
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
	// Remove the old cache
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.filter(cacheName => {
					return cacheName.startsWith('restapp-') &&
							cacheName != firstCacheName;
				}).map(cacheName => caches.delete(cacheName))
			);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => response || fetch(event.request))
	);
});