///Vector
function Vector(x, y){
	this.x = x;
	this.y = y;
	
	this.set = function(x, y){
		this.x = x;
		this.y = y;
	}
	this.setv = function(v){
		this.x = v.x;
		this.y = v.y;
	}
	this.add = function(x, y){
		this.x += x;
		this.y += y;
	}
	this.addv = function(v){
		this.x += v.x;
		this.y += v.y;
	}
}
//Rect
function Rect(x, y, w, h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
}