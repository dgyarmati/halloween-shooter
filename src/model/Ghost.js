class Ghost extends Character {

    constructor() {
        super(Util.generateRandomNumberInInterval(7, 10), 0, Math.random() > 0.5 ? GHOST_SPRITE : GHOST_2_SPRITE);

        this.sprite.position.set(renderer.width - 1, renderer.height * Math.random());
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 30, 30);
        this.sprite.scale.set(0.4, 0.4);

        stage.addChild(this.sprite);

        const interval = Util.generateRandomNumberInInterval(100, 700);
        setInterval(() => this.moveLeft(), interval);
    }

    moveLeft() {
        this.onKeyDown(37);
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
        }
    }

}
