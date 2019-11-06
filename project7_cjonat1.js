var sketchProc = function(processingInstance) 
{
 with (processingInstance) 
 {
	/*
	*/
	//Author:          Jonathan Crow
	//PID:             cjonat1
	//Completion Date: 09/27/2019
	//Assignment:      Project 4
	frameRate(60);
	size(400,400);
	
	/*-------------------------
	Degree to radian conversion
	constants
	-------------------------*/
	var deg0     = 0;
	var deg90    = Math.PI/2;
	var deg180   = Math.PI;
	var deg270   = 3*Math.PI/2;
	var deg360   = 2*Math.PI;
	var degToRad = Math.PI/180;
	
	var keyArray = [];
	
	var keyPressed = function() 
	{
		keyArray[keyCode] = 1;
	};
	var keyReleased = function() 
	{
		keyArray[keyCode] = 0;
	};
	var mouseReleased = function()
	{
		gameState.clickEvent(mouseX, mouseY);
	};
	
	var imgs      = [];
	var imgWall   = 0;
	var imgGround = 1;
	
	var initImages = function()
	{};
	
	initImages();
	
	var tileMap = [
	"wwwwwwwwwwwwwwwwwwww",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"w                  w",
	"wwwwwwwwwwwwwwwwwwww"
	];
	
	//HALF PAGE RESPONSE ON OPHELIAS DEATH!
	
	var TileMap = function(tileMap)
	{
		this.imgs = [][];
		for(var y = 0; y < tileMap.length; y++)
		{
			for(var x = 0; x < tileMap[y].length; x++)
			{
				if(tileMap[y][x] == "w")
					this.imgs[y][x] = (imgs[imgWall]);
				else if(tileMap[y][x] == " ")
					this.imgs[y][x] = (imgs[imgGround]);
				else
					console.log("ERROR LOADING TILEMAP: Unknown tile: " + tileMap[y][x]);
			}
		}
	};
	TileMap.prototype.display = function()
	{
		for(var y = 0; y < this.imgs.length; y++)
			for(var x = 0; x < this.imgs[y].length; x++)
				image(this.imgs[y][x],x*20,y*20);
	};
	
	var MenuGameState = function()
	{};
	MenuGameState.prototype.display = function()
	{
		background(255,0,0);
	};
	MenuGameState.prototype.update = function()
	{};
	MenuGameState.prototype.getNextState = function()
	{
		return this;
	};
	MenuGameState.prototype.clickEvent = function(x, y)
	{};
	
	var gameState = new MenuGameState();
	
	var showFPS  = 1;
	var lastTime = 0;
	
	draw = function() 
	{
		gameState.update();
		gameState.display();
		gameState = gameState.getNextState();
		
		//calculates fps
		var time = millis();
		var fps = 1000/(time-lastTime);
		lastTime = time;
		
		fill(0,0,0);
		if(showFPS)
		{
			textSize(10);
			text("FPS: " + fps.toFixed(2), width-50, height-10);
			if(fps < 50)
				console.log("fps dropped to: " + fps);
		}
	};
}};