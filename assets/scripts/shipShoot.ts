import { _decorator, Component, Node, instantiate, Contact2DType, Collider2D, director, Canvas, Prefab, Quat, PhysicsSystem2D, UITransform, RigidBody2D } from 'cc';
import { bulletMovement } from './bulletMovement';
import { playerBulletMovement } from './playerBulletMovement';
import { enemySpawner } from './enemySpawner';
const { ccclass, property } = _decorator;

@ccclass('shipShoot')
export class shipShoot extends Component {

    private shootInterval: number = 10;
    private canvas: Node = null;
    private bulletMovement: bulletMovement = null;
    private collider: Collider2D = null;
    private hitsToKill: number = 5;
    private parentRow: enemySpawner = null;

    public currentlyShooting: boolean = false;
    public bulletPool: Node[] = [];

    @property({type: Prefab})
    private bulletPrefab: Prefab = null;

    private shootBullet() {
        if (this.currentlyShooting) {
            return;
        }

        var bullet = this.bulletPool.pop();
        if (!bullet) {
            bullet = this.createBullet();
        }

        bullet.setWorldPosition(this.node.worldPosition);
        bullet.active = true;

        this.currentlyShooting = true;
    }

    private createBullet(): Node {
        var bullet = instantiate(this.bulletPrefab)
        this.bulletMovement = bullet.getComponent(bulletMovement);
        this.bulletMovement.setAttachedShip(this);
        bullet.active = false;
        this.canvas.addChild(bullet);
        return bullet;
    }

    public setHitPoints(hits: number) {
        this.hitsToKill = Math.random() * hits + 5;
        console.log("hitsToKill: " + this.hitsToKill);
    }

    protected onLoad() {
        this.canvas = director.getScene().getChildByName("Canvas");
        this.parentRow = this.node.getParent().getComponent(enemySpawner);

        this.collider = this.node.getComponent(Collider2D);

        for (let i = 0; i < 1; i++) {
            this.bulletPool.push(this.createBullet());
        }
    }

    protected onEnable(): void {
        this.node.getComponent(RigidBody2D).enabled = true;
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

        PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    protected start() {
        this.schedule(this.shootBullet, Math.random() * this.shootInterval);
    }

    protected onDisable(): void {
        this.node.getComponent(RigidBody2D).enabled = false;
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

        PhysicsSystem2D.instance.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        if (otherCollider.node.getComponent(playerBulletMovement) && selfCollider.node.getComponent(shipShoot)) {
            this.hitsToKill--;

            setTimeout(() => {
                otherCollider.node.active = false;
            }, 1);

            if (this.hitsToKill <= 0) {
                setTimeout(() => {
                    selfCollider.node.active = false;
                    this.parentRow.shipDestroyed();
                }, 1);
            }
        }
    }
}


