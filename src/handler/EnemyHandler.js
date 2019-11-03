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

    spawnEnemies() {
        if (GHOSTS_KILLED === GHOST_KILL_THRESHOLD) {
            enemyHandler.clearGhosts();
            FIRST_WAVE = false;
            SECOND_WAVE = true;
        }

        if (PUMPKINS_KILLED === PUMPKIN_KILL_THRESHOLD) {
            enemyHandler.clearPumpkins();
            SECOND_WAVE = false;
            BOSS = true;
        }

        if (FIRST_WAVE) {
            enemyHandler.spawnGhosts();
        } else if (SECOND_WAVE) {
            enemyHandler.spawnPumpkins();
        }
    }

    spawnGhosts() {
        if (!this.ghostSpawnInterval) {
            this.ghostSpawnInterval = window.setInterval(function () {
                if (_ghosts.length <= 10) {
                    const ghost = new Ghost();
                    _ghosts.push(ghost);
                }
            }.bind(this), 2000);
        }
    }

    spawnPumpkins() {
        if (!this.pumpkinSpawnInterval) {
            this.pumpkinSpawnInterval = window.setInterval(function () {
                if (_pumpkins.length <= 10) {
                    const pumpkin = new Pumpkin();
                    _pumpkins.push(pumpkin);
                }
            }.bind(this), 2000);
        }
    }

    updateEnemies() {
        if (player.isAlive) {
            _ghosts.forEach((enemy, index, array) => {
                enemy.update();
                if (!enemy.isAlive) {
                    let moan = new Audio("assets/audio/ghost_death.wav");
                    const x = enemy.sprite.position.x;
                    const y = enemy.sprite.position.y;
                    enemy.sprite.destroy();
                    array.splice(index, 1);
                    EnemyHandler.deathAnimation(x, y, GHOST_EXPLOSION);
                    moan.play();
                }
                else if (enemy.sprite.position.x < -renderer.width * 0.3) {
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
                else if (!enemy.isAlive || enemy.sprite.position.x < -renderer.width * 0.3) {
                    enemy.sprite.destroy();
                    array.splice(index, 1);
                }
            });
        }
    }

    static deathAnimation(x, y, spritePath) {
        let newSprite = new PIXI.Sprite(PIXI.loader.resources[spritePath].texture);
        newSprite.position.set(x, y);
        stage.addChild(newSprite);
        setTimeout(() => {
            newSprite.destroy();
        }, 300)
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
        this.ghostSpawnInterval = null;

        _ghosts.forEach((ghost, index) => {
            ghost.destroy();
            _ghosts.splice(index, 1);
        });
    }

    clearPumpkins() {
        this.pumpkinSpawnInterval = null;

        _pumpkins.forEach((pumpkin, index) => {
            pumpkin.destroy();
            _pumpkins.splice(index, 1);
        });
    }

    clearAll() {
        this.clearGhosts();
        this.clearPumpkins();
    }

}
