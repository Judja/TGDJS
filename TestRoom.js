//TestRoom4Cam
var lastFrame = Date.now();
var lastfps = Date.now();
var dt;
var fps  = 0;
var testctx=document.getElementById("canv2").getContext("2d");
var cantest=document.getElementById("canv2");
function TestRoom(id){
	this.shapes = [];
	this.display = document.getElementById(id);
	this.context = this.display.getContext('2d');
	this.camera = createRectedCamera(200, 200, 400, 200);

	this.draw = function(){
	this.camera.setFollow(this.shapes[0]);
	this.context.clearRect(0, 0, 800, 600);

		dt = Date.now() - lastFrame;
	lastFrame = Date.now();
	if(Date.now()-lastfps>1000){
		lastfps = Date.now();
		fps  =  Math.floor(1000/dt);
	}
		this.context.save();
		this.camera.update();
		this.camera.configCTX(this.context);
		for(var i = 0; i<this.shapes.length; i++){
			this.shapes[i].draw(this.context)
		}
		this.context.restore();
		this.context.font = "bold 20 px sans-serif";
		this.context.fillStyle = "blue";
		this.context.fillText(fps, 20, 30);
		this.context.fillText("DX: "+this.camera.dx+" DY: "+this.camera.dy, 20, 50)
		this.strokeStyle = "black";
		this.lineWidth = 5;
		this.context.beginPath();
		this.context.moveTo(this.camera.focusPoint.x, 0);
		this.context.lineTo(this.camera.focusPoint.x, 600);
		this.context.moveTo(0, this.camera.focusPoint.y);
		this.context.lineTo(800, this.camera.focusPoint.y);
		this.context.strokeRect(this.camera.focusRect.x, this.camera.focusRect.y, this.camera.focusRect.width, this.camera.focusRect.height);
		this.context.stroke();
		requestAnimationFrame(function(){

			testRoom.draw()
		})

	}
	this.draw2=function(){
		testctx.save()
		this.camera.update()
		this.camera.configCTX(testctx)
		this.context.drawImage(cantest, 0, 0)
		testctx.restore()

		requestAnimationFrame(function(){
			testRoom.draw2()
		})

	}
}
//TestShapes
var img = document.getElementById("img");
function Circle(x, y){
//this.position = new Vector(Math.random()*500, Math.random()*500)
this.position = new Vector(x||0, y||0);
	this.draw = function(ctx){
		ctx.save();
		ctx.scale(1, -1);
		ctx.translate(0, -this.position.y*2-50)
		ctx.drawImage(img, this.position.x, this.position.y, 50, 50)

		ctx.restore();
	}
}
