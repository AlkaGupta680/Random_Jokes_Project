const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const body = document.body;
const wrapper = document.querySelector(".wrapper");

// Function to calculate the brightness of the background
function getBrightness(color) {
    const rgb = color.match(/\d+/g); // Extract RGB values from linear-gradient
    if (!rgb) return 0;
    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);

    // Use the luminance formula to calculate brightness
    return (r * 0.2126 + g * 0.7152 + b * 0.0722);
}

// Dynamic Background Colors
btn.addEventListener("click", () => {
    const colors = [
        "linear-gradient(135deg,rgba(212, 225, 23, 0.79),rgba(16, 14, 4, 0.67))",
        "linear-gradient(135deg,rgb(62, 98, 154), #c2e9fb)",
        "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
        "linear-gradient(135deg,rgba(72, 215, 205, 0.63),rgb(64, 115, 140))",
        "linear-gradient(135deg, #fccb90, #d57eeb)",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    body.style.background = randomColor;

    // Calculate brightness of the background
    const brightness = getBrightness(randomColor);

    // Change text color based on brightness
    if (brightness > 128) {
        // Light background, dark text
        jokeContainer.style.color = "#333";
    } else {
        // Dark background, light text
        jokeContainer.style.color = "#fff";
    }
});

// Fetch and Display Jokes with Animation
let getjoke = () => {
    fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single")
        .then((data) => data.json())
        .then((item) => {
            jokeContainer.textContent = `${item.joke}`;

            // Reset and trigger the fade animation
            jokeContainer.classList.remove("fade");  // Remove old fade class
            void jokeContainer.offsetWidth;  // Force reflow
            jokeContainer.classList.add("fade");  // Add fade class to trigger animation
        })
        .catch((error) => {
            jokeContainer.textContent = "Oops! Something went wrong. Try again.";
            console.error("Error fetching joke:", error);
        });
};

// Event listener for fetching joke
btn.addEventListener("click", getjoke);
getjoke(); // Initial joke fetch

// Wrapper Dragging Logic
let isDragging = false;
let startX, startY, offsetX, offsetY;

wrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    offsetX = wrapper.offsetLeft;
    offsetY = wrapper.offsetTop;
    e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const newX = offsetX + (e.clientX - startX);
    const newY = offsetY + (e.clientY - startY);
    wrapper.style.left = `${newX}px`;
    wrapper.style.top = `${newY}px`;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
