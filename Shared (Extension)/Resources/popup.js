// Draw the wheel and rotating arrow
function drawWheel(labels, arrowAngle = 0, selectedIdx = null) {
  const canvas = document.getElementById("wheel");
  const ctx = canvas.getContext("2d");
  const numSlices = labels.length;
  if (numSlices === 0) return;
  const sliceAngle = (2 * Math.PI) / numSlices;
  const colors = ["#ffcc00", "#ff9900", "#66ccff", "#ff6699", "#99ff99"];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw wheel slices
  for (let i = 0; i < numSlices; i++) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, i * sliceAngle, (i + 1) * sliceAngle);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.stroke();

    // Draw label
      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate(i * sliceAngle + sliceAngle / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = selectedIdx === i ? "#d00" : "#333";
      // Adjust font size based on label length
      const fontSize = labels[i].length > 18 ? 12 : 16;
      ctx.font = `${fontSize}px Arial`;
      // Truncate long labels
      let label = labels[i];
      if (label.length > 22) label = label.slice(0, 19) + "...";
      ctx.fillText(label, 100, 0);
      ctx.restore();
  }

  // Draw rotating arrow
  ctx.save();
  ctx.translate(150, 150);
  ctx.rotate(arrowAngle * Math.PI / 180);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -140);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // Draw arrow head
  ctx.beginPath();
  ctx.moveTo(0, -140);
  ctx.lineTo(-10, -120);
  ctx.lineTo(10, -120);
  ctx.closePath();
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();
}

let labels = [];
let currentAngle = 0;

browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
  browser.tabs.sendMessage(tabs[0].id, {action: "getPlaces"}).then(response => {
    labels = response?.places?.length ? response.places : [];
    drawWheel(labels, currentAngle);
  });
});

document.getElementById("spin").addEventListener("click", () => {
  const numSlices = labels.length;
  if (numSlices === 0) return;
  const sliceAngle = 360 / numSlices;

  // Pick a random label and random offset within the slice
  const selectedIdx = Math.floor(Math.random() * numSlices);
  const offset = Math.random() * sliceAngle;
  const targetAngle = selectedIdx * sliceAngle + offset;
  const spinTo = targetAngle + 720;

  let start = null;

  function animateArrow(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / 4000, 1);
    const angle = currentAngle + (spinTo - currentAngle) * progress;
    drawWheel(labels, angle);
    if (progress < 1) {
      requestAnimationFrame(animateArrow);
    } else {
      currentAngle = spinTo % 360;
      drawWheel(labels, currentAngle, selectedIdx);
    }
  }

  requestAnimationFrame(animateArrow);
});
