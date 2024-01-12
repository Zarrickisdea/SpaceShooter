import { _decorator, Component, Node, instantiate, Prefab, random, Layout, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemySpawner')
export class enemySpawner extends Component {
    
        @property
        private spawnInterval: number = 0;

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
        private moveDuration: number = 5;
        private timer: number = 0;
    
        private spawnEnemies() {
            let shipNumber = this.shipsPerRow;
            this.skipRow = random() < (this.skipRowChance / 100);

            if (this.skipRow) {
                console.log("skipRow: " + this.skipRow);
                return;
            }

            this.skipPattern = random() < (this.skipPatternChance / 100);

            if (this.skipPattern) {
                console.log("skipPattern: " + this.skipPattern);
                shipNumber = shipNumber / 2;
                this.rowLayout.spacingX = this.rowLayout.spacingX * 6;
            }

            for (let i = 0; i < shipNumber; ++i) {
                this.scheduleOnce(() => {
                    this.spawnEnemy();
                }, this.spawnInterval * i);
            }
        }

        private spawnEnemy() {
            let index = Math.floor(random() * this.enemyPrefabs.length);
            let enemy = instantiate(this.enemyPrefabs[index]);
            enemy.setParent(this.node);
        }

        private moveShips() {
            const originalPos = this.rowLayout.node.position;
    

            tween(this.rowLayout.node)
                .to(this.moveDuration, { position: new Vec3(originalPos.x - 100, originalPos.y, 0) })
                .call(() => {

                    this.resetShipsPosition(originalPos);
    

                    this.scheduleOnce(() => {
                        this.moveShips();
                    }, this.moveDuration);
                })
                .start();
        }
    
        private resetShipsPosition(originalPos: Vec3) {

            tween(this.rowLayout.node)
                .to(this.moveDuration, { position: originalPos })
                .start();
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
                this.moveShips();
            }, this.moveDuration);
        }
    
        protected update(deltaTime: number) {
        }
}


