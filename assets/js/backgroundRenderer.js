Mario.BackgroundRenderer = function (level, width, height, distance) {
    this.Level = level;
    this.Width = width;
    this.Distance = distance;
    this.TilesY = ((height / 32) | 0) + 1;
    this.Background = Mario.SpriteCuts.GetBackgroundSheet();
};

Mario.BackgroundRenderer.prototype = new Enjine.Drawable();
Mario.BackgroundRenderer.prototype.Draw = function (context, camera) {
    var xCam = camera.X / this.Distance;
    var x = 0,
        y = 0,
        b = null,
        frame = null;
    var xTileStart = (xCam / 32) | 0;
    var xTileEnd = (((xCam + this.Width) / 32) | 0);
    for (x = xTileStart; x <= xTileEnd; x++) {
        for (y = 0; y < this.TilesY; y++) {
            b = this.Level.GetBlock(x, y) & 0xff;
            frame = this.Background[b % 8][(b / 8) | 0];
            context.drawImage(Enjine.Resources.Images["background"], frame.X, frame.Y, frame.Width, frame.Height, ((x << 5) - xCam) | 0, (y << 5) | 0, frame.Width, frame.Height);
        }
    }
};