class Projectile {
    constructor(x, y, spritePath, speed, xCoordinateOffset, hitboxWidth, hitboxHeight) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[spritePath].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(x + xCoordinateOffset, y);
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, hitboxWidth, hitboxHeight);

        this.speed = speed;

        stage.addChild(this.sprite);
    }

}
