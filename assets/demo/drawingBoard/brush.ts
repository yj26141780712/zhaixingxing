
import { _decorator, Component, Node, Graphics, Color } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = brush
 * DateTime = Thu Feb 10 2022 13:10:24 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = brush.ts
 * FileBasenameNoExtension = brush
 * URL = db://assets/demo/drawingBoard/brush.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('brush')
export class brush extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    ctx: Graphics;
    start() {
        // [3]
        this.ctx = this.node.getComponent(Graphics);
    }

    setStartPos(x: number, y: number) {
        console.log(x, y);
        this.ctx.moveTo(x, y);
    }

    setWidth(lineWidth: number) {
        this.ctx.lineWidth = lineWidth;
    }

    setColor(color: Color) {
        this.ctx.color = color;
    }

    moveTo(x: number, y: number) {
        console.log(x, y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.moveTo(x, y);
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
