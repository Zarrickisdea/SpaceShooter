import { _decorator, Component, Node } from 'cc';
import { playerShoot } from './playerShoot';
import { enemySpawner } from './enemySpawner';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property
    private enemyRows: enemySpawner[] = [];

    @property({type: playerShoot})
    private playerShoot: playerShoot = null;

    protected onLoad() {

    }

    protected start() {
        
    }
}


