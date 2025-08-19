function drawInstructions(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.font = '16px Arial, sans-serif';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const instructions = [
    "Use this extension to help",
    "you pick a place to go on",
    "     Google Searches     ",
  ];

  const x = canvas.width / 2;
  const startY = canvas.height / 2 - (instructions.length * 18) / 2;
  for (let i = 0; i < instructions.length; i++) {
    ctx.fillText(instructions[i], x, startY + i * 18);
  }
  ctx.restore();
}

// Draw the wheel and fixed arrow
function drawWheel(labels, wheelAngle = 0, selectedIdx = null) {
  const canvas = document.getElementById("wheel");
  const ctx = canvas.getContext("2d");
  const spinBtn = document.getElementById("spin");

  if (!labels.length) {
    drawInstructions(ctx, canvas);
    spinBtn.style.display = "none";
    return;
  } else {
    spinBtn.style.display = "block";
  }

  const numSlices = labels.length;
  const sliceAngle = (2 * Math.PI) / numSlices;
  const colors = ["#ffcc00", "#ff9900", "#66ccff", "#ff6699", "#99ff99"];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw wheel (rotated by wheelAngle)
  ctx.save();
  ctx.translate(150, 150);
  ctx.rotate(wheelAngle * Math.PI / 180);

  for (let i = 0; i < numSlices; i++) {
    // Draw slice
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 150, i * sliceAngle, (i + 1) * sliceAngle);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.stroke();

    // Draw label with word wrapping, stacking lines vertically
    ctx.save();
    ctx.rotate(i * sliceAngle + sliceAngle / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#333";
    ctx.font = `13px "Comic Sans MS", "Cursive", sans-serif`;

    let label = labels[i];
    const maxLineLength = 10;
    const words = label.split(" ");
    let lines = [];
    let currentLine = "";

    for (let word of words) {
      if ((currentLine + " " + word).trim().length <= maxLineLength) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    const radius = 110;
    const lineHeight = 16;
    const totalHeight = lineHeight * (lines.length - 1);
    for (let j = 0; j < lines.length; j++) {
      ctx.fillText(lines[j], radius, -totalHeight / 2 + j * lineHeight);
    }
    ctx.restore();
  }
  ctx.restore();

  // Draw fixed arrow (shorter)
  ctx.save();
  ctx.translate(150, 150);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -110);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // Draw arrow head
  ctx.beginPath();
  ctx.moveTo(0, -110);
  ctx.lineTo(-10, -95);
  ctx.lineTo(10, -95);
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
  }).catch(() => {
    drawWheel([], 0);
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
  const spinTo = currentAngle + 720 + targetAngle;

  // Randomize duration between 2000ms and 5000ms
  const duration = 2000 + Math.random() * 3000;

  let start = null;

  function animateWheel(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const angle = currentAngle + (spinTo - currentAngle) * progress;
    drawWheel(labels, angle);
    if (progress < 1) {
      requestAnimationFrame(animateWheel);
    } else {
      currentAngle = spinTo % 360;
      drawWheel(labels, currentAngle, selectedIdx);
    }
  }

  requestAnimationFrame(animateWheel);
});
