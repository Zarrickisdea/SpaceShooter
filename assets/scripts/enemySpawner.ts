import { _decorator, Component, Node, instantiate, Prefab, random } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemySpawner')
export class enemySpawner extends Component {
    
        @property
        private spawnInterval: number = 0;
    
        @property({type: Prefab})
        private enemyPrefabs: Prefab[] = [];

        private skipRow: boolean = false;

        private skipRowChance: number = 0.9;
    
        private spawnEnemies() {
        this.skipRow = random() < this.skipRowChance;
            if (!this.skipRow) {
                console.log("Spawn Enemies");
            for (let i = 0; i < this.enemyPrefabs.length; ++i) {
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
            this.spawnEnemies();
        }
    
        protected start() {
    
        }
    
        protected update(dt) {
            
        }
}


