'use strict';

window.addEventListener('load', function(event) {

    // Settings
    // ==================================================
    // For a single bar
    var bar = {
        defaultThickness: 2,
        maxThickness: 10,
        width: 150
    };

    // layout settings
    var columnMargin = 30;

    // updated via functions
    var canvasWidth = 0;
    var canvasHeight = 0;
    var numberOfColumns = 1;



    // find the canvas element
    var canvasElement = document.querySelector('#canvas');
    var parentElement = canvasElement.parentNode;

    updateCanvasSize();

    function updateCanvasSize() {
        // take the parent element width and see how many columns + margins we can fit
        var unit = bar.width + columnMargin;
        // we want everything flush so remove the last margin
        var startingWidth = parentElement.offsetWidth - columnMargin;

        // update our globals
        numberOfColumns = Math.floor(startingWidth / unit);
        canvasWidth = numberOfColumns * unit;
        // TODO
        canvasHeight = parentElement.offsetHeight;
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
