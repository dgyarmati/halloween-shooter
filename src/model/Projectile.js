class Projectile {
    constructor(x, y, spritePath, speed, xCoordinateOffset, hitboxWidth, hitboxHeight, soundPath) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[spritePath].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(x + xCoordinateOffset, y);
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, hitboxWidth, hitboxHeight);

        if (PUMPKIN_SPRITE === spritePath || PUMPKIN_2_SPRITE === spritePath) {
            this.sprite.scale.set(0.5, 0.5);
            this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 40, 40);
        }

        this.speed = speed;

        stage.addChild(this.sprite);

        let sound = new Audio(soundPath);
        sound.play();
    }

}
