const gridSize = getComputedStyle(document.body).getPropertyValue(
  "--grid-width"
);
const accentColor = getComputedStyle(document.body).getPropertyValue(
  "--accent-color"
);
const inactiveColor = getComputedStyle(document.body).getPropertyValue(
  "--inactive-color"
);
const activeBtnColor = getComputedStyle(document.body).getPropertyValue(
  "--active-button-color"
);
const frameColor = getComputedStyle(document.body).getPropertyValue(
  " --frame--color"
);

const gridToggle = document.querySelector("#grid-toggle");
const fullPage = document.querySelector("body");
let resolution = 16;
let gridVisible = true;

let isDrawing = false;

const gridContainer = document.querySelector("#grid-container");
gridContainer.style.width = gridContainer.style.height = `${gridSize}px`;
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
sliderValue.textContent = `${slider.value}²`;

const brush = document.querySelector("#brush-button");
const eraser = document.querySelector("#eraser-button");

let isBrushing = true;
let isErasing = false;

if (isBrushing) {
  brush.style.backgroundColor = activeBtnColor;
}

eraser.addEventListener("click", () => {
  isErasing = true;
  isBrushing = false;
  if (isErasing) {
    eraser.style.backgroundColor = activeBtnColor;
    brush.style.backgroundColor = frameColor;
  }
});

brush.addEventListener("click", () => {
  isErasing = false;
  isBrushing = true;
  if (!isErasing) {
    brush.style.backgroundColor = activeBtnColor;
    eraser.style.backgroundColor = frameColor;
  }
});

const pickColor = document.querySelector("#color-button");
let fillColor = pickColor.value;

pickColor.oninput = function () {
  fillColor = this.value;
};

let isRandom = false;
const randomIcon = document.querySelector("#random-icon");
randomIcon.style.color = inactiveColor;

function toggleRandom() {
  isRandom = !isRandom;
  randomIcon.style.color = isRandom ? accentColor : inactiveColor;
}

const randomBtn = document.querySelector("#random-button");
randomBtn.addEventListener("click", toggleRandom);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function fillPixel(e) {
  if (e.type === "mousedown") {
    isDrawing = true;
    if (isErasing) {
      e.target.style.backgroundColor = "white";
    } else {
      e.target.style.backgroundColor = isRandom ? getRandomColor() : fillColor;
    }
  } else if (e.type === "mouseover" && isDrawing) {
    if (isErasing) {
      e.target.style.backgroundColor = "white";
    } else {
      e.target.style.backgroundColor = isRandom ? getRandomColor() : fillColor;
    }
  } else {
    isDrawing = false;
  }
}

function makeGridPixels() {
  const numPixels = resolution * resolution;

  for (let i = 0; i < numPixels; i++) {
    const gridPixel = document.createElement("div");

    if (gridVisible) {
      gridPixel.style.width = gridPixel.style.height = `${
        parseInt(gridSize) / resolution - 2
      }px`;
      gridPixel.style.border = "1px solid rgba(221, 221, 221, 0.5)";
    } else {
      gridPixel.style.width = gridPixel.style.height = `${
        parseInt(gridSize) / resolution
      }px`;
      gridPixel.style.border = "none";
    }

    gridPixel.addEventListener("mousedown", (e) => fillPixel(e));
    gridPixel.addEventListener("mouseover", (e) => fillPixel(e));
    fullPage.addEventListener("mouseup", (e) => fillPixel(e));
    gridPixel.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });

    gridContainer.appendChild(gridPixel);
  }
}

function clearGridPixels() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

slider.oninput = function () {
  resolution = this.value;
  sliderValue.textContent = `${this.value}²`;
  clearGridPixels();
  makeGridPixels();
};

const gridIcon = document.querySelector("#grid-icon");

function toggleGrid() {
  gridVisible = !gridVisible;
  gridIcon.style.color = gridVisible ? accentColor : inactiveColor;

  const gridPixels = gridContainer.querySelectorAll("div");

  gridPixels.forEach((gridPixel) => {
    if (gridVisible) {
      gridPixel.style.border = "1px solid rgba(221, 221, 221, 0.5)";
      gridPixel.style.width = gridPixel.style.height = `${
        parseInt(gridSize) / resolution - 2
      }px`;
    } else {
      gridPixel.style.border = "none";
      gridPixel.style.width = gridPixel.style.height = `${
        parseInt(gridSize) / resolution
      }px`;
    }
  });
}

gridToggle.addEventListener("click", toggleGrid);

const clearBtn = document.querySelector("#clear-button");

clearBtn.addEventListener("click", () => {
  let r = confirm("This will clear the drawing. Continue?");
  if (r) {
    clearGridPixels();
    makeGridPixels();
  }
});

makeGridPixels();
