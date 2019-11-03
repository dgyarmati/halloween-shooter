let _pumpkins = [];
let _ghosts = [];
let boss = null;

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
            BOSS_STAGE = true;
        }

        if (FIRST_WAVE) {
            enemyHandler.spawnGhosts();
        } else if (SECOND_WAVE) {
            enemyHandler.spawnPumpkins();
        } else if (BOSS_STAGE && !boss) {
            boss = new Boss();
        }
    }

    spawnGhosts() {
        if (!this.ghostSpawnInterval && gameStarted) {
            this.ghostSpawnInterval = window.setInterval(function () {
                if (_ghosts.length <= 10) {
                    const ghost = new Ghost();
                    _ghosts.push(ghost);
                }
            }.bind(this), 2000);
        }
    }

    spawnPumpkins() {
        if (!this.pumpkinSpawnInterval && gameStarted) {
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
                    const x = enemy.sprite.position.x;
                    const y = enemy.sprite.position.y;
                    enemy.sprite.destroy();
                    array.splice(index, 1);
                    EnemyHandler.deathAnimation(x, y, PUMPKIN_EXPLOSION);
                    explosion.play();
                }
                else if (!enemy.isAlive || enemy.sprite.position.x < -renderer.width * 0.3) {
                    enemy.sprite.destroy();
                    array.splice(index, 1);
                }
            });

            if (boss) {
                boss.update();
                if (BOSS_HEALTH <= 0) {
                    let laugh = new Audio("assets/audio/laugh.wav");
                    const x = boss.sprite.position.x;
                    const y = boss.sprite.position.y;
                    boss.sprite.destroy();
                    EnemyHandler.deathAnimation(x, y, BIG_EXPLOSION);
                    laugh.play();
                }
            }
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

        if (boss) {
            CollisionHandler.destroyPlayerIfHit(player, boss);
        }
    }

    clearGhosts() {
        window.clearInterval(this.ghostSpawnInterval);
        this.ghostSpawnInterval = null;

        _ghosts.forEach((ghost, index) => {
            ghost.destroy();
            _ghosts.splice(index, 1);
        });
    }

    clearPumpkins() {
        window.clearInterval(this.pumpkinSpawnInterval);
        this.pumpkinSpawnInterval = null;

        _pumpkins.forEach((pumpkin, index) => {
            pumpkin.destroy();
            _pumpkins.splice(index, 1);
        });
    }

    clearBoss() {
        if (boss) {
            boss = null;
        }
    }

    clearAll() {
        this.clearGhosts();
        this.clearPumpkins();
        this.clearBoss();
    }

}
