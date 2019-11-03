class EnemyProjectile extends Projectile {

    constructor(x, y, projectileSprite) {
        super(x, y, projectileSprite, 15, -50, 10, 10, "assets/audio/fireball.wav");
    }

}
