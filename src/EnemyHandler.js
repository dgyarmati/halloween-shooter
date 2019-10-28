class EnemyHandler {

    constructor(collisionHandler, projectileHandler) {
        this.enemies = [];
        this.enemySpawnInterval = null;
        this.collisionHandler = collisionHandler;
    }

    spawnEnemies() {
        this.enemySpawnInterval = window.setInterval(function () {
            if (this.enemies.length <= 15) {
                const enemy = new Enemy(projectileHandler);
                this.enemies.push(enemy);
            }
        }.bind(this), 2000);
    }

    updateEnemies() {
        this.enemies.forEach((enemy, index, array) => {
            enemy.update();
            if (!enemy.isAlive || enemy.sprite.position.x < -renderer.width * 0.3) {
                enemy.sprite.destroy();
                array.splice(index, 1);
            }
        });
    }

    handleCollisionsWithPlayer() {
        this.enemies.forEach((enemy) => {
            this.collisionHandler.destroyPlayerAndEnemyOnCollision(player, enemy);
        });
    }

    clearAll() {
        window.clearInterval(this.enemySpawnInterval);
        this.enemies.forEach((enemy, index) => {
            enemy.destroy();
            this.enemies.splice(index, 1);
        });
    }

}
