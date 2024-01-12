import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('buttonTest')
export class buttonTest extends Component {

    @property({type: Node})
    private testLayout: Node = null;
    
    private moveDuration: number = 2;

    private testFunction() {
    }

    protected onLoad() {
        console.log("buttonTest loaded");
    }

    public onButtonClicked() {
        console.log("button clicked");
        this.testFunction();
    }
}


