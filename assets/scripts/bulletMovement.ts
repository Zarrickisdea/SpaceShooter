import { _decorator, Component, game, Node, tween, Vec3 } from 'cc';
import { shipShoot } from './shipShoot';
const { ccclass, property } = _decorator;

@ccclass('bulletMovement')
export class bulletMovement extends Component {
    
        private canvasHeight: number = 0;

        private fallingTween: any = null;

        public attachedShip: shipShoot = null;
        
        private startTween() {
            this.fallingTween = tween(this.node)
            .to(5, {position: new Vec3(this.node.position.x, -this.canvasHeight, 0)}, {easing: 'linear'})
            .start();
        }

        private cancelTween() {
            if (this.fallingTween){
                this.fallingTween.stop();
                this.fallingTween = null;
            }
        }

        protected onLoad() {
            this.canvasHeight = game.canvas.height;
        }

        protected onEnable(): void {
            this.cancelTween();

            this.startTween();
        }
    
        protected start() {
        }
    
        protected update(deltaTime: number) {
            if (this.node.position.y < -this.canvasHeight / 2) {
                this.node.active = false;
            }
        }

        protected onDisable(): void {
            this.cancelTween();
            this.attachedShip.currentlyShooting = false;
            this.attachedShip.bulletPool.push(this.node);
        }
}


