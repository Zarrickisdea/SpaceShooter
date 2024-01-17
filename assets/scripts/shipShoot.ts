import { _decorator, Component, Node, instantiate, Vec3, game, director, Canvas, Prefab, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shipShoot')
export class shipShoot extends Component {

    private shootInterval: number = 10;
    private canvas: Node = null;

    private activeBullet: Node = null;

    private shootBullet() {
        this.activeBullet = this.createBullet();
        if (this.activeBullet) {
            this.activeBullet.active = true;
        } else {
            this.activeBullet = this.createBullet();
            this.activeBullet.active = true;
        }
    }

    private createBullet(): Node {
        let bullet = instantiate(this.node.children[0]);
        bullet.setParent(this.canvas);
        bullet.setWorldPosition(this.node.getWorldPosition().x, this.node.getWorldPosition().y, 0);
        bullet.active = false;
        return bullet;
    }

    protected onLoad() {
        this.canvas = director.getScene().getChildByName("Canvas");
    }

    protected start() {
        this.schedule(this.shootBullet, Math.random() * this.shootInterval);
    }
}


