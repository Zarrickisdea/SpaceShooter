import { _decorator, Component, Node, Prefab, instantiate, Input, input, KeyCode, macro, sys } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('playerShoot')
export class playerShoot extends Component {

    @property({type: Prefab})
    private playerBulletPrefab: Prefab = null;

    @property({range: [0, 1, 0.1], slide: true})
    private shootInterval: number = 0;

    @property({range: [0, 1, 0.1], slide: true})
    private repeatInterval: number = 0;

    private playerBulletPool: Node[] = [];

    private canvas: Node = null;

    private createPlayerBullet(): Node {
        let bullet = instantiate(this.playerBulletPrefab);
        this.node.addChild(bullet);
        bullet.active = false;
        return bullet;
    }

    private makePlayerBulletPool() {
        for (let i = 0; i < 10; i++) {
            this.playerBulletPool.push(this.createPlayerBullet());
        }
    }

    private getPlayerBullet(): Node {
        let bullet = this.playerBulletPool.pop();
        if (!bullet) {
            bullet = this.createPlayerBullet();
            return bullet;
        }
        return bullet;
    }

    private shootBullet() {
        let bullet = this.getPlayerBullet();
        bullet.setParent(this.canvas);
        bullet.setPosition(this.node.position);
        bullet.active = true;
    }

    private shoot(event) {
        if (event.type === Input.EventType.TOUCH_START || event.keyCode === KeyCode.SPACE || event.type === Input.EventType.TOUCH_MOVE) {
            this.schedule(this.shootBullet, this.shootInterval, macro.REPEAT_FOREVER, this.repeatInterval);
        }
    }

    private stopShoot(event) {
        if (event.type === Input.EventType.TOUCH_END || event.keyCode === KeyCode.SPACE || event.type === Input.EventType.TOUCH_CANCEL) {
            this.unschedule(this.shootBullet);
        }
    }

    public returnPlayerBullet(bullet: Node) {
        this.playerBulletPool.push(bullet);
    }

    protected onLoad() {
        this.canvas = this.node.parent;
        this.makePlayerBulletPool();

        // IF DESKTOP BROSWER OR SIMULATOR
        if (sys.platform === sys.Platform.DESKTOP_BROWSER) {
            input.on(Input.EventType.KEY_DOWN, this.shoot, this);
            input.on(Input.EventType.KEY_UP, this.stopShoot, this);
        } else if (sys.platform === sys.Platform.MOBILE_BROWSER || EDITOR) {
            input.on(Input.EventType.TOUCH_START, this.shoot, this);
            input.on(Input.EventType.TOUCH_MOVE, this.shoot, this);
            input.on(Input.EventType.TOUCH_END, this.stopShoot, this);
            input.on(Input.EventType.TOUCH_CANCEL, this.stopShoot, this);
        }
    }
}


