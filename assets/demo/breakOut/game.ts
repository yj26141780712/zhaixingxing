
import { _decorator, Component, Node, instantiate, Prefab, Layout, math, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = game
 * DateTime = Wed Feb 09 2022 13:33:17 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = game.ts
 * FileBasenameNoExtension = game
 * URL = db://assets/demo/breakOut/game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('game')
export class game extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Prefab)
    public brickPrefab: Prefab = null;

    @property()
    public col = 9;
    @property()
    public row = 9;

    @property(Node)
    public bricksLayout: Node = null;



    start() {
        // [3]
        const layout = this.bricksLayout.getComponent(Layout);
        layout.cellSize = math.size(100, 50);
        this.initLayout();
    }

    initLayout() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                const node = instantiate(this.brickPrefab);

                this.bricksLayout.addChild(node);
            }
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
