///////////////////////////////////////////
//////////////     ENTITY     /////////////
///////////////////////////////////////////

var Entity = function(ctx) {
	// Create class properties
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.ctx = ctx;
	this.onRequestAnimation;
	this.fillColor;
};

Entity.prototype.setXY = function(x,y) {
	this.x = x;
	this.y = y;
	return this;
};

Entity.prototype.getX = function() {
	return this.x;
};

Entity.prototype.getY = function() {
	return this.y;
};

Entity.prototype.setX = function(x) {
	this.x = x;
};

Entity.prototype.setY = function(y) {
	this.y = y;
};

Entity.prototype.setFillColor = function(color) {
	this.fillColor = color;
	return this;
};

Entity.prototype.setAnimation = function(callback) {
	this.onRequestAnimation = callback;
	return this;
};

Entity.prototype.render = function render() {
	return this;
};

///////////////////////////////////////////
//////////////     CIRCLE     /////////////
///////////////////////////////////////////

Circle = function Circle(ctx,radius) {
	// call super constructor
	Entity.call(this,ctx);

	// Create class properties
	this.radius = radius || 0;
};

// Circle extends Entity
Circle.prototype = Object.create(Entity.prototype);
Circle.prototype.constructor = Circle;

// Overwrite the render
Circle.prototype.render = function() {
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	this.ctx.fillStyle = this.fillColor;
	this.ctx.fill();
	return this;
}

///////////////////////////////////////////
//////////////    RECTANLGE   /////////////
///////////////////////////////////////////

Rectangle = function(ctx,width,height) {
	// call super constructor
	Entity.call(this,ctx);

	// Create class properties
	this.width = width || 0;
	this.height = height || 0;
};

// Rectangle extends Entity
Rectangle.prototype = Object.create(Entity.prototype);
Rectangle.prototype.constructor = Rectangle;

// Overwrite the render
Rectangle.prototype.render = function() {
	this.ctx.beginPath();
	this.ctx.rect(this.x, this.y,this.width, this.height);
	this.ctx.fillStyle = this.fillColor;
	this.ctx.fill();
	return this;
}

///////////////////////////////////////////
//////////////     Scene     //////////////
///////////////////////////////////////////

Scene = function(canvas) {
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");

	this.mouseX;
	this.mouseY;
	this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this),false);
};

Scene.prototype.handleMouseMove = function(evt) {
	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
		  x: evt.clientX - rect.left,
		  y: evt.clientY - rect.top
		};
	};

	var mousePos = getMousePos(this.canvas, evt);
	this.mouseX = Math.floor(mousePos.x);
	this.mouseY = Math.floor(mousePos.y);
};

Scene.prototype.clearCanvas = function() {
	 this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Scene.prototype.Circle = function(radius) {
	return new Circle(this.ctx,radius);
};

Scene.prototype.Rectangle = function(width,height) {
	return new Rectangle(this.ctx,width,height);
};

Scene.prototype.animate = function(objects) {
	var ctx = this.ctx;
	var self = this;
		
	// clear
	this.clearCanvas();

	_.each(objects, function iterate(obj){
		// set new value		
		obj.onRequestAnimation(obj);		
		// draw object
		obj.render();		
	});

	// request new frame
	requestAnimFrame(function() {
		self.animate(objects);
	});
};


window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();