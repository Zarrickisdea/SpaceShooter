import { _decorator, Collider2D, Component, director, Node, tween, Vec3, Contact2DType, Collider, PhysicsSystem2D, UITransform } from 'cc';
import { playerShoot } from './playerShoot';
const { ccclass, property } = _decorator;

@ccclass('playerBulletMovement')
export class playerBulletMovement extends Component {
    private player: playerShoot = null;
    private canvas: UITransform = null;

    private firingTween: any = null;

    @property
    private moveSpeed: number = 0;

    private startTween() {
        this.firingTween = tween(this.node)
        .to(1, {position: new Vec3(this.node.position.x, this.canvas.height, 0)}, {easing: 'linear'})
        .start();
    }

    private cancelTween() {
        if (this.firingTween){
            this.firingTween.stop();
            this.firingTween = null;
        }
    }

    protected onLoad() {
        this.canvas = director.getScene().getChildByName('Canvas').getComponent(UITransform);
        this.player = this.canvas.getComponentInChildren(playerShoot);
    }

    protected onEnable(): void {
        this.cancelTween();

        this.startTween();
    }

    protected start() {

    }

    protected update(deltaTime: number) {
        if (this.node.position.y > this.canvas.height / 2) {
            this.node.active = false;
        }
    }

    protected onDisable(): void {
        this.cancelTween();
        this.player.returnPlayerBullet(this.node);
    }
}


