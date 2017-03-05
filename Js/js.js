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

window.addEventListener("resize", OnResizeCalled, false);
window.addEventListener("orientationchange", OnResizeCalled, false);  

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

OnResizeCalled();

ctx.fillStyle = Game.bg;
ctx.fillRect(0, 0, Game.width, Game.height);