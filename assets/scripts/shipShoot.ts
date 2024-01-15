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
            activeBullet.setPosition(this.node.getPosition());
        } else {
            let bullet = this.createBullet();
            bullet.setPosition(this.node.getPosition());
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
        bullet.setParent(this.node, true);
        this.bulletPool.push(bullet);
        return bullet;
    }

    protected onLoad() {
        this.canvas = director.getScene().getChildByName("Canvas");

        this.makeBulletPool();
    }

    protected start() {

    }

    protected update(deltaTime: number) {
        // every 1 to 4 seconds, shoot a bullet
        this.shootInterval += deltaTime;
        if (this.shootInterval > 1 + Math.random() * 10) {
            this.shootBullet();
            this.shootInterval = 0;
        }
    }
}


