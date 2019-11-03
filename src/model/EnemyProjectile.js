class EnemyProjectile extends Projectile {

    constructor(x, y) {
        super(x, y, ENEMY_PROJECTILE_SPRITE, 15, -50, 10, 10, "assets/audio/fireball.wav");
    }

}
