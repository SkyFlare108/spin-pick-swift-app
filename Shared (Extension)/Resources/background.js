let pageTitles = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.titles) {
    pageTitles = message.titles;
  }
  sendResponse({ status: "Titles received" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTitles") {
    sendResponse({ titles: pageTitles });
  }
});
