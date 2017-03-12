function CandySystem() {
	this.candies = [];
};

CandySystem.prototype.spawn = function() {
	var x = Math.floor(Math.random()*400) + 100;
	var y = Math.floor(Math.random()*600) + 100;
	var o = new Candy(x, y);
	this.candies.push(o);
	explosionSystem.spawn("reverse", x, y);
};

CandySystem.prototype.run = function() {
	for (var i in this.candies) {
		if (this.candies[i].isCollidingWithBall(ball.x, ball.y, ball.radius*2, ball.radius*2)) {
			explosionSystem.spawn("linear", this.candies[i].x, this.candies[i].y);
			delete this.candies[i];
			candySystem.spawn();
			Game.score++;
			break;
		}
		this.candies[i].update();
		this.candies[i].draw();
	};
};

function Candy(x, y) {
	this.x = x;
	this.y = y;
	this.width = 0;
	this.height = 0;
	this.color = "#f21b3f";
};

Candy.prototype.isCollidingWithBall = function(x, y, width, height) {
	if ( (this.x+this.width) >= x && this.x <= (x+width) && (this.y+this.height) >= y && this.y <= (y+height) ) {
		return true;
	} else {
		return false;
	}		  
};

Candy.prototype.update = function() {
	if (this.width < 25 && this.height < 25) {
		this.width++;
		this.height++;
	};
};

Candy.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
};