import { _decorator, Component, Node, Prefab, instantiate, Input, input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerShoot')
export class playerShoot extends Component {

    @property({type: Prefab})
    private playerBulletPrefab: Prefab = null;

    private playerBulletPool: Node[] = [];

    private canvas: Node = null;

    private createPlayerBullet(): Node {
        let bullet = instantiate(this.playerBulletPrefab);
        bullet.active = false;
        this.node.addChild(bullet);
        return bullet;
    }

    private makePlayerBulletPool() {
        for (let i = 0; i < 5; i++) {
            this.playerBulletPool.push(this.createPlayerBullet());
        }
    }

    private getPlayerBullet(): Node {
        for (let i = 0; i < this.playerBulletPool.length; i++) {
            if (!this.playerBulletPool[i].activeInHierarchy) {
                return this.playerBulletPool[i];
            }
        }
        return this.createPlayerBullet();
    }

    private shoot(event) {
        this.schedule(() => {
            let bullet = this.getPlayerBullet();
            bullet.setParent(this.canvas);
            bullet.setWorldPosition(this.node.worldPosition);
            bullet.active = true;
        }, 5);
    }

    protected onLoad() {
        this.canvas = this.node.parent;
        this.makePlayerBulletPool();

        input.on(Input.EventType.TOUCH_START, this.shoot, this);
        input.on(Input.EventType.TOUCH_MOVE, this.shoot, this);
        input.on(Input.EventType.TOUCH_END, this.shoot, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.shoot, this);
    }

    protected start() {

    }

    protected update(deltaTime: number) {

    }
}


