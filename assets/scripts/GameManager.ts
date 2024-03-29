import { _decorator, Component, director, Node } from 'cc';
import { playerShoot } from './playerShoot';
import { enemySpawner } from './enemySpawner';
import { LevelNameStrings } from './LevelNameStrings';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({type: enemySpawner})
    private enemyRows: enemySpawner[] = [];

    @property({type: playerShoot})
    private playerShoot: playerShoot = null;

    @property
    private levelOneDifficulty: number = 0;

    @property
    private levelTwoDifficulty: number = 0;

    @property
    private levelThreeDifficulty: number = 0;

    private checkForWin() {
        for (let i = 0; i < this.enemyRows.length; ++i) {
            if (this.enemyRows[i].getNumberOfShips() > 0) {
                return;
            }
        }

        this.loadNextLevel();
    }

    private loadNextLevel() {
        let currentLevel = director.getScene().name;
        switch (currentLevel) {
            case LevelNameStrings.LEVEL_1:
                director.loadScene(LevelNameStrings.LEVEL_2);
                break;
            case LevelNameStrings.LEVEL_2:
                director.loadScene(LevelNameStrings.LEVEL_3);
                break;
            case LevelNameStrings.LEVEL_3:
                director.loadScene(LevelNameStrings.GAME_OVER);
                break;
        }
    }

    private setLevelDifficulty() {
        let currentLevel = director.getScene().name;
        switch (currentLevel) {
            case LevelNameStrings.LEVEL_1:
                for (let i = 0; i < this.enemyRows.length; ++i) {
                    this.enemyRows[i].setDifficulty(this.levelOneDifficulty);
                }
                break;
            case LevelNameStrings.LEVEL_2:
                for (let i = 0; i < this.enemyRows.length; ++i) {
                    this.enemyRows[i].setDifficulty(this.levelTwoDifficulty);
                }
                break;
            case LevelNameStrings.LEVEL_3:
                for (let i = 0; i < this.enemyRows.length; ++i) {
                    this.enemyRows[i].setDifficulty(this.levelThreeDifficulty);
                }
                break;
        }
    }

    protected onLoad() {
        this.setLevelDifficulty();

        this.schedule(this.checkForWin, 1);
    }

    protected start() {
        
    }
}


