let BOSS_HEALTH = 40;

class Boss extends Character {
    constructor() {
        super(20, 40, BOSS_SPRITE);

        this.sprite.position.set(renderer.width * 0.85, renderer.height * 0.5);
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 150, 150);
        this.sprite.scale.set(0.4, 0.4);

        this.keyCodesForRandomMovement = [38, 40];

        let laugh = new Audio("assets/audio/laugh.wav");
        laugh.play();

        stage.addChild(this.sprite);

        setInterval(() => CollisionHandler.explode(boss), Util.generateRandomNumberInInterval(2000, 4000));

        const interval = Util.generateRandomNumberInInterval(100, 700);
        setInterval(() => this.setRandomDirection(), interval);
    }

    setRandomDirection() {
        const keyCode = this.keyCodesForRandomMovement[Math.floor(Math.random() * this.keyCodesForRandomMovement.length)];
        this.onKeyDown(keyCode);
        const delay = Util.generateRandomNumberInInterval(300, 500);
        setTimeout(() => this.onKeyUp(keyCode), delay);
    }

    update() {
        if (this.isAlive) {
            let nextX = this.sprite.position.x + this.directionX * this.speed;
            let nextY = this.sprite.position.y + this.directionY * this.speed;

            this.sprite.position.x = nextX;

            if (nextY > 0 && nextY < renderer.height) {
                this.sprite.position.y = nextY;
            }

            this.sprite.hitArea.x = nextX;
            this.sprite.hitArea.y = nextY;

            if (this.fireCooldown > 30) {
                this.updateFire();
                this.fireCooldown = 0;
            }

            this.fireCooldown++;
        }
    }

    updateFire() {
        ProjectileHandler.createEnemyProjectile(this.sprite.position.x, this.sprite.position.y, Math.random() > 0.5 ? PUMPKIN_SPRITE : PUMPKIN_2_SPRITE);
    }
}
