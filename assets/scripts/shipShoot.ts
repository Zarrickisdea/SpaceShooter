import { _decorator, Component, Node, instantiate, Contact2DType, Collider2D, director, Canvas, Prefab, Quat, PhysicsSystem2D, UITransform } from 'cc';
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
        this.bulletMovement.attachedShip = this;
        bullet.active = false;
        this.canvas.addChild(bullet);
        return bullet;
    }

    protected onLoad() {
        this.canvas = director.getScene().getChildByName("Canvas");

        this.collider = this.node.getComponent(Collider2D);

        for (let i = 0; i < 1; i++) {
            this.bulletPool.push(this.createBullet());
        }
    }

    protected onEnable(): void {
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

        PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    protected start() {
        this.schedule(this.shootBullet, Math.random() * this.shootInterval);
    }

    protected onDisable(): void {
        // check if the parent node of this node has any active children, if not, call respawnEnemies()
        if (!this.node.parent.children.some(child => child.active)) {
            this.node.parent.getComponent(enemySpawner).respawnEnemies();
        }

        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

        PhysicsSystem2D.instance.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        if (otherCollider.node.getComponent(playerBulletMovement) && selfCollider.node.getComponent(shipShoot)) {
            selfCollider.node.active = false;
        }
    }
}


