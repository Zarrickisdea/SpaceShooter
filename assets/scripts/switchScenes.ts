import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('switchScenes')
export class switchScenes extends Component {

    startGame() {
        console.log('start game');
        director.loadScene('Game');
    }

    protected onLoad() {
        director.preloadScene('Game');
        this.node.on(Node.EventType.TOUCH_START, this.startGame, this);
    }
}


