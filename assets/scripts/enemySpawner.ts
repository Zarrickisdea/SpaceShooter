import { _decorator, Component, Node, instantiate, Prefab, random, Layout, tween, Vec3 } from 'cc';
import { shipShoot } from './shipShoot';
const { ccclass, property } = _decorator;

@ccclass('enemySpawner')
export class enemySpawner extends Component {
        @property({range: [0, 5]})
        private spawnInterval: number = 0;

        @property({range: [1, 5]})
        private moveDuration: number = 1;

        @property({range:[1, 11]})
        private shipsPerRow: number = 0;
    
        @property({type: Prefab})
        private enemyPrefabs: Prefab[] = [];

        @property({range: [0, 100]})
        private skipRowChance: number = 0;

        @property({range: [0, 100]})
        private skipPatternChance: number = 0;

        @property({type: Layout})
        private rowLayout: Layout = null;

        private skipRow: boolean = false;
        private skipPattern: boolean = false;

        private currentShipsPerRow: number = 0;
        private difficulty: number = 0;
    
        private spawnEnemies() {
            let shipNumber = this.shipsPerRow;
            this.skipRow = random() < (this.skipRowChance / 100);

            if (this.skipRow) {
                return;
            }

            this.skipPattern = random() < (this.skipPatternChance / 100);

            if (this.skipPattern) {
                shipNumber = shipNumber / 2;
                this.rowLayout.spacingX = this.rowLayout.spacingX * 10;
            }

            for (let i = 0; i < shipNumber; ++i) {
                this.scheduleOnce(() => {
                    this.spawnEnemy();
                    this.currentShipsPerRow++;
                }, this.spawnInterval * i);
            }
        }

        private spawnEnemy() {
            let index = Math.floor(random() * this.enemyPrefabs.length);
            let enemy = instantiate(this.enemyPrefabs[index]);
            enemy.setParent(this.node);
            enemy.getComponent(shipShoot).setHitPoints(this.difficulty);
        }

        private moveShips(shiftNumber: number, direction: number) {
            const originalPos = this.rowLayout.node.position;

            const targetX = originalPos.x + (shiftNumber * direction);

            tween(this.rowLayout.node)
                .to(this.moveDuration, { position: new Vec3(targetX, originalPos.y, 0) })
                .call(() => {

                    if (direction === -1) {
                        direction = 1;
                    }
                    else {
                        direction = -1;
                    }

                    this.resetShipsXPosition(originalPos);
    
                    this.scheduleOnce(() => {
                        this.moveShips(100, direction);
                    }, this.moveDuration);
                })
                .start();
        }
    
        private resetShipsXPosition(originalPos: Vec3) {

            tween(this.rowLayout.node)
                .to(this.moveDuration, { position: new Vec3(0, originalPos.y, 0) })
                .start();
        }

        public getNumberOfShips() {
            let activeShips = 0;
            for (let i = 0; i < this.node.children.length; ++i) {
                if (this.node.children[i].active) {
                    activeShips++;
                }
            }
            return activeShips;
        }

        public shipDestroyed() {
            this.currentShipsPerRow--;
        }

        public setDifficulty(difficulty: number) {
            this.difficulty = difficulty;
        }
    
        protected onLoad() {
            if (!this.rowLayout) {
                console.warn("enemySpawner should be attached to a Layout node");
                this.enabled = false;
                return;
            }
        }
    
        protected start() {
            this.spawnEnemies();

            this.scheduleOnce(() => {
                this.moveShips(100, -1);
            }, this.moveDuration);
        }
}


