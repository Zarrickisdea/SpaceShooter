import { _decorator, Component, Node, input, Input, KeyCode, UITransform, sys, Vec3, PhysicsSystem2D, Contact2DType, Collider2D, director, RigidBody2D } from 'cc';
import { EDITOR } from 'cc/env';
import { shipShoot } from './shipShoot';
import { bulletMovement } from './bulletMovement';
import { LevelNameStrings } from './LevelNameStrings';
const { ccclass, property } = _decorator;

@ccclass('Movement')
export class Movement extends Component {

    @property
    private xSpeed: number = 0;

    private moveLeft:number = 0;
    private moveRight:number = 0;
    private moveUp:number = 0;
    private moveDown:number = 0;

    private canvasUITransform: UITransform = null;

    private moveJet(event, isMoving: boolean) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.moveUp = isMoving ? 1 : 0;
                break;
            case KeyCode.KEY_A:
                this.moveLeft = isMoving ? 1 : 0;
                break;
            case KeyCode.KEY_S:
                this.moveDown = isMoving ? 1 : 0;
                break;
            case KeyCode.KEY_D:
                this.moveRight = isMoving ? 1 : 0;
                break;
        }
    }

    private touchMove(event): void {
        let touchPos = event.getLocationInView();
        let localPos = this.canvasUITransform.convertToNodeSpaceAR(new Vec3(touchPos.x, touchPos.y, 0));
        this.node.setPosition(new Vec3(localPos.x, localPos.y, 0));
    }
    
    private touchCancel(event): void {
        let canceltouchPos = this.node.position;
        this.node.setPosition(new Vec3(canceltouchPos.x, canceltouchPos.y, 0));
    }
    
    protected onLoad(): void {
        this.canvasUITransform = this.node.parent.getComponent(UITransform);
        
        if (sys.platform === sys.Platform.DESKTOP_BROWSER || EDITOR) {
            input.on(Input.EventType.KEY_DOWN, (event) => this.moveJet(event, true), this);
            input.on(Input.EventType.KEY_UP, (event) => this.moveJet(event, false), this);
        } else if (sys.platform === sys.Platform.MOBILE_BROWSER || EDITOR) {
            input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
            input.on(Input.EventType.TOUCH_CANCEL, this.touchCancel, this);
            input.on(Input.EventType.TOUCH_END, this.touchCancel, this);
        }
    }

    protected start(): void {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    protected update(deltatime: number): void {
        if (this.node.position.x < -this.canvasUITransform.width / 2) {
            this.node.setPosition(-this.canvasUITransform.width / 2, this.node.position.y, this.node.position.z);
        }
        if (this.node.position.x > this.canvasUITransform.width / 2) {
            this.node.setPosition(this.canvasUITransform.width / 2, this.node.position.y, this.node.position.z);
        }
        if (this.node.position.y > this.canvasUITransform.height / 2) {
            this.node.setPosition(this.node.position.x, this.canvasUITransform.height / 2, this.node.position.z);
        }
        if (this.node.position.y < -this.canvasUITransform.height / 2) {
            this.node.setPosition(this.node.position.x, -this.canvasUITransform.height / 2, this.node.position.z);
        }

        if (this.moveLeft) {
            this.node.setPosition(this.node.position.x - this.xSpeed, this.node.position.y, this.node.position.z);
        }
        if (this.moveRight) {
            this.node.setPosition(this.node.position.x + this.xSpeed, this.node.position.y, this.node.position.z);
        }
        if (this.moveUp) {
            this.node.setPosition(this.node.position.x, this.node.position.y + this.xSpeed, this.node.position.z);
        }
        if (this.moveDown) {
            this.node.setPosition(this.node.position.x, this.node.position.y - this.xSpeed, this.node.position.z);
        }
    }

    protected onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D) {
        if (selfCollider.node.getComponent(Movement) && (otherCollider.node.getComponent(shipShoot) || otherCollider.node.getComponent(bulletMovement))) {
            setTimeout(() => {
                selfCollider.node.active = false;
            }, 1);
            director.loadScene(LevelNameStrings.GAME_OVER);
        }
    }
}