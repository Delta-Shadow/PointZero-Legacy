function MenuManager() {
	this.title = new Title();
	this.subtitle = new Subtitle();
	this.swipe = new Swipe();
	this.allReady = false;
};

MenuManager.prototype.run = function() {
	if (Game.mode == 1) {
		if (this.title.isOutOfScreen() && this.subtitle.isOutOfScreen() && this.swipe.isReady()) {
			Game.switchToGame();
		} else {
			this.title.exit();
			this.subtitle.exit();
			this.swipe.enter();
		};

	} else if (Game.mode == 0) {
		if (this.title.isReady() && this.subtitle.isReady() && spikes.isReady()) {
			this.allReady = true;
		} else if (this.allReady == false) {
			this.title.enter();
			this.subtitle.enter();
			spikes.enter();
		};

		if (this.allReady && Game.mode == 0) {
			this.title.update();
			this.subtitle.update();
		};
	};

	this.title.draw();
	this.subtitle.draw();
	this.swipe.draw();
};






function Swipe() {
	this.sprite = new Image();
	this.x = 230;
	this.y = -150;
	this.width = 150;
	this.height = 150;
	this.speed = 5;
	this.init();
};

Swipe.prototype.isReady = function() {
	if (this.y >= 120) {
		return true;
	} else {
		return false;
	};
};

Swipe.prototype.isOutOfScreen = function() {
	if (this.y <= -180) {
		return true;
	} else {
		return false;
	};
};

Swipe.prototype.enter = function() {
	this.y += this.speed;
};

Swipe.prototype.exit = function() {
	this.y -= this.speed;
};

Swipe.prototype.init = function() {
	this.sprite.src = "Data/Swipe.png";
};

Swipe.prototype.draw = function() {
	ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
};




function Title() {
	this.x = 100;
	this.y = 265;
	this.width = 500;
	this.height = 200;
	this.font = "90px Arial";
	this.color = "rgba(0, 0, 0, 1)";
	this.opacity = 0;
};

Title.prototype.isReady = function() {
	if (this.opacity >= 1) {
		return true;
	} else {
		return false;
	};
};

Title.prototype.isOutOfScreen = function() {
	if (this.opacity <= 0) {
		return true;
	} else {
		return false;
	};
};

Title.prototype.enter = function() {
	this.opacity += 0.02;
	this.color = "rgba(0, 0, 0, " + this.opacity + ")";
};

Title.prototype.exit = function() {
	this.opacity -= 0.05;
	this.color = "rgba(0, 0, 0, " + this.opacity + ")";
};

Title.prototype.update = function() {
	
};

Title.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.font = this.font;
	ctx.fillText("Point Zero", this.x, this.y, this.width, this.height);
};







function Subtitle() {
	this.x = 220;
	this.y = 680;
	this.width = 500;
	this.height = 200;
	this.font = "30px Arial";
	this.color = "rgba(0, 0, 0, 1)"
	this.opacity = 0;
	this.direction = "None";
};

Subtitle.prototype.isReady = function() {
	if (this.opacity >= 1) {
		return true;
	} else {
		return false;
	};
};

Subtitle.prototype.isOutOfScreen = function() {
	if (this.opacity <= 0) {
		return true;
	} else {
		return false;
	};
};

Subtitle.prototype.enter = function() {
	this.opacity += 0.02;
	this.color = "rgba(0, 0, 0, " + this.opacity + ")";
};

Subtitle.prototype.exit = function() {
	this.opacity -= 0.05;
	this.color = "rgba(0, 0, 0, " + this.opacity + ")";
};

Subtitle.prototype.update = function() {
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

Subtitle.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.font = this.font;
	ctx.fillText("Tap to Play !", this.x, this.y, this.width, this.height);
};