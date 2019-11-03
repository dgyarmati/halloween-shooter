let _particles = [];

class Particle {
    static get list() {
        return _particles;
    }

    constructor(x, y) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[ENEMY_PROJECTILE_SPRITE].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(x, y);
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 5, 5);

        this.radius = 10;
        Particle.list.push(this);

        stage.addChild(this.sprite);
    }

    destroy() {
        this.sprite.destroy();
    }

    update(idx) {
        this.sprite.position.x = (this.sprite.position.x + this.radius * Math.cos(2 * Math.PI * idx / 10));
        this.sprite.position.y = (this.sprite.position.y + this.radius * Math.sin(2 * Math.PI * idx / 10));
        this.sprite.hitArea.x = this.sprite.position.x;
        this.sprite.hitArea.y = this.sprite.position.y;
    }

    static destroyAll() {
        Particle.list.forEach((particle, index) => {
            particle.destroy();
            Particle.list.splice(index, 1);
        });
    }

}
