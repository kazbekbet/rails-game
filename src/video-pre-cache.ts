const videoUrls = ['back.mp4', 'analyst.mp4', 'hr.mp4', 'om.mp4', 'pmo.mp4', 'sw.mp4', 'test.mp4'];

const PATH = '/src/shared/libs/rails-lib/assets/video/';

window.caches
  .open('video-pre-cache')
  .then(cache => Promise.all(videoUrls.map(videoUrl => fetchAndCacheVideo(`${PATH}${videoUrl}`, cache))));

function fetchAndCacheVideo(videoUrl: string, cache: Cache) {
  return cache.match(videoUrl).then(cacheResponse => {
    if (cacheResponse) return cacheResponse;

    return fetch(videoUrl).then(response => {
      cache.put(videoUrl, response.clone());
      return response;
    });
  });
}
