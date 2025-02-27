Enjine.AnimationSequence = function (startRow, startColumn, endRow, endColumn) {
    this.StartRow = startRow;
    this.StartColumn = startColumn;
    this.EndRow = endRow;
    this.EndColumn = endColumn;
    this.SingleFrame = false;

    if ((this.StartRow == this.EndRow) && (this.StartColumn == this.EndColumn)) {
        this.SingleFrame = true;
    }
};

Enjine.AnimatedSprite = function () {
    this.LastElapsed = 0;
    this.FramesPerSecond = 1 / 20;
    this.CurrentSequence = null;
    this.Playing = false;
    this.Looping = false;
    this.Rows = 0;
    this.Columns = 0;
    this.Sequences = new Object();
};

Enjine.AnimatedSprite.prototype = new Enjine.FrameSprite();
Enjine.AnimatedSprite.prototype.Update = function (delta) {
    if (this.CurrentSequence.SingleFrame) {
        return;
    }
    if (!this.Playing) {
        return;
    }
    this.LastElapsed -= delta;
    if (this.LastElapsed > 0) {
        return;
    }
    this.LastElapsed = this.FramesPerSecond;
    this.FrameX += this.FrameWidth;
    if (this.FrameX > (this.Image.width - this.FrameWidth)) {
        this.FrameX = 0;
        this.FrameY += this.FrameHeight;
        if (this.FrameY > (this.Image.height - this.FrameHeight)) {
            this.FrameY = 0;
        }
    }
    var seqEnd = false;
    if ((this.FrameX > (this.CurrentSequence.EndColumn * this.FrameWidth)) && (this.FrameY == (this.CurrentSequence.EndRow * this.FrameHeight))) {
        seqEnd = true;
    } else if (this.FrameX == 0 && (this.FrameY > (this.CurrentSequence.EndRow * this.FrameHeight))) {
        seqEnd = true;
    }
    if (seqEnd) {
        if (this.Looping) {
            this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
            this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
        } else {
            this.Playing = false;
        }
    }
};

Enjine.AnimatedSprite.prototype.PlaySequence = function (seqName, loop) {
    this.Playing = true;
    this.Looping = loop;
    this.CurrentSequence = this.Sequences["seq_" + seqName];
    this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
    this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight;
};

Enjine.AnimatedSprite.prototype.StopLooping = function () {
    this.Looping = false;
};

Enjine.AnimatedSprite.prototype.StopPlaying = function () {
    this.Playing = false;
};

Enjine.AnimatedSprite.prototype.SetFrameWidth = function (width) {
    this.FrameWidth = width;
    this.Rows = this.Image.width / this.FrameWidth;
};

Enjine.AnimatedSprite.prototype.SetFrameHeight = function (height) {
    this.FrameHeight = height;
    this.Columns = this.Image.height / this.FrameHeight;
};

Enjine.AnimatedSprite.prototype.SetColumnCount = function (columnCount) {
    this.FrameWidth = this.Image.width / columnCount;
    this.Columns = columnCount;
};

Enjine.AnimatedSprite.prototype.SetRowCount = function (rowCount) {
    this.FrameHeight = this.Image.height / rowCount;
    this.Rows = rowCount;
};

Enjine.AnimatedSprite.prototype.AddExistingSequence = function (name, sequence) {
    this.Sequences["seq_" + name] = sequence;
};

Enjine.AnimatedSprite.prototype.AddNewSequence = function (name, startRow, startColumn, endRow, endColumn) {
    this.Sequences["seq_" + name] = new Enjine.AnimationSequence(startRow, startColumn, endRow, endColumn);
};

Enjine.AnimatedSprite.prototype.DeleteSequence = function (name) {
    if (this.Sequences["seq_" + name] != null) {
        delete this.Sequences["seq_" + name];
    }
};

Enjine.AnimatedSprite.prototype.ClearSequences = function () {
    delete this.Sequences;
    this.Sequences = new Object();
};