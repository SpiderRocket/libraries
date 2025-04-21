function Content() {}

function tryFetchWithProxies(proxies, index) {
  if (index >= proxies.length) {
    return Promise.reject(
      new Error('All proxies failed or are rate-limited.')
    );
  }

  return fetch(proxies[index])
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .catch(error => {
      console.error(`Error with proxy ${index}:`, error);
      return tryFetchWithProxies(proxies, index + 1);
    });
}

Content.prototype.fetch = function(url) {
  const urlValue = typeof url === 'string' ? url.trim() : url?.value?.trim();
  if (!urlValue) {
    console.log("Invalid URL");
    return Promise.reject(new Error("Invalid URL"));
  }

  const corsProxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(urlValue)}`,
    `https://corsproxy.io/?${encodeURIComponent(urlValue)}`,
    `https://cors-anywhere.herokuapp.com/${urlValue}`
  ];

  return tryFetchWithProxies(corsProxies, 0);
}

let content = new Content();
