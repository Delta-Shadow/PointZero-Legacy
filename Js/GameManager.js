function GameManager() {	
	this.width = 600;
	this.height = 800;
	this.roller;
	this.ticker = 0;
	this.bg = "#a9e4e5";

	this.startClick = {};
	this.endClick = {};
	this.dragDistance = {};
};

GameManager.prototype.evaluateDrag = function() {
	if (this.dragDistance.x > this.dragDistance.y) {
		// Drag is in X Plane
		ball.g.y = 0;
		ball.v.x *= 0.3;
		if (this.endClick.x > this.startClick.x) { // Dragged Right
			ball.g.x = 0.1;
		} else if (this.endClick.x < this.startClick.x) { // Dragged Left
			ball.g.x = -0.1;
		}
	} else if (this.dragDistance.y > this.dragDistance.x) {
		// Drag is in Y Plane
		ball.g.x = 0;
		ball.v.y *= 0.3;
		if (this.endClick.y > this.startClick.y) { // Dragged Down
			ball.g.y = 0.1;
		} else if (this.endClick.y < this.startClick.y) { // Dragged Up
			ball.g.y = -0.1;
		}
	}
}