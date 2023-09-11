const { createCanvas } = require('canvas');
const fs = require('fs');
const canvas = createCanvas(800, 600);
const context = canvas.getContext('2d');

// Clear canvas with a white background
context.fillStyle = '#ffffff';
context.fillRect(0, 0, canvas.width, canvas.height);

// Function to generate a random color similar to colored pencils
function getRandomColor() {
    const colors = ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#073B4C', '#F4A261', '#E76F51'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to draw an imperfect squiggly line
function drawImperfectLine(x1, y1, x2, y2, color, thickness) {
    context.strokeStyle = color;
    context.lineWidth = thickness;

    context.beginPath();
    context.moveTo(x1, y1);

    // Simulate a squiggly line with random small deviations
    const segments = 20;
    for (let i = 0; i < segments; i++) {
        const cx = (x1 + x2) / 2 + (Math.random() - 0.5) * 30; // Random deviation
        const cy = (y1 + y2) / 2 + (Math.random() - 0.5) * 30; // Random deviation
        context.quadraticCurveTo(x1, y1, cx, cy);
        x1 = cx;
        y1 = cy;
    }

    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

// Generate a random kids' drawing with squiggly lines
const numLines = Math.floor(Math.random() * 50 + 30); // Random number of lines between 30 and 80

for (let i = 0; i < numLines; i++) {
    const x1 = Math.random() * canvas.width;
    const y1 = Math.random() * canvas.height;
    const x2 = Math.random() * canvas.width;
    const y2 = Math.random() * canvas.height;
    const color = getRandomColor();
    const thickness = Math.random() * 5 + 1; // Random thickness between 1 and 6

    drawImperfectLine(x1, y1, x2, y2, color, thickness);
}

// Save the canvas as an image file
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('kids_drawing_lines.png', buffer);
console.log('Random kids\' drawing with squiggly lines saved as kids_drawing_lines.png');
