class Enemy extends Spaceship {

    constructor() {
        super(Util.generateRandomNumberInInterval(7, 16), Util.generateRandomNumberInInterval(10, 40), "assets/enemy.png");

        this.sprite.position.set(renderer.width - 1, renderer.height * Math.random());
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 30, 30);
        this.sprite.scale.set(0.4, 0.4);

        this.keyCodesForRandomMovement = Util.generateRandomNumberInInterval(1, 100) > 50 ? [37, 38, 40] : [37, 40];

        stage.addChild(this.sprite);

        const interval = Util.generateRandomNumberInInterval(100, 700);
        setInterval(() => this.setRandomDirection(), interval);
    }

    setRandomDirection() {
        const keyCode = this.keyCodesForRandomMovement[Math.floor(Math.random() * this.keyCodesForRandomMovement.length)];
        this.onKeyDown(keyCode);
        const delay = Util.generateRandomNumberInInterval(100, 500);
        setTimeout(() => this.onKeyUp(keyCode), delay);
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
            ProjectileHandler.createEnemyProjectile(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
    }

}
