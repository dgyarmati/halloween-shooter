class Witch extends Character {

    constructor() {
        super(10, 10, PLAYER_SPRITE);

        this.sprite.position.set(renderer.width * 0.1, renderer.height * 0.5);
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 50, 50);
        this.sprite.scale.set(0.4, 0.4);

        window.addEventListener('keydown', this.pressKey.bind(this));
        window.addEventListener('keyup', this.releaseKey.bind(this));
    }

    makeVisible() {
        stage.addChild(this.sprite);
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
            ProjectileHandler.createPlayerProjectile(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
    }

    pressKey(key) {
        this.onKeyDown(key.keyCode);
    }

    releaseKey(key) {
        this.onKeyUp(key.keyCode);
    }

}
