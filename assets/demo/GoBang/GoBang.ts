import { _decorator, Component, setDisplayStats, UITransform, Vec3, Prefab, instantiate, Sprite, color } from 'cc';
import { DOT } from './DOT';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GoBang
 * DateTime = Fri Feb 11 2022 09:19:31 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = GoBang.ts
 * FileBasenameNoExtension = GoBang
 * URL = db://assets/demo/GoBang/GoBang.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('GoBang')
export class GoBang extends Component {

    @property(Prefab)
    public dotPrefab: Prefab = null;

    @property(Prefab)
    public piecePrefab: Prefab = null;

    vLines = 15;
    hLines = 15;
    boardWidth = 0;
    boardHeight = 0;
    posArray: Vec3[] = [];
    start() {
        setDisplayStats(false);
        const ui = this.node.getComponent(UITransform);
        this.boardWidth = Number((ui.width / (this.hLines - 1)).toFixed(2));
        this.boardHeight = Number((ui.height / (this.vLines - 1)).toFixed(2));
        this.getPos(this.hLines, this.vLines);
        this.initDots();
    }

    getPos(hLines: number, vLines: number) {
        for (let i = 0; i < hLines; i++) {
            for (let j = 0; j < vLines; j++) {
                this.posArray.push(new Vec3(i * this.boardWidth, j * this.boardHeight, 0));
            }
        }
    }

    initDots() {
        this.posArray.forEach(pos => {
            const node = instantiate(this.dotPrefab);
            node.getComponent(Sprite).color = color(255, 255, 255, 0);
            node.setPosition(pos);
            node.getComponent(DOT).initBoard(this);
            this.node.addChild(node);
        })
    }

    putPiece(pos: Vec3) {
        const node = instantiate(this.piecePrefab);
        node.setPosition(pos);
        this.node.addChild(node);
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
