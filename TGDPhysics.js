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
	this.addm = function(v, m){
		this.x += v.x*m
		this.y += v.y*m
	}
	this.scale = function(mul){
		this.x*=mul
		this.y*=mul
	}
	this.norm = function(){
		var R = Math.sqrt(this.x*this.x + this.y*this.y)
		this.x /= R
		this.y /= R
		if (R == 0){
			this.x = 0
			this.y = 0
		}
	}
	this.dist = function(v){
		var lenX = v.x - this.x
		var lenY = v.y - this.y
		return Math.sqrt(lenX*lenX + lenY*lenY)
	}
	this.len = function(){
		return Math.sqrt(this.x*this.x + this.y*this.y)
	}
}
//
function randi(i){
	return Math.floor(Math.random()*i)
}
//Rect
function Rect(x, y, w, h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
}

function rectCol(x1, y1, w1, h1, x2, y2, w2, h2){
	if(x1<x2+w2&&x1+w1>x2&&y1<y2+h2&&y1+h1>y2) return true;
	else
		return false;
}
var COL_NONE = 0;
var COL_LEFT = 1;
var COL_UP = 2;
var COL_RIGHT = 3;
var COL_DOWN = 4;

function rectColAdv(x1, y1, w1, h1, x2, y2, w2, h2){
	if(x1<x2+w2&&x1+w1>x2&&y1<y2+h2&&y1+h1>y2){
		//if()
	}
	else
		return COL_NONE;
}