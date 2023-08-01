async function collectPageDataListener(page, accumulatorArray) {
  // Intercept sended request
  page.on("request", (request) => {
    if (request.isInterceptResolutionHandled()) return;

    request.continue();
  });

  // Listen for incoming responses
  page.on("response", async (response) => {
    const url = await response.url();
    if (url.match(/q=laptops/) && url.match(/api/)) {
      let allData = await response.json();
      allData = allData.hits;
      accumulatorArray.push(allData);
    }
  });
}

module.exports = collectPageDataListener;
