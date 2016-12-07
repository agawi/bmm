
//this works
function Class(x, y){
	this.x = x;
	this.y = y;
}

var object = {
	getX: function(){
		return this.prototype.x;
	},
	getY: function(){
		return this.prototype.y;
	}
	
};


object.prototype = new Class(3, 4);

console.log(object.getX() + ' ' + object.getY());