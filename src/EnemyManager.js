let _enemies = [];

class EnemyManager {
    static get list() {
        return _enemies;
    }

    constructor() {
        window.setInterval(function () {
            const enemy = new Enemy();
            _enemies.push(enemy);
        }.bind(this), 2000);
    }

    update() {
        _enemies.forEach((element, index, array) => {
            element.update();
            if (element.sprite.position.x < -renderer.width * 0.3) {
                element.sprite.destroy();
                array.splice(index, 1);
            }
        });
    }

}
