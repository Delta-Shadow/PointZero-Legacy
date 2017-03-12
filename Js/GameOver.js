function GameOverScreen() {
	this.gameOverTitle = new GameOverTitle();
	this.gameOverSubtitle = new GameOverSubtitle();
	this.allReady = false;
};

GameOverScreen.prototype.run = function() {
	if (this.gameOverTitle.isReady() && this.gameOverSubtitle.isReady()) {
		this.allReady = true;
	} else if (this.allReady == false) {
		this.gameOverTitle.enter();
		this.gameOverSubtitle.enter();
	};

	if (this.allReady == true) {
		this.gameOverTitle.update();
		this.gameOverSubtitle.update();
	};

	this.gameOverTitle.draw();
	this.gameOverSubtitle.draw();
};

function GameOverTitle() {
	this.x = 90;
	this.y = 265;
	this.font = "80px Arial";
	this.text = "Game Over";
	this.color = "rgba(0, 0, 0, 0)";
	this.opacity = 0;
};

GameOverTitle.prototype.isReady = function() {
	if (this.opacity >= 1) {
		return true;
	} else {
		return false;
	};
};

GameOverTitle.prototype.isOutOfScreen = function() {
	if (this.opacity <= 0) {
		return true;
	} else {
		return false;
	};
};

GameOverTitle.prototype.enter = function() {
	this.opacity += 0.02;
	this.color = "rgba(0, 0, 0, " + this.opacity + ")";
};

GameOverTitle.prototype.exit = function() {
	this.opacity -= 0.05;
	this.color = "rgba(0, 0, 0, " + this.opacity + ")";
};

GameOverTitle.prototype.update = function() {

};

GameOverTitle.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.font = this.font;
	ctx.fillText(this.text, this.x, this.y);
};

function GameOverSubtitle() {
	this.x = 200;
	this.y = 710;
	this.font = "30px Arial";
	this.text = "Tap to Continue";
	this.color = "rgba(0, 0, 0, 0)";
	this.opacity = 0;
	this.direction = "None";
};

GameOverSubtitle.prototype.isReady = function() {
	if (this.opacity >= 1) {
		return true;
	} else {
		return false;
	};
};

GameOverSubtitle.prototype.isOutOfScreen = function() {
	if (this.opacity <= 0) {
		return true;
	} else {
		return false;
	};
};

GameOverSubtitle.prototype.enter = function() {
	this.opacity += 0.02;
	this.color = "rgba(0, 0, 0, " + this.opacity + ")";
};

Title.prototype.exit = function() {
	this.opacity -= 0.05;
	this.color = "rgba(0, 0, 0, " + this.opacity + ")";
};

GameOverSubtitle.prototype.update = function() {
	if (this.opacity >= 1) {
		this.direction = "FadeOut";
	} else if (this.opacity <= 0) {
		this.direction = "FadeIn";
	};

	if (this.direction == "FadeOut") {
		this.opacity -= 0.02;
	} else if (this.direction == "FadeIn") {
		this.opacity += 0.02;
	};

	this.color = "rgba(0, 0, 0, " + this.opacity + ")";
};

GameOverSubtitle.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.font = this.font;
	ctx.fillText(this.text, this.x, this.y);
};