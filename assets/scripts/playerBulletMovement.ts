import { _decorator, Component, director, Node, tween, Vec3 } from 'cc';
import { playerShoot } from './playerShoot';
const { ccclass, property } = _decorator;

@ccclass('playerBulletMovement')
export class playerBulletMovement extends Component {
    private player: playerShoot = null;
    private canvas: Node = null;

    private firingTween: any = null;

    private startTween() {
        this.firingTween = tween(this.node)
        .to(1, {position: new Vec3(this.node.position.x, 720, 0)}, {easing: 'linear'})
        .start();
    }

    private cancelTween() {
        if (this.firingTween){
            this.firingTween.stop();
            this.firingTween = null;
        }
    }

    protected onLoad() {
        this.canvas = director.getScene().getChildByName('Canvas');
        this.player = this.canvas.getComponentInChildren(playerShoot);
    }

    protected onEnable(): void {
        this.cancelTween();

        this.startTween();
    }

    protected start() {

    }

    protected update(deltaTime: number) {
        if (this.node.position.y > 360) {
            this.node.active = false;
        }
    }

    protected onDisable(): void {
        this.cancelTween();
        this.player.returnPlayerBullet(this.node);
        console.log
    }
}


