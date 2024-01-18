import { _decorator, Component, Node, director } from 'cc';
import { LevelNameStrings } from './LevelNameStrings';
const { ccclass, property } = _decorator;

@ccclass('switchScenes')
export class switchScenes extends Component {

    private startGame() {
        director.loadScene(LevelNameStrings.LEVEL_1);
    }

    protected onLoad() {
        director.preloadScene(LevelNameStrings.LEVEL_1);
        this.node.on(Node.EventType.TOUCH_START, this.startGame, this);
    }
}


