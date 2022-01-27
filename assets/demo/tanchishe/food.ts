
import { _decorator, Component, Node, color, Vec3, UITransform, Sprite } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = food
 * DateTime = Thu Jan 27 2022 15:33:24 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = food.ts
 * FileBasenameNoExtension = food
 * URL = db://assets/demo/tanchishe/food.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('food')
export class food extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        // [3]
        const sprite = this.node.getComponent(Sprite);
        sprite.color = sprite.color;
        const pos = this.randomPos();
        this.node.setPosition(pos);
    }

    randomColor() {
        // get random color
        let red = Math.round(Math.random() * 255);
        let green = Math.round(Math.random() * 255);
        let blue = Math.round(Math.random() * 255);
        return color(red, green, blue);
    }

    randomPos() {
        const uiTransform = this.node.parent.getComponent(UITransform);
        const height = uiTransform.height;
        const width = uiTransform.width;
        const x = Math.round(width * Math.random()) - width / 2;
        const y = Math.round(height * Math.random()) - height / 2;
        return new Vec3(x, y, 0);
    }
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
