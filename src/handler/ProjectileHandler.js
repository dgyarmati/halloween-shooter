let _playerProjectiles = [];
let _enemyProjectiles = [];
let _explosionParticles = [];

class ProjectileHandler {

    static get playerProjectiles() {
        return _playerProjectiles;
    }

    static get enemyProjectiles() {
        return _enemyProjectiles;
    }

    static get explosionParticles() {
        return _explosionParticles;
    }

    static createPlayerProjectile(x, y) {
        _playerProjectiles.push(new PlayerProjectile(x, y));
    }

    static createEnemyProjectile(x, y, projectileSprite) {
        _enemyProjectiles.push(new EnemyProjectile(x, y, projectileSprite));
    }

    static createExplosionParticle(x, y) {
        _explosionParticles.push(new ExplosionParticle(x, y));
    }

    handleProjectiles() {
        _playerProjectiles.forEach((playerProjectile, idx) => {
            ProjectileHandler.updatePlayerProjectile(idx, playerProjectile, _playerProjectiles);
            EnemyHandler.ghosts.forEach((enemy) => {
                CollisionHandler.destroyGhostIfHit(enemy, playerProjectile);
            })
        });

        _playerProjectiles.forEach((playerProjectile, idx) => {
            ProjectileHandler.updatePlayerProjectile(idx, playerProjectile, _playerProjectiles);
            EnemyHandler.pumpkins.forEach((enemy) => {
                CollisionHandler.destroyPumpkinIfHit(enemy, playerProjectile);
            })
        });

        if (boss) {
            _playerProjectiles.forEach((playerProjectile, idx) => {
                ProjectileHandler.updatePlayerProjectile(idx, playerProjectile, _playerProjectiles);
                CollisionHandler.damageBossIfHit(boss, playerProjectile);
            });
        }

        _enemyProjectiles.forEach((enemyProjectile, idx) => {
            ProjectileHandler.updateEnemyProjectile(idx, enemyProjectile, _enemyProjectiles);
            CollisionHandler.destroyPlayerIfHit(player, enemyProjectile);
        });

        _explosionParticles.forEach((explosionParticle, idx) => {
            ProjectileHandler.updateExplosionParticle(idx, explosionParticle);
            CollisionHandler.destroyPlayerIfHit(player, explosionParticle);
        });
    }

    static updatePlayerProjectile(idx, playerProjectile, projectiles) {
        playerProjectile.sprite.position.x += playerProjectile.speed;
        ProjectileHandler._updateProjectile(idx, playerProjectile, projectiles);
    }

    static updateEnemyProjectile(idx, enemyProjectile, projectiles) {
        enemyProjectile.sprite.position.x -= enemyProjectile.speed;
        ProjectileHandler._updateProjectile(idx, enemyProjectile, projectiles);
    }

    static updateExplosionParticle(idx, explosionParticle) {
        explosionParticle.sprite.position.x = (explosionParticle.sprite.position.x + explosionParticle.speed * Math.cos(2 * Math.PI * idx / 10));
        explosionParticle.sprite.position.y = (explosionParticle.sprite.position.y + explosionParticle.speed * Math.sin(2 * Math.PI * idx / 10));
        explosionParticle.sprite.hitArea.x = explosionParticle.sprite.position.x;
        explosionParticle.sprite.hitArea.y = explosionParticle.sprite.position.y;
    }

    static _updateProjectile(idx, projectile, projectiles) {
        projectile.sprite.hitArea.x = projectile.sprite.position.x;

        if (projectile.sprite.position.x > renderer.width * 1.1) {
            projectile.sprite.destroy();
            projectiles.splice(idx, 1);
        }

    }

    clearAll() {
        this._clearAll(_playerProjectiles);
        this._clearAll(_enemyProjectiles);
        this._clearAll(_explosionParticles);
    }

    _clearAll(projectiles) {
        projectiles.forEach((projectile, index) => {
            projectile.sprite.destroy();
            projectiles.splice(index, 1);
        });
    }
}
