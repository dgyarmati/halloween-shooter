let _enemies = [];
let _spawnEnemies;

class EnemyManager {
    static get list() {
        return _enemies;
    }

    constructor() {
        _spawnEnemies = window.setInterval(function () {
            if (EnemyManager.list.length <= 15) {
                const enemy = new Enemy();
                EnemyManager.list.push(enemy);
            }
        }.bind(this), 2000);
    }

    updateEnemies() {
        EnemyManager.list.forEach((enemy, index, array) => {
            enemy.update();
            if (!enemy.isAlive || enemy.sprite.position.x < -renderer.width * 0.3) {
                enemy.sprite.destroy();
                array.splice(index, 1);
            }
        });
    }

    static destroyAll() {
        window.clearInterval(_spawnEnemies);
        EnemyManager.list.forEach((enemy, index) => {
            enemy.destroy();
            EnemyManager.list.splice(index, 1);
        });
    }

}
