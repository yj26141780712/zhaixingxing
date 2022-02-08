
import { _decorator, Component, Node, Prefab, NodePool, instantiate, UITransform, EditBox, tween, Vec3, Layout } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = roll
 * DateTime = Tue Feb 08 2022 12:50:33 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = roll.ts
 * FileBasenameNoExtension = roll
 * URL = db://assets/demo/scrollNum/roll.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('roll')
export class roll extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Prefab)
    public numLayoutPrefab: Prefab = null;

    @property(Node)
    public editText: Node = null;

    @property(Node)
    public okBtn: Node = null;

    @property(Node)
    public allLayout: Node = null;

    @property()
    public rollTime = 2;

    pool: NodePool
    prefabArray: Node[] = [];
    eachHeight = 0;
    start() {
        // [3]
        this.pool = new NodePool();
        let numLayout = instantiate(this.numLayoutPrefab);
        this.eachHeight = numLayout.getComponent(UITransform).height / 11;
    }

    getNumStr() {
        let numStr = this.editText.getComponent(EditBox).string;
        return numStr;
    }

    ok() {
        //
        this.allLayout.removeAllChildren();
        for (let i = 0; i < this.prefabArray.length; i++) {
            this.prefabArray[i].setPosition(new Vec3(0, 0, 0));
            this.pool.put(this.prefabArray[i]);
        }
        this.prefabArray = [];
        let numStr = this.getNumStr();
        let num = Number(numStr);
        if (!isNaN(num)) {
            for (let i = 0; i < numStr.length; i++) {
                this.prefabArray.push(this.getNewPrefab());
            }
            const layout = this.allLayout.getComponent(Layout);
            layout.updateLayout();
            for (let i = 0; i < numStr.length; i++) {
                this.roll(numStr[i], this.prefabArray[i]);
            }
        } else {
            console.log('非数字')
        }
    }

    getNewPrefab() {
        let numLayout = null;
        if (this.pool.size() > 0) {
            numLayout = this.pool.get();
        } else {
            numLayout = instantiate(this.numLayoutPrefab);
        }
        this.allLayout.addChild(numLayout);
        return numLayout;
    }

    roll(num: string, prefab: Node) {
        console.log(num);
        let y = 0;
        const pos = prefab.getPosition();
        if (num === '.') {
            y = 200;
        } else {
            y = this.eachHeight * (Number(num) - 5)
        }
        tween(prefab).to(this.rollTime, {
            position: new Vec3(pos.x, y, 0)
        }, {
            easing: 'cubicOut'
        }).start();
        console.log(prefab.getPosition());
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
