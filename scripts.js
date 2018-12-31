'use strict';

window.addEventListener('load', function(event) {

    // Settings
    // ==================================================
    // For a single bar
    var bar = {
        defaultThickness: 2,
        maxThickness: 16,
        width: 150
    };

    // layout settings
    var columnMargin = 30;
    var rowMargin = 8;

    // updated via functions
    var canvasWidth = 0;
    var canvasHeight = 0;
    var numberOfColumns = 1;
    var numberOfRows = 10;


    // find the canvas element
    var canvasElement = document.querySelector('#canvas');
    var parentElement = canvasElement.parentNode;

    updateCanvasSize();

    function updateCanvasSize() {
        // find the best width
        // ----------------------------------------
        // take the parent element width and see how many columns + margins we can fit
        var widthUnit = bar.width + columnMargin,
            // we want everything flush so remove the last margin
            startingWidth = parentElement.offsetWidth - columnMargin;

        numberOfColumns = Math.floor(startingWidth / widthUnit);
        canvasWidth     = (numberOfColumns * widthUnit) - columnMargin;

        // find the best height
        // ----------------------------------------
        var heightUnit = bar.maxThickness + rowMargin,
            startingHeight = parentElement.offsetHeight - rowMargin;

        numberOfRows    = Math.floor(startingHeight / heightUnit);
        canvasHeight    = numberOfRows * heightUnit;

        // update the DOM
        // ----------------------------------------
        canvasElement.setAttribute('width', canvasWidth);
        canvasElement.setAttribute('height', canvasHeight);
    }



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


    var startingX = 0,
        startingY = 12,
        currentX = startingX,
        currentY = startingY;


    // start making columns
    // a single bar knows it's x, y, lineWidth, length
    for (var i = 0; i < numberOfColumns; i++) {
        // how many items per column?
        for (var j = 0; j < numberOfRows; j++) {
            // push new bar to array
            bars.push({
                x:          currentX,
                y:          currentY,
                lineWidth:  bar.defaultThickness,
                length:     bar.width
            });
            // move the currentY
            currentY += bar.maxThickness + rowMargin;
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
            settings.lineWidth = settings.lineWidth + (bar.defaultThickness - settings.lineWidth) * 0.125;
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
