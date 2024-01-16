import { _decorator, Component, Node, instantiate, Vec3, game, director, Canvas, Prefab, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shipShoot')
export class shipShoot extends Component {

    private shootInterval: number = 0;
    private canvas: Node = null;
    private bulletPool: Node[] = [];

    @property({ type: Node })
    private bulletNode: Node = null;

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
        let bullet = this.createBullet();
        bullet.active = false;
    }

    private createBullet(): Node {
        let bullet = this.bulletNode;
        bullet.setParent(this.canvas);
        bullet.setWorldPosition(this.node.getWorldPosition().x, this.node.getWorldPosition().y, 0);
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

        if (this.shootInterval >= Math.random() * 10) {
            this.scheduleOnce(() => {
                this.shootBullet();
            }, this.shootInterval);

            this.shootInterval = 0;
        }
    }
}


