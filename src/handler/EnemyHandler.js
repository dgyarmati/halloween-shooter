let _enemies = [];

class EnemyHandler {

    static get enemies() {
        return _enemies;
    }

    constructor() {
        this.enemySpawnInterval = null;
    }

    spawnEnemies() {
        this.enemySpawnInterval = window.setInterval(function () {
            if (_enemies.length <= 10) {
                const enemy = new Enemy();
                _enemies.push(enemy);
            }
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

    handleCollisionsWithPlayer() {
        _enemies.forEach((enemy) => {
            CollisionHandler.destroyPlayerAndEnemyOnCollision(player, enemy);
        });
    }

    clearAll() {
        window.clearInterval(this.enemySpawnInterval);
        _enemies.forEach((enemy, index) => {
            enemy.destroy();
            _enemies.splice(index, 1);
        });
    }

}
