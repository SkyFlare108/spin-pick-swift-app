function getTitles() {
  let titles = [];
  
  if (window.location.href.includes("goodreads.com")) {
    document.querySelectorAll(".bookTitle").forEach((title) => titles.push(title.textContent.trim()));
  } else if (window.location.href.includes("amazon.com")) {
    document.querySelectorAll(".s-title-instructions-style").forEach((title) => titles.push(title.textContent.trim()));
  } else if (window.location.href.includes("netflix.com")) {
    document.querySelectorAll(".title-card-container").forEach((title) => titles.push(title.textContent.trim()));
  }

  return titles;
}

chrome.runtime.sendMessage({ titles: getTitles() });

