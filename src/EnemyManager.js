class EnemyManager {
    constructor() {
        this.enemies = [];

        window.setInterval(function () {
            const enemy = new Enemy();
            this.enemies.push(enemy);
        }.bind(this), 2000);
    }

    update() {
        this.enemies.forEach((element, index, array) => {
            element.update();
            if (element.sprite.position.x < -renderer.width * 0.3) {
                element.sprite.destroy();
                array.splice(index, 1);
            }
        });
    }

}
