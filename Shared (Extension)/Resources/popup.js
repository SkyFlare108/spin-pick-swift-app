// Request titles from background.js
chrome.runtime.sendMessage({ action: "getTitles" }, (response) => {
  const titles = response.titles;
  populateTitleList(titles);
  drawWheel(titles);
});

// Function to populate list of titles
function populateTitleList(titles) {
  const titleList = document.getElementById("title-list");
  titleList.innerHTML = "";
  titles.forEach(title => {
    const listItem = document.createElement("li");
    listItem.textContent = title;
    titleList.appendChild(listItem);
  });
}

// Draw the roulette wheel on the canvas
function drawWheel(titles) {
  const canvas = document.getElementById("wheel");
  const ctx = canvas.getContext("2d");
  const numSlices = titles.length;
  const sliceAngle = (2 * Math.PI) / numSlices;

  titles.forEach((title, i) => {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, i * sliceAngle, (i + 1) * sliceAngle);
    ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff9900";
    ctx.fill();
    ctx.save();

    // Add text to each slice
    ctx.translate(150, 150);
    ctx.rotate((i + 0.5) * sliceAngle);
    ctx.fillStyle = "#000";
    ctx.fillText(title, 100, 0);
    ctx.restore();
  });
}

// Spin the wheel on click
document.getElementById("spin").addEventListener("click", () => {
  const spinTo = Math.floor(Math.random() * 360);
  const canvas = document.getElementById("wheel");
  canvas.style.transition = "transform 4s ease-out";
  canvas.style.transform = `rotate(${spinTo}deg)`;
});
