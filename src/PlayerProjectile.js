let _rocketList = new Array();

class PlayerProjectile {
    static get list() {
        return _rocketList;
    }

    static set list(value) {
        _rocketList = value;
    }

    constructor(x, y) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["assets/rocket.png"].texture);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(x + 50, y);
        this.sprite.hitArea = new PIXI.Rectangle(this.sprite.position.x, this.sprite.position.y, 20, 20);

        this.speed = 20;
        PlayerProjectile.list.push(this);

        stage.addChild(this.sprite);
    }

    update() {
        this.sprite.position.x += this.speed;
        this.sprite.hitArea.x = this.sprite.position.x;

        if (this.sprite.position.x > renderer.width * 1.1) {
            this.sprite.destroy();
            PlayerProjectile.list.splice(PlayerProjectile.list.indexOf(this), 1);
        }
    }
}
