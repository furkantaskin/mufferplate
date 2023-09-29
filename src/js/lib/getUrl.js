export function sendUrl() {
  async function postData(url = '', data = {}) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const websiteData = {
    url: document.location.origin,
    title: document.title,
    datetime: new Date().toLocaleString(),
  };

  // Call the postData function asynchronously
  postData('https://mufferplateapi-1-b0282479.deta.app/print_url/', websiteData)
    .then(() => {})
    .catch(() => {
    });
}
