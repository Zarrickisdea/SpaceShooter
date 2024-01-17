import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerShoot')
export class playerShoot extends Component {

    @property({type: Prefab})
    private playerBulletPrefab: Prefab = null;

    private playerBulletPool: Node[] = [];

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

    protected onLoad() {
        this.makePlayerBulletPool();
    }

    protected start() {

    }

    protected update(deltaTime: number) {

    }
}


