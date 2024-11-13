//
//  content.js
//  Spin & Pick
//
//  Created by Hari Yerramsetti on 8/16/25.
//
// Scrape top 5 place names from Google "places" widget
// Extract top 5 place names from Google "places" widget
function getPlaces() {
  // Find all place containers
  const placeContainers = document.querySelectorAll('.VkpGBb');
  const places = [];
  for (const container of placeContainers) {
    const nameSpan = container.querySelector('.dbg0pd .OSrXXb');
    if (nameSpan && nameSpan.textContent) {
      places.push(nameSpan.textContent.trim());
    }
    if (places.length === 5) break;
  }
  return places;
}

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getPlaces") {
    sendResponse({ places: getPlaces() });
  }
});
