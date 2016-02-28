$(function() {
	var canvas = document.getElementById("eCanvas");
	var scene = new Scene(canvas);
	var total_points = 50;

	_.each(Array(total_points),function(index){
		var radius = randomInt(10,3)
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
})

function randomInt(max,min) {
	max = max || 1;
	min = min || 0;
	return Math.round(Math.random()*max + min);
};
	// for(var i=0; i<points; i++) {
	// 	var radius = randomInt(10);		
	// 	var x = randomInt(canvas.width);
	// 	var y = randomInt(canvas.height);
	// 	var entity = Math.random() > 0.5 ? scene.Circle(radius) : scene.Rectangle(radius,radius);
	// 	entity.setXY(x,y).setFillColor('#60b86b');
	// 	entity.xDirection = Math.random() > 0.5 ? 1 : -1;
	// 	entity.yDirection = Math.random() > 0.5 ? 1 : -1;
	// 	entity.speed = randomInt(2,1);
	// 	entity.update = function (timeDelta) {
	// 		var attraction = 4;
	// 		var attractionDistance = 150;

	// 		if (scene.mouseX && scene.mouseY) {
	// 			var a = scene.mouseX - this.getX();
	// 			var b = scene.mouseY - this.getY();
	// 			var distance = Math.sqrt( a*a + b*b );
	// 			if (distance<attractionDistance) {
	// 				if (Math.abs(scene.mouseX - this.getX()) > attraction) {
	// 					var x = this.getX() + (scene.mouseX > this.getX() ? attraction : -attraction);
	// 					this.setX(x);
	// 				}
	// 				if (Math.abs(scene.mouseY - this.getY()) > attraction) {
	// 					var y = this.getY() + (scene.mouseY > this.getY() ? attraction : -attraction);
	// 					this.setY(y);
	// 				}							
	// 			}
	// 			else {
	// 				if (this.getX()>canvas.width) {
	// 					this.xDirection = -1;
	// 				}
	// 				else if (this.getX()<0) {
	// 					this.xDirection = 1;
	// 				}
	// 				if (this.getY()>canvas.height) {
	// 					this.yDirection = -1;
	// 				}
	// 				else if (this.getY()<0) {
	// 					this.yDirection = 1;
	// 				}
	// 				var randomX = this.speed * this.xDirection;
	// 				var randomY = this.speed * this.yDirection;
	// 				this.setXY(this.getX() + randomX,this.getY() + randomY);
	// 			}


	// 		}
	// 		else {
	// 			if (this.getX()>canvas.width) {
	// 				this.xDirection = -1;
	// 			}
	// 			else if (this.getX()<0) {
	// 				this.xDirection = 1;
	// 			}
	// 			if (this.getY()>canvas.height) {
	// 				this.yDirection = -1;
	// 			}
	// 			else if (this.getY()<0) {
	// 				this.yDirection = 1;
	// 			}
	// 			var randomX = this.speed * this.xDirection;
	// 			var randomY = this.speed * this.yDirection;
	// 			this.setXY(this.getX() + randomX,this.getY() + randomY);
	// 		}
	// 	};

	// 	scene.addToScene(entity);
	// }
