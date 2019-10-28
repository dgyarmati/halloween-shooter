class Player {
    constructor() {
        this.isAlive = true;
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/spaceship.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(renderer.width * 0.2, renderer.height * 0.4);
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 50, 50);
        this.sprite.scale.set(0.4, 0.4);

        this.keysPressed = {32: false, 37: false, 38: false, 39: false, 40: false};
        this.keyCodesWithDirections = {37: -1, 38: -1, 39: 1, 40: 1};

        this.directionX = 0;
        this.directionY = 0;
        this.speed = 10;

        this.fireSpeed = 10;
        this.fireCooldown = 0;

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    makeVisible() {
        stage.addChild(this.sprite);
    }

    destroy() {
        this.sprite.destroy();
    }

    update() {
        let nextX = this.sprite.position.x + this.directionX * this.speed;
        let nextY = this.sprite.position.y + this.directionY * this.speed;

        if (nextX > 0 && nextX < renderer.width) {
            this.sprite.position.x = nextX;
            this.sprite.hitArea.x = nextX;
        }
        if (nextY > 0 && nextY < renderer.height) {
            this.sprite.position.y = nextY;
            this.sprite.hitArea.y = nextY;
        }

        this.updateFire();
    }

    updateFire() {
        if (this.fireCooldown < this.fireSpeed)
            this.fireCooldown++;

        if (this.keysPressed[32] && this.fireCooldown >= this.fireSpeed) {
            new PlayerProjectile(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
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
