
import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = progress
 * DateTime = Wed Feb 09 2022 12:50:32 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = progress.ts
 * FileBasenameNoExtension = progress
 * URL = db://assets/demo/radiaProgressBar/progress.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('progress')
export class progress extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        // [3]
        this.schedule(this.changeProgressBar, 0.05);
    }

    changeProgressBar() {
        this.node.getComponent(Sprite).fillRange = this.node.getComponent(Sprite).fillRange - 0.01;
        if (this.node.getComponent(Sprite).fillRange <= 0) {
            this.unschedule(this.changeProgressBar);
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
