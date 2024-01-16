import { _decorator, Component, Node, instantiate, Vec3, game, director, Canvas, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shipShoot')
export class shipShoot extends Component {

    private shootInterval: number = 0;
    private canvas: Node = null;
    private bulletPool: Node[] = [];

    @property({ type: Prefab })
    private bulletPrefab: Prefab = null;

    private shootBullet() {
        let activeBullet = this.bulletPool.find(bullet => !bullet.active);
        if (activeBullet) {
            activeBullet.active = true;
        } else {
            let bullet = this.createBullet();
            bullet.active = true;
        }
    }

    private makeBulletPool() {
        for (let i = 0; i < 2; i++) {
            let bullet = this.createBullet();
            bullet.active = false;
        }
    }

    private createBullet(): Node {
        let bullet = instantiate(this.bulletPrefab);
        bullet.parent = this.canvas;
        bullet.position = new Vec3(this.node.position.x, this.node.parent.position.y, 0);
        bullet.active = false;
        this.bulletPool.push(bullet);
        return bullet;
    }

    protected onLoad() {
        this.canvas = director.getScene().getChildByName("Canvas");
    }

    protected start() {
        this.makeBulletPool();
    }

    protected update(deltaTime: number) {
        this.shootInterval += deltaTime;
        if (this.shootInterval >= 3) {
            this.scheduleOnce(() => {
                this.shootBullet();
            }, this.shootInterval);
            this.shootInterval = 0;
        }
    }
}


