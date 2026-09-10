self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // מעביר את הבקשות כרגיל לרשת
});
