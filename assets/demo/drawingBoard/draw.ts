
import { _decorator, Component, Node, Slider, Prefab } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = draw
 * DateTime = Thu Feb 10 2022 13:14:18 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = draw.ts
 * FileBasenameNoExtension = draw
 * URL = db://assets/demo/drawingBoard/draw.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('draw')
export class draw extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Prefab)
    public colorPrefab: Prefab = null;

    @property(Prefab)
    public toolPrefab: Prefab = null;

    tool: string;

    start() {

    }

    initColors() {

    }

    initTools() {

    }

    onSildeEvent(event: Slider, customEventData: string) {
        // 1+ *5
        console.log(event.progress);
        console.log(customEventData);
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
