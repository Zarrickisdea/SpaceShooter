import { _decorator, Component, Node, instantiate, Prefab, random, Layout } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemySpawner')
export class enemySpawner extends Component {
    
        @property
        private spawnInterval: number = 0;
    
        @property({type: Prefab})
        private enemyPrefabs: Prefab[] = [];

        @property({range: [0, 100]})
        private skipRowChance: number = 0;

        @property({range: [0, 100]})
        private skipPatternChance: number = 0;

        private skipRow: boolean = false;
        private skipPattern: boolean = false;

        @property({type: Layout})
        private rowLayout: Layout = null;
    
        private spawnEnemies() {
            let shipNumber = this.enemyPrefabs.length;
            this.skipRow = random() < (this.skipRowChance / 100);
            this.skipPattern = random() < (this.skipPatternChance / 100);

            console.log("skipPattern: " + this.skipPattern);

            if (this.skipPattern) {
                shipNumber = shipNumber / 2;
                this.rowLayout.spacingX = this.rowLayout.spacingX * 6;
            }

            if (!this.skipRow) {
                for (let i = 0; i < shipNumber; ++i) {
                    this.scheduleOnce(() => {
                        this.spawnEnemy(i);
                    }, this.spawnInterval * i);
                }
            }
        }

        private spawnEnemy(index: number) {
            let enemy = instantiate(this.enemyPrefabs[index]);
            enemy.setParent(this.node);
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
        }
    
        protected update(dt) {
            
        }
}


