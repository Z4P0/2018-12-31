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


    // make the bars
    // ==================================================
    // how many can we fit if the min-width is 150
    // // draw 1 bar
    // canvas.fillRect(100, 100, 150, 2);

    // // use a stroke instead?
    // for (var i = 0; i < 10; i++) {
    //     canvas.lineWidth = 1 + i;
    //     canvas.beginPath();
    //     canvas.moveTo(5 + i * 14, 5);
    //     canvas.lineTo(5 + i * 14, 140);
    //     canvas.stroke();
    // }

    // layout settings
    var startingX = 0;
    var startingY = 2;
    var currentX = startingX;
    var currentY = startingY;

    // bar settings
    var bar = {
        defaultThickness: 2,
        maxThickness: 10,
        width: 150
    };



    // // draw 1 line
    // // ----------------------------------------
    // // set the drawing thickness
    // canvas.lineWidth = bar.defaultThickness;
    // // start drawing
    // canvas.beginPath();
    // // starting point
    // canvas.moveTo(currentX, currentY);
    // // draw line to end point
    // canvas.lineTo(currentX + bar.width, currentY);
    // // close the line
    // canvas.stroke();


    // draws a line based on the currentX and currentY
    function drawLine() {
        // set the drawing thickness
        canvas.lineWidth = bar.defaultThickness;
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
    // how many items per column?
    // draw 1 column
    for (var i = 0; i < 10; i++) {
        // draw line
        drawLine();
        // move the currentY
        currentY += 20;
    }
});
