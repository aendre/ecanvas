$(function() {
	var canvas = document.getElementById("eCanvas");
	resizeCanvas(canvas);
	var scene = new Scene(canvas);
	var total_points = 50;

	_.each(Array(total_points),function(index){
		var radius = randomInt(15,3)
		// var radius = 50;
		var entity = scene.Circle(radius);
		var x = randomInt(canvas.width-20,20);
		var acceleration = randomInt(3000,500);
		entity.setXY(x,30).setFillColor('#60b86b');
		entity.vy = 10;
		entity.ax = acceleration;

		entity.update = function (timeDelta) {
			// elapsed time in seconds;
			var t = timeDelta / 1000;

			// var dx = (timeDelta / 1000) * this.vy;
			var dx =  (t * this.vy) + (Math.pow(t,2) * this.ax * 0.5);
			this.vy = this.vy + (this.ax * t);

			// console.log(this.vy, ' - > ', dx);

			var newY = this.getY() + dx;

			// var ballEdge = this.getY() + ;
			if (newY > (scene.canvas.height - this.radius)) {
				this.vy = this.vy * -1;
			}
			else if (newY > scene.mouseY - this.radius && this.y < scene.mouseY - this.radius) {				
				this.vy = this.vy * -1;
			}

			this.setY(newY);
		};

		scene.addToScene(entity);
	});

	var line = scene.Line().lineFrom(0,0).lineTo(canvas.width,0);
	line.update = function() {
		if (scene.mouseY) {
			this.lineFrom(0,scene.mouseY).lineTo(canvas.width,scene.mouseY);
		}
	}
	scene.addToScene(line);
	scene.initScene();
	
	function initialize(htmlCanvas) {
		window.addEventListener('resize', function() {
			resizeCanvas(htmlCanvas);
		}, false);		
	}
	function resizeCanvas(htmlCanvas) {
		htmlCanvas.width = window.innerWidth * 0.8;
		htmlCanvas.height = window.innerHeight * 0.8;
	}
	initialize(canvas);
})

function randomInt(max,min) {
	max = max || 1;
	min = min || 0;
	return Math.round(Math.random()*max + min);
};

