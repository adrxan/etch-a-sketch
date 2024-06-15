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
let resolution = 16;
let gridVisible = true;

function toggleGrid() {
  gridVisible = gridVisible ? false : true;
  gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

  clearPixels();
  makeGridPixels();
}

const gridContainer = document.querySelector("#grid-container");
gridContainer.style.width = gridContainer.style.height = `${gridSize}px`;
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

sliderValue.textContent = `${slider.value}²`;

function fillPixel() {
  this.style.backgroundColor = "black";
}

function makeGridPixels() {
  const numPixels = (resolution * resolution);

  for (let i = 0; i < (resolution * resolution); i++) {
    const gridPixel = document.createElement("div");

    if (gridVisible) {
      widthOrHeight = `${(parseInt(gridSize) / resolution) - 2}px`;
      gridPixel.style.border = "1px solid rgba(221, 221, 221, 0.5)";
    } else if (!gridVisible) {
      widthOrHeight = `${(parseInt(gridSize) / resolution)}px`
      gridPixel.style.border = "none";
    }

    gridPixel.style.width = gridPixel.style.height = widthOrHeight;
    
    gridPixel.addEventListener("mouseover", fillPixel);
    gridContainer.appendChild(gridPixel);
  }
}

makeGridPixels();

function clearPixels() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

slider.oninput = function () {
  let resValue = `${this.value}`;
  sliderValue.textContent = `${resValue}²`;
  clearPixels();
  resolution = this.value;
  makeGridPixels();
};

gridToggle.addEventListener("click", toggleGrid);

const clearBtn = document.querySelector("#clear-button");

