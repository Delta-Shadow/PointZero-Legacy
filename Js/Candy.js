function CandySystem() {
	this.candies = [];
};

CandySystem.prototype.spawn = function(x, y) {
	var o = new Candy(x, y);
	this.candies.push(o);
};

CandySystem.prototype.run = function() {
	for (var i in this.candies) {
		this.candies[i].update();
		this.candies[i].draw();
	};
};

function Candy(x, y) {
	this.x = x;
	this.y = y;
	this.width = 15;
	this.height = 15;
	this.color = "#4ad072";
};

Candy.prototype.update = function() {

};

Candy.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};