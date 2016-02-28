// $(function() {
// 	var canvas = document.getElementById("eCanvas");

// 	var ec = new Scene(canvas);
// 	var points = 100;
// 	var objects = [];

// 	for(var i=0; i<points; i++) {
// 		var radius = randomInt(10);		
// 		var x = randomInt(canvas.width);
// 		var y = randomInt(canvas.height);
// 		var entity = Math.random() > 0.5 ? ec.Circle(radius) : ec.Rectangle(radius,radius);
// 		entity.setXY(x,y).setFillColor('#60b86b');
// 		entity.xDirection = Math.random() > 0.5 ? 1 : -1;
// 		entity.yDirection = Math.random() > 0.5 ? 1 : -1;
// 		entity.speed = randomInt(3,1);
// 		entity.setAnimation(function animateentity(obj) {
// 			if (obj.getX()>canvas.width) {
// 				obj.xDirection = -1;
// 			}
// 			else if (obj.getX()<0) {
// 				obj.xDirection = 1;
// 			}
// 			if (obj.getY()>canvas.height) {
// 				obj.yDirection = -1;
// 			}
// 			else if (obj.getY()<0) {
// 				obj.yDirection = 1;
// 			}
// 			var randomX = obj.speed * obj.xDirection;
// 			var randomY = obj.speed * obj.yDirection;
// 			obj.setXY(obj.getX() + randomX,obj.getY() + randomY);
// 		});

// 		objects.push(entity);
// 	}

// 	ec.animate(objects);
// })

// function randomInt(max,min) {
// 	max = max || 1;
// 	min = min || 0;
// 	return Math.floor(Math.random()*max + min);
// };




// $(function() {
// 	var canvas = document.getElementById("eCanvas");

// 	var ec = new Scene(canvas);
	
// 	var entity = ec.Circle(5);
// 	entity.setXY(22,25).setFillColor('#60b86b');
		
// 	entity.setAnimation(function animateentity(obj) {
// 		var attraction = 4;
// 		if (ec.mouseX && ec.mouseY) {
// 			if (Math.abs(ec.mouseX - obj.getX()) > attraction) {
// 				var x = obj.getX() + (ec.mouseX > obj.getX() ? attraction : -attraction);
// 				obj.setX(x);
// 			}
// 			if (Math.abs(ec.mouseY - obj.getY()) > attraction) {
// 				var y = obj.getY() + (ec.mouseY > obj.getY() ? attraction : -attraction);
// 				obj.setY(y);
// 			}		
// 		}
// 	});

// 	ec.animate([entity]);
// })

// function randomInt(max,min) {
// 	max = max || 1;
// 	min = min || 0;
// 	return Math.floor(Math.random()*max + min);
// };

$(function() {
	var canvas = document.getElementById("eCanvas");

	var ec = new Scene(canvas);
	var points = 100;
	var objects = [];

	for(var i=0; i<points; i++) {
		var radius = randomInt(10);		
		var x = randomInt(canvas.width);
		var y = randomInt(canvas.height);
		var entity = Math.random() > 0.5 ? ec.Circle(radius) : ec.Rectangle(radius,radius);
		entity.setXY(x,y).setFillColor('#60b86b');
		entity.xDirection = Math.random() > 0.5 ? 1 : -1;
		entity.yDirection = Math.random() > 0.5 ? 1 : -1;
		entity.speed = randomInt(2,1);
		entity.setAnimation(function animateentity(obj) {
			var attraction = 4;
			var attractionDistance = 150;

			if (ec.mouseX && ec.mouseY) {
				var a = ec.mouseX - obj.getX();
				var b = ec.mouseY - obj.getY();
				var distance = Math.sqrt( a*a + b*b );
				if (distance<attractionDistance) {
					if (Math.abs(ec.mouseX - obj.getX()) > attraction) {
						var x = obj.getX() + (ec.mouseX > obj.getX() ? attraction : -attraction);
						obj.setX(x);
					}
					if (Math.abs(ec.mouseY - obj.getY()) > attraction) {
						var y = obj.getY() + (ec.mouseY > obj.getY() ? attraction : -attraction);
						obj.setY(y);
					}							
				}
				else {
					if (obj.getX()>canvas.width) {
						obj.xDirection = -1;
					}
					else if (obj.getX()<0) {
						obj.xDirection = 1;
					}
					if (obj.getY()>canvas.height) {
						obj.yDirection = -1;
					}
					else if (obj.getY()<0) {
						obj.yDirection = 1;
					}
					var randomX = obj.speed * obj.xDirection;
					var randomY = obj.speed * obj.yDirection;
					obj.setXY(obj.getX() + randomX,obj.getY() + randomY);
				}


			}
			else {
				if (obj.getX()>canvas.width) {
					obj.xDirection = -1;
				}
				else if (obj.getX()<0) {
					obj.xDirection = 1;
				}
				if (obj.getY()>canvas.height) {
					obj.yDirection = -1;
				}
				else if (obj.getY()<0) {
					obj.yDirection = 1;
				}
				var randomX = obj.speed * obj.xDirection;
				var randomY = obj.speed * obj.yDirection;
				obj.setXY(obj.getX() + randomX,obj.getY() + randomY);
			}
		});

		objects.push(entity);
	}

	ec.animate(objects);
})

function randomInt(max,min) {
	max = max || 1;
	min = min || 0;
	return Math.round(Math.random()*max + min);
};
