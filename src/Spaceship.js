class Spaceship {

    constructor(speed, fireSpeed, spritePath, projectileHandler) {
        this.isAlive = true;

        this.projectileHandler = projectileHandler;

        this.sprite = new PIXI.Sprite(PIXI.loader.resources[spritePath].texture);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.scale.set(0.4, 0.4);

        this.speed = speed;
        this.fireSpeed = fireSpeed;
        this.fireCooldown = 0;

        this.directionX = 0;
        this.directionY = 0;

        this.keyCodesWithDirections = {37: -1, 38: -1, 39: 1, 40: 1};
        this.keysPressed = {37: false, 38: false, 39: false, 40: false};
    }

    destroy() {
        this.sprite.destroy();
    }

    onKeyDown(key) {
        this.keysPressed[key.keyCode] = true;

        if (key.keyCode == 37 || key.keyCode == 39)
            this.directionX = this.keyCodesWithDirections[key.keyCode];
        else if (key.keyCode == 38 || key.keyCode == 40)
            this.directionY = this.keyCodesWithDirections[key.keyCode];
    }

    onKeyUp(key) {
        this.keysPressed[key.keyCode] = false;

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
