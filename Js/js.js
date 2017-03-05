// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

var div = document.getElementById('div');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Game = new GameManager();
var ball = new Ball();
var spikes = new Spikes();

window.addEventListener("resize", OnResizeCalled, false);
window.addEventListener("orientationchange", OnResizeCalled, false);
document.addEventListener("mousedown", clickStart, false); 
document.addEventListener("mouseup", clickEnd, false); 

function OnResizeCalled() { 
    div.style.width = window.innerWidth + 'px'; 
    div.style.height = window.innerHeight + 'px'
    
    var gameWidth = window.innerWidth; 
	var gameHeight = window.innerHeight; 
	var scaleToFitX = gameWidth / Game.width; 
	var scaleToFitY = gameHeight / Game.height; 
	 
	var currentScreenRatio = gameWidth / gameHeight; 
	var optimalRatio = Math.min(scaleToFitX, scaleToFitY); 
	 
	if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) { 
	    div.style.width = gameWidth + "px"; 
	    div.style.height = gameHeight + "px"; 
	} 
	else { 
	    div.style.width = Game.width * optimalRatio + "px"; 
	    div.style.height = Game.height * optimalRatio + "px"; 
	} 
}

function clickStart(e) {
	Game.startClick.x = e.clientX;
	Game.startClick.y = e.clientY;
};

function clickEnd(e) {
	Game.endClick.x = e.clientX;
	Game.endClick.y = e.clientY;
	Game.dragDistance.x = Math.abs(Game.startClick.x - Game.endClick.x);
	Game.dragDistance.y = Math.abs(Game.startClick.y - Game.endClick.y);

	if (Game.dragDistance.x > Game.dragDistance.y) {
		// Drag is in X Plane
		ball.g.y = 0;
		ball.v.x *= 0.3;
		if (Game.endClick.x > Game.startClick.x) { // Dragged Right
			ball.g.x = 0.1;
		} else if (Game.endClick.x < Game.startClick.x) { // Dragged Left
			ball.g.x = -0.1;
		}
	} else if (Game.dragDistance.y > Game.dragDistance.x) {
		// Drag is in Y Plane
		ball.g.x = 0;
		ball.v.y *= 0.3;
		if (Game.endClick.y > Game.startClick.y) { // Dragged Down
			ball.g.y = 0.1;
		} else if (Game.endClick.y < Game.startClick.y) { // Dragged Up
			ball.g.y = -0.1;
		}
	}
};

OnResizeCalled();

function menu() {
	Game.roller = requestAnimFrame(menu);
	ctx.clearRect(0, 0, Game.width, Game.height);

	ctx.fillStyle = Game.bg;
	ctx.fillRect(0, 0, Game.width, Game.height);
};

function main() {
	Game.roller = requestAnimFrame(main);
	ctx.clearRect(0, 0, Game.width, Game.height);

	ctx.fillStyle = Game.bg;
	ctx.fillRect(0, 0, Game.width, Game.height);

	spikes.run();
	ball.run();
};

main();