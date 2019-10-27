class CollisionHandler {

    destroyPlayerIfHit(player, enemyProjectile) {
        if (this.hitBoxesIntersect(player.sprite.hitArea, enemyProjectile.sprite.hitArea)) {
            player.isAlive = false;
        }
    }

    destroyPlayerAndEnemyOnCollision(player, enemy) {
        if (this.hitBoxesIntersect(player.sprite.hitArea, enemy.sprite.hitArea)) {
            player.isAlive = false;
            enemy.isAlive = false;
        }
    }

    destroyEnemyIfHit(enemy, rocket) {
        if (this.hitBoxesIntersect(enemy.sprite.hitArea, rocket.sprite.hitArea)) {
            enemy.isAlive = false;
        }
    }

    hitBoxesIntersect(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }
}
