const gridSize = 600;
let resolution = 16;

const gridContainer = document.querySelector("#grid-container");
gridContainer.style.width = gridContainer.style.height = `${gridSize}px`;

function fillPixel() {
    this.style.backgroundColor = "black";
}

function makeGridPixels() {
    const numPixels = (resolution * resolution);
    const widthOrHeight = `${(gridSize / resolution) - 2}px`;

    for (let i = 0; i < (resolution * resolution); i++) {
        const gridPixel = document.createElement('div');

        gridPixel.style.width = gridPixel.style.height = `${(gridSize / resolution) - 2}px`
        gridPixel.classList.add("grid-pixel");
        gridContainer.appendChild(gridPixel);

        gridPixel.addEventListener("mouseover", fillPixel);
    }
}

makeGridPixels();