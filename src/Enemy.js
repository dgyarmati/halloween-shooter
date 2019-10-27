class Enemy {
    constructor() {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/enemy.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(renderer.width * 0.8, renderer.height * Math.random());
        this.sprite.scale.set(0.4, 0.4);

        this.keyPressed = {32: true, 37: false, 38: false, 39: false, 40: false};
        this.keyCodesWithDirections = {37: -1, 38: -1, 40: 1};
        this.keyCodes = [37, 38, 40];

        this.directionX = 0;
        this.directionY = 0;
        this.speed = 10;

        this.fireSpeed = 30;
        this.fireCooldown = 0;

        stage.addChild(this.sprite);

        const interval = this.generateRandomNumberInInterval(100, 700);
        setInterval(this.moveRandomly.bind(this), interval);
    }

    moveRandomly() {
        const keyCode = this.keyCodes[Math.floor(Math.random() * this.keyCodes.length)];
        this.pressKey(keyCode);
        const delay = this.generateRandomNumberInInterval(100, 500);
        setTimeout(() => this.releaseKey(keyCode), delay);
    }

    generateRandomNumberInInterval(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    update() {
        let nextX = this.sprite.position.x + this.directionX * this.speed;
        let nextY = this.sprite.position.y + this.directionY * this.speed;

        this.sprite.position.x = nextX;

        if (nextY > 0 && nextY < renderer.height) {
            this.sprite.position.y = nextY;
        }

        this.updateFire();

        if (this.sprite.position.x < -renderer.width * 0.3) {
            this.sprite.destroy();
        }
    }

    pressKey(keyCode) {
        this.keyPressed[keyCode] = true;

        if (keyCode == 37 || keyCode == 39)
            this.directionX = this.keyCodesWithDirections[keyCode];
        else if (keyCode == 38 || keyCode == 40)
            this.directionY = this.keyCodesWithDirections[keyCode];
    }

    releaseKey(keyCode) {
        this.keyPressed[keyCode] = false;

        if (!this.keyPressed[37] && this.keyPressed[39])
            this.directionX = this.keyCodesWithDirections[39];
        else if (this.keyPressed[37] && !this.keyPressed[39])
            this.directionX = this.keyCodesWithDirections[37];
        else this.directionX = 0;

        if (!this.keyPressed[38] && this.keyPressed[40])
            this.directionY = this.keyCodesWithDirections[40];
        else if (this.keyPressed[38] && !this.keyPressed[40])
            this.directionY = this.keyCodesWithDirections[38];
        else this.directionY = 0;
    }

    updateFire() {
        if (this.fireCooldown < this.fireSpeed) {
            this.fireCooldown++;
        }

        if (this.keyPressed[32] && this.fireCooldown >= this.fireSpeed) {
            let projectile = new EnemyProjectile(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
    }
}
