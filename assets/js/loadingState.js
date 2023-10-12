/**
	State that loads all the resources for the game.
	Code by Rob Kleffner, 2011
*/

Mario.LoadingState = function() {
    this.Images = [];
    this.ImagesLoaded = false;
    this.ScreenColor = 0;
    this.ColorDirection = 1;
    this.ImageIndex = 0;
    this.SoundIndex = 0;
};

Mario.LoadingState.prototype = new Enjine.GameState();

Mario.LoadingState.prototype.Enter = function() {
    var i = 0;
    for (i = 0; i < 15; i++) {
        this.Images[i] = {};
    }
    
    this.Images[0].name = "background";
    this.Images[1].name = "endScene";
    this.Images[2].name = "enemies";
    this.Images[3].name = "fireMario";
    this.Images[4].name = "font";
    this.Images[5].name = "gameOverGhost";
    this.Images[6].name = "items";
    this.Images[7].name = "logo";
    this.Images[8].name = "map";
    this.Images[9].name = "mario";
    this.Images[10].name = "particles";
    this.Images[11].name = "racoonMario";
    this.Images[12].name = "smallMario";
    this.Images[13].name = "title";
    this.Images[14].name = "worldMap";

    this.Images[0].src = "./assets/img/bgsheet.png";
    this.Images[1].src = "./assets/img/endscene.gif";
    this.Images[2].src = "./assets/img/enemysheet.png";
    this.Images[3].src = "./assets/img/firemariosheet.png";
    this.Images[4].src = "./assets/img/font.gif";
    this.Images[5].src = "./assets/img/gameovergost.gif";
    this.Images[6].src = "./assets/img/itemsheet.png";
    this.Images[7].src = "./assets/img/logo.gif";
    this.Images[8].src = "./assets/img/mapsheet.png";
    this.Images[9].src = "./assets/img/mariosheet.png";
    this.Images[10].src = "./assets/img/particlesheet.png";
    this.Images[11].src = "./assets/img/racoonmariosheet.png";
    this.Images[12].src = "./assets/img/smallmariosheet.png";
    this.Images[13].src = "./assets/img/title.gif";
    this.Images[14].src = "./assets/img/worldmap.png";
    
    Enjine.Resources.AddImages(this.Images);
    
    var testAudio = new Audio();
	
    if (testAudio.canPlayType("audio/mp3")) {
    	Enjine.Resources.AddSound("1up", "./assets/audio/1-up.mp3", 1)
		    .AddSound("breakblock", "./assets/audio/breakblock.mp3")
		    .AddSound("bump", "./assets/audio/bump.mp3", 4)
		    .AddSound("cannon", "./assets/audio/cannon.mp3")
		    .AddSound("coin", "./assets/audio/coin.mp3", 5)
		    .AddSound("death", "./assets/audio/death.mp3", 1)
		    .AddSound("exit", "./assets/audio/exit.mp3", 1)
		    .AddSound("fireball", "./assets/audio/fireball.mp3", 1)
		    .AddSound("jump", "./assets/audio/jump.mp3")
		    .AddSound("kick", "./assets/audio/kick.mp3")
		    .AddSound("pipe", "./assets/audio/pipe.mp3", 1)
		    .AddSound("powerdown", "./assets/audio/powerdown.mp3", 1)
		    .AddSound("powerup", "./assets/audio/powerup.mp3", 1)
		    .AddSound("sprout", "./assets/audio/sprout.mp3", 1)
		    .AddSound("stagestart", "./assets/audio/stagestart.mp3", 1)
		    .AddSound("stomp", "./assets/audio/stomp.mp3", 2);
    } else {
	    Enjine.Resources.AddSound("1up", "./assets/audio/1-up.wav", 1)
		    .AddSound("breakblock", "./assets/audio/breakblock.wav")
		    .AddSound("bump", "./assets/audio/bump.wav", 2)
		    .AddSound("cannon", "./assets/audio/cannon.wav")
		    .AddSound("coin", "./assets/audio/coin.wav", 5)
		    .AddSound("death", "./assets/audio/death.wav", 1)
		    .AddSound("exit", "./assets/audio/exit.wav", 1)
		    .AddSound("fireball", "./assets/audio/fireball.wav", 1)
		    .AddSound("jump", "./assets/audio/jump.wav", 1)
		    .AddSound("kick", "./assets/audio/kick.wav", 1)
		    .AddSound("message", "./assets/audio/message.wav", 1)
		    .AddSound("pipe", "./assets/audio/pipe.wav", 1)
		    .AddSound("powerdown", "./assets/audio/powerdown.wav", 1)
		    .AddSound("powerup", "./assets/audio/powerup.wav", 1)
		    .AddSound("sprout", "./assets/audio/sprout.wav", 1)
		    .AddSound("stagestart", "./assets/audio/stagestart.wav", 1)
		    .AddSound("stomp", "./assets/audio/stomp.wav", 1);
    }
    
    //load the array of tile behaviors
    Mario.Tile.LoadBehaviors();
};

Mario.LoadingState.prototype.Exit = function() {
    delete this.Images;
};

Mario.LoadingState.prototype.Update = function(delta) {
    if (!this.ImagesLoaded) {
        this.ImagesLoaded = true;
        var i = 0;
        for (i = 0; i < this.Images.length; i++) {
            if (Enjine.Resources.Images[this.Images[i].name].complete !== true) {
                this.ImagesLoaded = false;
                break;
            }
        }
    }
    
    this.ScreenColor += this.ColorDirection * 255 * delta;
    if (this.ScreenColor > 255) {
        this.ScreenColor = 255;
        this.ColorDirection = -1;
    } else if (this.ScreenColor < 0) {
        this.ScreenColor = 0;
        this.ColorDirection = 1;
    }
};

Mario.LoadingState.prototype.Draw = function(context) {
    if (!this.ImagesLoaded) {
        var color = parseInt(this.ScreenColor, 10);
        context.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
        context.fillRect(0, 0, 640, 480);
    } else {
        context.fillStyle = "rgb(0, 0, 0)";
        context.fillRect(0, 0, 640, 480);
    }
};

Mario.LoadingState.prototype.CheckForChange = function(context) {
    if (this.ImagesLoaded) {
		//set up the global map state variable
		Mario.GlobalMapState = new Mario.MapState();
	
        context.ChangeState(new Mario.TitleState());
    }
};