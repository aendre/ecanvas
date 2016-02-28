///////////////////////////////////////////
//////////////     ENTITY     /////////////
///////////////////////////////////////////

var Entity = function(ctx) {
	this.ctx = ctx;
	
	// Position
	this.x = 0;
	this.y = 0;
	// Velocity
	this.vx = 0;
	this.vy = 0;
	// Acceleration
	this.ax = 0;
	this.ay = 0;

	this.id;	
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

Entity.prototype.setId = function(id) {
	this.id = id;
};

Entity.prototype.getId = function() {
	return this.id;
};

Entity.prototype.setFillColor = function(color) {
	this.fillColor = color;
	return this;
};

Entity.prototype.render = function render() {
	return this;
};

Entity.prototype.update = function update(timeDelta) {
    // pixels / second
	var linearSpeed = 100;
	
	var newX = (timeDelta / 1000) * linearSpeed;

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
//////////////      LINE      /////////////
///////////////////////////////////////////

Line = function Line(ctx) {
	// call super constructor
	Entity.call(this,ctx);

	this.xTo = 0;
	this.yTo = 0;
};

// Line extends Entity
Line.prototype = Object.create(Entity.prototype);
Line.prototype.constructor = Line;

// Overwrite the render
Line.prototype.lineFrom = function(x,y) {
	this.x = x;
	this.y = y;
	return this;
}

// Overwrite the render
Line.prototype.lineTo = function(x,y) {
	this.xTo = x;
	this.yTo = y;
	return this;
}
// Overwrite the render
Line.prototype.render = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(this.x, this.y);
	this.ctx.lineTo(this.xTo, this.yTo);
	this.ctx.stroke();
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
	// entities that are going to be animated
	this.entities = {};
	this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this),false);
};

Scene.prototype.Circle = function(radius) {
	return new Circle(this.ctx,radius);
};

Scene.prototype.Rectangle = function(width,height) {
	return new Rectangle(this.ctx,width,height);
};

Scene.prototype.Line = function() {
	return new Line(this.ctx);
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

Scene.prototype.addToScene = function(entity) {
	var uniqueId = _.uniqueId('entity_');
	entity.setId(uniqueId);
	this.entities[uniqueId] = entity;
	return uniqueId;
};

Scene.prototype.animate = function(lastFrameTimestamp) {
	var self = this;
	
	// The time elapsed in milisec since last frame
	var now = new Date().getTime();
    var timeDelta = now - lastFrameTimestamp;

	// clear
	this.clearCanvas();

	_.each(this.entities, function iterate(entity,id){
		// update entity
		entity.update(timeDelta);

		// draw entity
		entity.render();
	});

	// request new frame
	requestAnimFrame(function() {
		self.animate(now);
	});
};

Scene.prototype.initScene = function() {
	// Get the time in miliseconds
	var startTime = (new Date()).getTime();
	this.animate(startTime);
}


window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();