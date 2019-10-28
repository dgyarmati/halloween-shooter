class Enemy1 extends Spaceship {

    constructor(projectileHandler) {
        super(10, 30, "assets/enemy.png", projectileHandler);

        this.sprite.position.set(renderer.width * 0.8, renderer.height * Math.random());
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 30, 30);
        this.sprite.scale.set(0.4, 0.4);

        this.keyCodesForRandomMovement = [37, 38, 40];

        stage.addChild(this.sprite);

        const interval = this.generateRandomNumberInInterval(100, 700);
        setInterval(this.setRandomDirection.bind(this), interval);
    }

    setRandomDirection() {
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

    updateFire() {
        if (this.fireCooldown < this.fireSpeed) {
            this.fireCooldown++;
        }

        if (this.fireCooldown >= this.fireSpeed) {
            this.projectileHandler.createEnemyProjectile(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
    }

}
