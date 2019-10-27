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

    updateEnemies() {
        _enemies.forEach((enemy, index, array) => {
            enemy.update();
            if (!enemy.isAlive || enemy.sprite.position.x < -renderer.width * 0.3) {
                enemy.sprite.destroy();
                array.splice(index, 1);
            }
        });
    }

}
