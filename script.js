const gridSize = getComputedStyle(document.body).getPropertyValue(
  "--grid-width"
);
const accentColor = getComputedStyle(document.body).getPropertyValue(
  "--accent-color"
);
const inactiveColor = getComputedStyle(document.body).getPropertyValue(
  "--inactive-color"
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

function fillPixel(e) {
  if (e.type === "mousedown") {
    isDrawing = true;
    e.target.style.backgroundColor = "black";
  }
  else if (e.type === "mouseover" && isDrawing) {
    e.target.style.backgroundColor = "black";
  } 
  else isDrawing = false;
}

function makeGridPixels() {
  const numPixels = (resolution * resolution);
  let widthOrHeight = 0;

  for (let i = 0; i < numPixels; i++) {
    const gridPixel = document.createElement("div");

    if (gridVisible) {
      widthOrHeight = `${(parseInt(gridSize) / resolution) - 2}px`;
      gridPixel.style.border = "1px solid rgba(221, 221, 221, 0.5)";
    } else if (!gridVisible) {
      widthOrHeight = `${(parseInt(gridSize) / resolution)}px`
      gridPixel.style.border = "none";
    }

    gridPixel.style.width = gridPixel.style.height = widthOrHeight;
    
    gridPixel.addEventListener("mousedown", (e) => fillPixel(e));
    gridPixel.addEventListener("mouseover", (e) => fillPixel(e));
    fullPage.addEventListener("mouseup", (e) => fillPixel(e));
    gridPixel.addEventListener ("dragstart", (e) => {e.preventDefault()});

    gridContainer.appendChild(gridPixel);
  }
}

makeGridPixels();

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
  gridVisible = gridVisible ? false : true;
  gridIcon.style.color = gridVisible ? accentColor : inactiveColor;

  let r = confirm("This will clear the drawing. Continue?");
  if (r) {
    clearGridPixels();
    makeGridPixels();
  }
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

