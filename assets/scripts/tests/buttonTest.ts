import { _decorator, Component, instantiate, Node, Prefab, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('buttonTest')
export class buttonTest extends Component {

    @property({type: Node})
    private testThing: Node = null;

    @property({type: Prefab})
    private testThing2: Prefab = null;

    private testFunction() {
        let bullet = instantiate(this.testThing2);
        bullet.setParent(this.testThing);
    }

    protected onLoad() {
        console.log("buttonTest loaded");
    }

    public onButtonClicked() {
        console.log("button clicked");
        this.testFunction();
    }
}


