let _pumpkins = [];
let _ghosts = [];

class EnemyHandler {

    static get pumpkins() {
        return _pumpkins;
    }

    static get ghosts() {
        return _ghosts;
    }

    constructor() {
        this.ghostSpawnInterval = null;
        this.pumpkinSpawnInterval = null;
    }

    spawnGhosts() {
        this.ghostSpawnInterval = window.setInterval(function () {
            if (_ghosts.length <= 10) {
                const ghost = new Ghost();
                _ghosts.push(ghost);
            }
        }.bind(this), 2000);
    }

    spawnPumpkins() {
        this.pumpkinSpawnInterval = window.setInterval(function () {
            if (_pumpkins.length <= 10) {
                const pumpkin = new Pumpkin();
                _pumpkins.push(pumpkin);
            }
        }.bind(this), 2000);
    }

    updateEnemies() {
        _ghosts.forEach((enemy, index, array) => {
            enemy.update();
            if (!enemy.isAlive) {
                let explosion = new Audio("assets/audio/explosion.wav");
                explosion.play();
            }
            if (!enemy.isAlive || enemy.sprite.position.x < -renderer.width * 0.3) {
                enemy.sprite.destroy();
                array.splice(index, 1);
            }
        });

        _pumpkins.forEach((enemy, index, array) => {
            enemy.update();
            if (!enemy.isAlive) {
                let explosion = new Audio("assets/audio/explosion.wav");
                explosion.play();
            }
            if (!enemy.isAlive || enemy.sprite.position.x < -renderer.width * 0.3) {
                enemy.sprite.destroy();
                array.splice(index, 1);
            }
        });
    }

    handleCollisionsWithPlayer() {
        _ghosts.forEach((enemy) => {
            CollisionHandler.destroyPlayerAndEnemyOnCollision(player, enemy);
        });

        _pumpkins.forEach((enemy) => {
            CollisionHandler.destroyPlayerAndEnemyOnCollision(player, enemy);
        });
    }

    clearGhosts() {
        window.clearInterval(this.ghostSpawnInterval);

        _ghosts.forEach((ghost, index) => {
            ghost.destroy();
            _ghosts.splice(index, 1);
        });
    }

    clearPumpkins() {
        window.clearInterval(this.pumpkinSpawnInterval);

        _pumpkins.forEach((pumpkin, index) => {
            pumpkin.destroy();
            _pumpkins.splice(index, 1);
        });
    }

    clearAll() {
        window.clearInterval(this.pumpkinSpawnInterval);

        _pumpkins.forEach((pumpkin, index) => {
            pumpkin.destroy();
            _pumpkins.splice(index, 1);
        });
    }

}
