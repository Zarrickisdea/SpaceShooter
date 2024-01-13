import { _decorator, Component, Node, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shipShoot')
export class shipShoot extends Component {
    @property
    private shootInterval: number = 0;

    private shootBullet() {
        let bullet = this.node.children[0];
        bullet.active = true;
    }

    protected onLoad() {

    }

    protected start() {

    }

    protected update(deltaTime: number) {
        this.scheduleOnce(() => {
            this.shootBullet();
        }, this.shootInterval);

    }
}


