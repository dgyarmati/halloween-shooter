let _particles = [];

class Particle {
    static get list() {
        return _particles;
    }

    constructor(x, y) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/enemyShoot.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(x, y);
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 5, 5);

        this.speed = 60;
        Particle.list.push(this);

        stage.addChild(this.sprite);
    }

    update() {
        // this.sprite.position.x -= this.speed;
        this.sprite.hitArea.x = this.sprite.position.x;

        if (this.sprite.position.x > renderer.width * 1.1) {
            this.sprite.destroy();
            Particle.list.splice(Particle.list.indexOf(this), 1);
        }
    }

}
