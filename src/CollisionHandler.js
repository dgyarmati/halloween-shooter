class CollisionHandler {

    static destroyPlayerIfHit(player, enemyProjectile) {
        if (CollisionHandler.hitBoxesIntersect(player.sprite.hitArea, enemyProjectile.sprite.hitArea)) {
            player.isAlive = false;
        }
    }

    static destroyPlayerAndEnemyOnCollision(player, enemy) {
        if (CollisionHandler.hitBoxesIntersect(player.sprite.hitArea, enemy.sprite.hitArea)) {
            player.isAlive = false;
            enemy.isAlive = false;
        }
    }

    static destroyEnemyIfHit(enemy, playerProjectile) {
        if (CollisionHandler.hitBoxesIntersect(enemy.sprite.hitArea, playerProjectile.sprite.hitArea)) {
            enemy.isAlive = false;
            CollisionHandler.explode(enemy);
        }
    }

    static explode(enemy) {
        let radius = 10;
        let steps = 10;
        let x = enemy.sprite.position.x;
        let y = enemy.sprite.position.y;
        for (let i = 0; i < steps; i++) {
            x = (enemy.sprite.position.x + radius * Math.cos(2 * Math.PI * i / 10));
            y = (enemy.sprite.position.y + radius * Math.sin(2 * Math.PI * i / 10));
            ProjectileHandler.createExplosionParticle(x, y);
        }
    }

    static hitBoxesIntersect(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }
}
