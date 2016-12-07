//document.addEventListener("mousemove", findPos);
document.addEventListener("mousedown", doMouseDown);
document.addEventListener("mouseup", doMouseUp);
//document.addEventListener("touchstart", doMouseDown, false);
//document.addEventListener("touchend", doMouseUp, false);

var canvasOffsetLeft = canvas.offsetLeft;
var canvasOffsetTop = canvas.offsetTop;


var mouse = {
	draw: function(){
		ctx.save();
        ctx.font = "28px Arial";
		ctx.textAlign = 'center';

		
		ctx.fillText('x: ' + this.x + ' at ' + (this.x / g.cw * 100).toFixed(2) + '% of canvas width', (g.cw / 2), (g.ch * 0.05));
		ctx.fillText('y: ' + this.y + ' at ' + (this.y / g.ch * 100).toFixed(2) + '% of canvas height', (g.cw / 2), (g.ch * 0.05) + 28);

		ctx.restore();
	}
};
var drawRect = function(x, y, w, h){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(x,y,w,h);
    ctx.closePath();
    ctx.restore();
};

function doMouseDown(e) {
	//mouse.x = e.ClientX;// - canvasOffsetLeft;
    //mouse.y = e.ClientY;// - canvasOffsetTop;
    mouse.x = e.clientX;// - canvasOffsetLeft;
    mouse.y = e.clientY;// - canvasOffsetTop;
    mouse.down = true;
    mouse.up = false;
}

function doMouseUp(e) {
    mouse.down = false;
    mouse.up = true;
}

function findPos(e) {
    mouse.x = e.clientX;// - canvasOffsetLeft;
    mouse.y = e.clientY;// - canvasOffsetTop;
}
