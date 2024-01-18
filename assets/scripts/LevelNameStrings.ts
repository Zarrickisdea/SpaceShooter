import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelNameStrings')
export class LevelNameStrings extends Component {
    public static readonly START: string = "Start";
    public static readonly LEVEL_1: string = "Level 1";
    public static readonly LEVEL_2: string = "Level 2";
    public static readonly LEVEL_3: string = "Level 3";
}


