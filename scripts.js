'use strict';

window.addEventListener('load', function(event) {
    // find the canvas element
    var canvasElement = document.querySelector('#canvas');


    // have it fill it's parent container
    // ==================================================
    var parentElement = canvasElement.parentNode;

    var canvasWidth = parentElement.offsetWidth;
    var canvasHeight = parentElement.offsetHeight;

    canvasElement.setAttribute('width', canvasWidth);
    canvasElement.setAttribute('height', canvasHeight);


    // add some event listeners
    // ==================================================
    // we have to do some math to find the mouse position relative to the canvas
    var offsetLeft = canvasElement.offsetLeft;
    var offsetTop = canvasElement.offsetTop;
    var mouseX = 0;
    var mouseY = 0;

    canvasElement.addEventListener('mousemove', function(event) {
        mouseX = event.clientX - offsetLeft;
        mouseY = event.clientY - offsetTop;
    })


    // canvas setup
    // ==================================================
    // get the drawing context
    var canvas = canvasElement.getContext('2d');
    // fill style set to light-white
    canvas.fillStyle = '#ebebeb';
    canvas.strokeStyle = '#ebebeb';


    // make the bars array
    // ==================================================
    var bars = [];

    // bar settings
    var bar = {
        defaultThickness: 2,
        maxThickness: 10,
        width: 150
    };

    // layout settings
    var columnMargin = 30;

    // how many columns can we fit?
    var numberOfColumns = Math.floor(canvasWidth / (bar.width + columnMargin));

    var startingX = 0,
        startingY = 12,
        currentX = startingX,
        currentY = startingY;


    // start making columns
    // a single bar knows it's x, y, lineWidth, length
    for (var i = 0; i < numberOfColumns; i++) {
        // how many items per column?
        for (var j = 0; j < 25; j++) {
            // push new bar to array
            bars.push({
                x:          currentX,
                y:          currentY,
                lineWidth:  bar.defaultThickness,
                length:     bar.width
            });
            // move the currentY
            currentY += 20;
        }

        currentX += bar.width + columnMargin;
        currentY = startingY;
    }



    // draws a line based on the currentX and currentY
    function drawBar(settings) {
        // determine drawing thickness
        var lineWidth = bar.defaultThickness;

        // hit check
        var yOffset = Math.floor(bar.maxThickness / 2);
        if (
            mouseX > settings.x &&
            mouseX < (settings.x + bar.width) &&
            mouseY > (settings.y - yOffset) &&
            mouseY < (settings.y + yOffset)
        ) {
            // increase size
            settings.lineWidth = settings.lineWidth + (bar.maxThickness - settings.lineWidth) * 0.5;
        } else {
            // decrease size
            settings.lineWidth = settings.lineWidth + (bar.defaultThickness - settings.lineWidth) * 0.5;
        }

        // set the line width
        canvas.lineWidth = settings.lineWidth;

        // start drawing
        canvas.beginPath();
        // starting point
        canvas.moveTo(settings.x, settings.y);
        // draw line to end point
        canvas.lineTo(settings.x + bar.width, settings.y);
        // close the line
        canvas.stroke();
    }

    function drawGrid() {
        // clear the canvas
        canvas.clearRect(0, 0, canvasWidth, canvasHeight);

        // draw the grid
        for (var i = 0; i < bars.length; i++) {
            drawBar(bars[i]);
        }

        // loop
        window.requestAnimationFrame(drawGrid);
    }

    drawGrid();
});
