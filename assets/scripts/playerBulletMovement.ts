import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerBulletMovement')
export class playerBulletMovement extends Component {
    protected onLoad() {

    }

    protected onEnable(): void {
        tween(this.node)
        .by(20, {position: new Vec3(0, 360, 0)})
        .start();
    }

    protected start() {

    }

    protected update(deltaTime: number) {
        if (this.node.position.y > 5.5) {
            this.node.active = false;
        }
    }
}


