class Enemy {
    constructor() {
        this.isAlive = true;
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/enemy.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(renderer.width * 0.8, renderer.height * Math.random());
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 30, 30);
        this.sprite.scale.set(0.4, 0.4);

        this.keysPressed = {37: false, 38: false, 39: false, 40: false};
        this.keyCodesWithDirections = {37: -1, 38: -1, 40: 1};
        this.keyCodesForRandomMovement = [37, 38, 40];

        this.directionX = 0;
        this.directionY = 0;
        this.speed = 10;

        this.fireSpeed = 30;
        this.fireCooldown = 0;

        stage.addChild(this.sprite);

        const interval = this.generateRandomNumberInInterval(100, 700);
        setInterval(this.moveRandomly.bind(this), interval);
    }

    destroy() {
        this.sprite.destroy();
    }

    moveRandomly() {
        const keyCode = this.keyCodesForRandomMovement[Math.floor(Math.random() * this.keyCodesForRandomMovement.length)];
        this.onKeyDown(keyCode);
        const delay = this.generateRandomNumberInInterval(100, 500);
        setTimeout(() => this.onKeyUp(keyCode), delay);
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

        this.sprite.hitArea.x = nextX;
        this.sprite.hitArea.y = nextY;

        this.updateFire();
    }

    onKeyDown(keyCode) {
        this.keysPressed[keyCode] = true;

        if (keyCode == 37 || keyCode == 39)
            this.directionX = this.keyCodesWithDirections[keyCode];
        else if (keyCode == 38 || keyCode == 40)
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

    updateFire() {
        if (this.fireCooldown < this.fireSpeed) {
            this.fireCooldown++;
        }

        if (this.fireCooldown >= this.fireSpeed) {
            new EnemyProjectile(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
    }

    onDestroy() {
        let radius = 10;
        let steps = 10;
        let x = this.sprite.position.x;
        let y = this.sprite.position.y;
        for (let i = 0; i < steps; i++) {
            x = (this.sprite.position.x + radius * Math.cos(2 * Math.PI * i / 10));
            y = (this.sprite.position.y + radius * Math.sin(2 * Math.PI * i / 10));
            new Particle(x, y);
        }
    }
}
