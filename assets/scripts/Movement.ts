import { _decorator, Component, Node, input, Input, KeyCode, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Movement')
export class Movement extends Component {

    @property
    private xSpeed: number = 0;

    private moveLeft:number = 0;
    private moveRight:number = 0;

    private touchContentWidth: number = 0;

    private moveJet(event, isMoving: boolean) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.moveLeft = isMoving ? 1 : 0;
                break;
            case KeyCode.KEY_D:
                this.moveRight = isMoving ? 1 : 0;
                break;
        }
    }

    private touchMoveJet(event, isMoving: boolean) {
        if (event.getLocationX() < this.touchContentWidth / 2) {
            this.moveLeft = isMoving ? 1 : 0;
        } else if (event.getLocationX() > this.touchContentWidth / 2) {
            this.moveRight = isMoving ? 1 : 0;
        }
    }

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, (event) => this.moveJet(event, true), this);
        input.on(Input.EventType.KEY_UP, (event) => this.moveJet(event, false), this);

        this.touchContentWidth = this.node.parent.getComponent(UITransform)?.contentSize.width;
        
        input.on(Input.EventType.TOUCH_START, (event) => this.touchMoveJet(event, true), this);
        input.on(Input.EventType.TOUCH_END, (event) => this.touchMoveJet(event, false), this);
    }

    protected start(): void {
        
    }

    protected update(dt): void {
        if (this.moveLeft) {
            this.node.setPosition(this.node.position.x - this.xSpeed, this.node.position.y, this.node.position.z);
        }
        if (this.moveRight) {
            this.node.setPosition(this.node.position.x + this.xSpeed, this.node.position.y, this.node.position.z);
        }
    }
}