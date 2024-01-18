import { _decorator, Component, Node, director } from 'cc';
import { LevelNameStrings } from './LevelNameStrings';
const { ccclass, property } = _decorator;

@ccclass('switchScenes')
export class switchScenes extends Component {

    public loadLevelOne() {
        director.loadScene(LevelNameStrings.LEVEL_1);
    }

    public loadLevelTwo() {
        director.loadScene(LevelNameStrings.LEVEL_2);
    }

    public loadLevelThree() {
        director.loadScene(LevelNameStrings.LEVEL_3);
    }

    public loadStart() {
        director.loadScene(LevelNameStrings.START);
    }

    protected onLoad() {
        director.preloadScene(LevelNameStrings.LEVEL_1);
        director.preloadScene(LevelNameStrings.LEVEL_2);
        director.preloadScene(LevelNameStrings.LEVEL_3);
    }
}


