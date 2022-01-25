
import { _decorator, Component, EventTouch, Label } from 'cc';
import { comboBox } from './comboBox';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = item
 * DateTime = Tue Jan 25 2022 12:24:06 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = item.ts
 * FileBasenameNoExtension = item
 * URL = db://assets/component/comboBox/item.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('item')
export class item extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    public comboBox: comboBox;

    start() {
        // [3]
    }

    onClick(event: EventTouch) {
        console.log(event.target.children[0]);
        this.comboBox.comboLabel.string = event.target.children[0]
            .getComponent(Label).string;
        this.comboBox.onClick();
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
