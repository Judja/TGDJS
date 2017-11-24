//BasicCamera
function BasicCamera(){
	this.position = new Vector(0, 0);
	this.focusPoint = new Vector(0, 0);
	this.zoom = 1;
	this.follow = null;
	
	this.update = function(dt){
		if(this.follow)
			this.followStep(dt)
	}
	this.configCTX = function(ctx){
		ctx.scale(this.zoom, this.zoom);
		ctx.translate(-this.position.x+this.focusPoint.x/this.zoom, -this.position.y+this.focusPoint.y/this.zoom);
	}
	this.setFollow = function(obj){
		this.follow = obj;
	}
	this.setPosition = function(x, y){
		this.position.set(x, y);
	}
	this.setFocusPoint = function(x, y){
		this.focusPoint.set(x, y);
	}
	this.followStep = function(){
		this.position.add((this.follow.position.x-this.position.x)*0.2, (this.follow.position.y-this.position.y)*0.2);
	}
}
//CAMERACREATORS
function createRectedCamera(x, y, w, h){
	var cam = new BasicCamera();
	cam.focusRect = new Rect(x, y, w, h);
	cam.dx = 0;
	cam.dy = 0;
	cam.ppx = 1;
	cam.ppy = 1;
	
	cam.update = function(){
		if(cam.follow){
			cam.followStep();
			cam.focusPoint.set(cam.position.x*cam.zoom*cam.ppx, cam.position.y*cam.zoom*cam.ppy);

			if(cam.focusPoint.x-cam.dx>cam.focusRect.width+cam.focusRect.x){
				cam.dx=cam.focusPoint.x-cam.focusRect.x-cam.focusRect.width;
			}
			if(cam.focusPoint.x-cam.dx<cam.focusRect.x){
				cam.dx = cam.focusPoint.x-cam.focusRect.x;
			}
			cam.focusPoint.x-=cam.dx;

			if(cam.focusPoint.y-cam.dy>cam.focusRect.height+cam.focusRect.y)
				cam.dy=cam.focusPoint.y-cam.focusRect.y-cam.focusRect.height;

			if(cam.focusPoint.y-cam.dy<cam.focusRect.y)
				cam.dy = cam.focusPoint.y-cam.focusRect.y;

			cam.focusPoint.y-=cam.dy;
		}
	}
	return cam;
}

function createWorldRectedCamera(x, y, w, h){
	var cam = createRectedCamera(x, y, w, h);
	cam.displayHeight = 0;
	cam.configFrame = function(x, y, w, h, ww, hh){
		cam.ppx = ww/w;
		cam.ppy = hh/h;
		cam.position.set(x+w/2, y+h/2);
		cam.focusPoint.set(ww/2, hh/2);
		cam.zoom = 1;
		cam.displayHeight = hh;
	}
	cam.configCTX = function(ctx){
		ctx.scale(1, -1)
		ctx.translate(0, -cam.displayHeight)
		ctx.scale(cam.ppx*cam.zoom, cam.ppy*cam.zoom);
		ctx.translate(-cam.position.x+cam.focusPoint.x/cam.zoom/cam.ppx, -cam.position.y+cam.focusPoint.y/cam.zoom/cam.ppy)		
	}
	cam.toWorldX = function(X){
		return cam.position.x - (cam.focusPoint.x - X)/cam.ppx/cam.zoom;
	}
	cam.toWorldY = function(Y){
		return cam.position.y+(cam.focusPoint.y-Y)/cam.ppy/cam.zoom;
	}
	cam.setFollow = function(obj){
		if(cam.follow){
			if(cam.follow.width) cam.focusRect.x+=cam.follow.width*0.5*cam.ppx;
			if(cam.follow.height) cam.focusRect.y+=cam.follow.height*0.5*cam.ppx;
		}
		if(obj.width) cam.focusRect.x-=obj.width*0.5*cam.ppx;
		if(obj.height) cam.focusRect.y-=obj.height*0.5*cam.ppx;
		cam.follow = obj;
	}

	return cam;
}