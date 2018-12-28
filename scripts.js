window.addEventListener('load', function(event) {
    // find the canvas element
    let canvasElement = document.querySelector('#canvas');

    // have it fill it's parent container
    let parentElement = canvasElement.parentNode;
    canvasElement.setAttribute('width', parentElement.offsetWidth);
    canvasElement.setAttribute('height', parentElement.offsetHeight);
});
