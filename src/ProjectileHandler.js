class ProjectileHandler {

    constructor(collisionHandler, enemyHandler) {
        this.enemyProjectiles = [];
        this.playerProjectiles = [];
        this.explosionParticles = [];
        this.collisionHandler = collisionHandler;
        this.enemyHandler = enemyHandler;
    }

    createPlayerProjectile(x, y) {
        this.playerProjectiles.push(new PlayerProjectile(x, y));
    }

    createEnemyProjectile(x, y) {
        this.enemyProjectiles.push(new EnemyProjectile(x, y));
    }

    createExplosionParticle(x, y) {
        this.explosionParticles.push(new ExplosionParticle(x, y));
    }

    handleProjectiles() {
        this.playerProjectiles.forEach((playerProjectile, idx) => {
            this.updatePlayerProjectile(idx, playerProjectile, this.playerProjectiles);
            this.enemyHandler.enemies.forEach((enemy) => {
                this.collisionHandler.destroyEnemyIfHit(enemy, playerProjectile);
            })
        });

        this.enemyProjectiles.forEach((enemyProjectile, idx) => {
            this.updateEnemyProjectile(idx, enemyProjectile, this.enemyProjectiles);
            this.collisionHandler.destroyPlayerIfHit(player, enemyProjectile);
        });

        this.explosionParticles.forEach((explosionParticle, idx) => {
            this.updateExplosionParticle(idx, explosionParticle);
            this.collisionHandler.destroyPlayerIfHit(player, explosionParticle);
        });
    }

    updatePlayerProjectile(idx, playerProjectile, projectiles) {
        playerProjectile.sprite.position.x += playerProjectile.speed;
        this._updateProjectile(idx, playerProjectile, projectiles);
    }

    updateEnemyProjectile(idx, enemyProjectile, projectiles) {
        enemyProjectile.sprite.position.x -= enemyProjectile.speed;
        this._updateProjectile(idx, enemyProjectile, projectiles);
    }

    updateExplosionParticle(idx, explosionParticle) {
        explosionParticle.sprite.position.x = (explosionParticle.sprite.position.x + explosionParticle.speed * Math.cos(2 * Math.PI * idx / 10));
        explosionParticle.sprite.position.y = (explosionParticle.sprite.position.y + explosionParticle.speed * Math.sin(2 * Math.PI * idx / 10));
        explosionParticle.sprite.hitArea.x = explosionParticle.sprite.position.x;
        explosionParticle.sprite.hitArea.y = explosionParticle.sprite.position.y;
    }

    _updateProjectile(idx, projectile, projectiles) {
        projectile.sprite.hitArea.x = projectile.sprite.position.x;

        if (projectile.sprite.position.x > renderer.width * 1.1) {
            projectile.sprite.destroy();
            projectiles.splice(idx, 1);
        }

    }

    clearAll() {
        this._clearAll(this.playerProjectiles);
        this._clearAll(this.enemyProjectiles);
        this._clearAll(this.explosionParticles);
    }

    _clearAll(projectiles) {
        projectiles.forEach((projectile, index) => {
            projectile.sprite.destroy();
            projectiles.splice(index, 1);
        });
    }
}
