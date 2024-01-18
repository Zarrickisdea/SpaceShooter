import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { playerShoot } from './playerShoot';
const { ccclass, property } = _decorator;

@ccclass('playerBulletMovement')
export class playerBulletMovement extends Component {
    private player: playerShoot = null;

    protected onLoad() {
        this.player = this.node.parent.getComponent(playerShoot);
    }

    protected onEnable(): void {
        tween(this.node)
        .by(10, {position: new Vec3(0, 720, 0)})
        .start();
    }

    protected start() {

    }

    protected update(deltaTime: number) {
        if (this.node.position.y > 360) {
            this.node.active = false;
        }
    }

    protected onDisable(): void {
        this.player.returnPlayerBullet(this.node);
    }
}


