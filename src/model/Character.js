class Character {

    constructor(speed, fireSpeed, spritePath) {
        this.isAlive = true;

        this.sprite = new PIXI.Sprite(PIXI.loader.resources[spritePath].texture);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.scale.set(0.4, 0.4);

        this.speed = speed;
        this.fireSpeed = fireSpeed;
        this.fireCooldown = 61;

        this.directionX = 0;
        this.directionY = 0;

        this.keyCodesWithDirections = {37: -1, 38: -1, 39: 1, 40: 1};
        this.keysPressed = {37: false, 38: false, 39: false, 40: false};
    }

    destroy() {
        this.sprite.destroy();
    }

    onKeyDown(keyCode) {
        this.keysPressed[keyCode] = true;

        if (keyCode === 37 || keyCode === 39)
            this.directionX = this.keyCodesWithDirections[keyCode];
        else if (keyCode === 38 || keyCode === 40)
            this.directionY = this.keyCodesWithDirections[keyCode];
    }

    onKeyUp(keyCode) {
        this.keysPressed[keyCode] = false;

        if (!this.keysPressed[37] && this.keysPressed[39])
            this.directionX = this.keyCodesWithDirections[39];
        else if (this.keysPressed[37] && !this.keysPressed[39])
            this.directionX = this.keyCodesWithDirections[37];
        else this.directionX = 0;

        if (!this.keysPressed[38] && this.keysPressed[40])
            this.directionY = this.keyCodesWithDirections[40];
        else if (this.keysPressed[38] && !this.keysPressed[40])
            this.directionY = this.keyCodesWithDirections[38];
        else this.directionY = 0;
    }
}
