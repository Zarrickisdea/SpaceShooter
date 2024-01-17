import { _decorator, Component, Node, instantiate, Vec3, game, director, Canvas, Prefab, Quat } from 'cc';
import { bulletMovement } from './bulletMovement';
const { ccclass, property } = _decorator;

@ccclass('shipShoot')
export class shipShoot extends Component {

    private shootInterval: number = 10;
    private canvas: Node = null;
    private bulletMovement: bulletMovement = null;

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

        for (let i = 0; i < 1; i++) {
            this.bulletPool.push(this.createBullet());
        }
    }

    protected start() {
        this.schedule(this.shootBullet, Math.random() * this.shootInterval);
    }
}


