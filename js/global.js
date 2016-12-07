var canvas = document.createElement("canvas");
canvas.screencanvas = true;
//1334x750
//window.innerWidth = 2208 / 3;
//window.innerHeight = 1242 / 3;
//console.log('window.innerWidth: ' + window.innerWidth + ' : window.devicePixelRatio: ' + window.devicePixelRatio);

canvas.width = window.innerWidth; // * window.devicePixelRatio;
canvas.height = window.innerHeight; // * window.devicePixelRatio;

var ctx = canvas.getContext('2d'); //"experimental-webgl");
document.body.appendChild(canvas);



//global variables
g = {

    cw: canvas.width,
    ch: canvas.height,
    arrObjCollision: [],
}
//left and right buttons
var moveRight, moveLeft;