'use strict';

window.addEventListener('load', function(event) {
    // find the canvas element
    var canvasElement = document.querySelector('#canvas');
    // get the drawing context
    var canvas = canvasElement.getContext('2d');

    // have it fill it's parent container
    var parentElement = canvasElement.parentNode;
    var canvasWidth = parentElement.offsetWidth;
    var canvasHeight = parentElement.offsetHeight;
    canvasElement.setAttribute('width', canvasWidth);
    canvasElement.setAttribute('height', canvasHeight);

    // fill style set to light-white
    canvas.fillStyle = '#ebebeb';
    canvas.strokeStyle = '#ebebeb';

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
        // console.log(mouseX, mouseY);
    })


    // make the bars
    // ==================================================
    // layout settings
    var startingX = 0;
    var startingY = 12;
    var currentX = startingX;
    var currentY = startingY;

    // bar settings
    var bar = {
        defaultThickness: 2,
        maxThickness: 10,
        width: 150
    };


    // draws a line based on the currentX and currentY
    function drawLine() {
        // set the drawing thickness
        var yOffset = Math.floor(bar.maxThickness / 2);
        if (
            mouseX > currentX &&
            mouseX < (currentX + bar.width) &&
            mouseY > (currentY - yOffset) &&
            mouseY < (currentY + yOffset)
        ) {
            canvas.lineWidth = bar.maxThickness;
        } else {
            canvas.lineWidth = bar.defaultThickness;
        }
        // start drawing
        canvas.beginPath();
        // starting point
        canvas.moveTo(currentX, currentY);
        // draw line to end point
        canvas.lineTo(currentX + bar.width, currentY);
        // close the line
        canvas.stroke();
    }

    // how many columns can we fit?
    var columnMargin = 30;
    var numberOfColumns = Math.floor(canvasWidth / (bar.width + columnMargin));


    function drawGrid() {

        currentX = startingX;
        currentY = startingY;

        // start making columns
        for (var i = 0; i < numberOfColumns; i++) {
            // how many items per column?
            for (var j = 0; j < 25; j++) {
                // draw line
                drawLine();
                // move the currentY
                currentY += 20;
            }

            currentX += bar.width + columnMargin;
            currentY = startingY;
        }

        requestAnimationFrame(drawGrid);
    }

    drawGrid();
});
