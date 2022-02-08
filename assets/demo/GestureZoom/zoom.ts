
import { _decorator, Component, Node, SystemEvent, EventTouch, UITransform, Vec3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = zoom
 * DateTime = Tue Feb 08 2022 15:32:01 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = zoom.ts
 * FileBasenameNoExtension = zoom
 * URL = db://assets/demo/GestureZoom/zoom.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('zoom')
export class zoom extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    public maskNode: Node = null;

    @property(Node)
    public imgNode: Node = null;

    startLength = 0;

    start() {
        // [3]
        this.node.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchStart(event: EventTouch) {
        const touches = event.getTouches();
        console.log(touches.length);
        if (touches.length === 1) { // 一根手指

        } else if (touches.length === 2) { // 两根手指
            const ui = this.node.getComponent(UITransform);
            const startLocation1 = touches[0].getLocation();

            const startPosition1 = ui.convertToNodeSpaceAR(new Vec3(startLocation1.x, startLocation1.y, 0));
            console.log('手指1', startPosition1)
            const startLocation2 = touches[1].getLocation();
            const startPosition2 = ui.convertToNodeSpaceAR(new Vec3(startLocation2.x, startLocation2.y, 0));
            console.log('手指2', startPosition2)
            this.startLength = startPosition2.subtract(startPosition1).length();
            console.log(this.startLength);
        }
    }

    onTouchMove(event: EventTouch) {
        const touches = event.getTouches();
        console.log(touches.length);
        if (touches.length === 1) {
            let delta = event.getDelta();
            this.imgNode.setPosition(this.imgNode.getPosition().add(new Vec3(delta.x, delta.y, 0)));
        } else if (touches.length === 2) {
            const ui = this.node.getComponent(UITransform);
            const startLocation1 = touches[0].getLocation();
            const startPosition1 = ui.convertToNodeSpaceAR(new Vec3(startLocation1.x, startLocation1.y, 0));
            const startLocation2 = touches[1].getLocation();
            const startPosition2 = ui.convertToNodeSpaceAR(new Vec3(startLocation2.x, startLocation2.y, 0));
            length = startPosition2.subtract(startPosition1).length();
            if (!this.startLength) {
                this.startLength = 0;
            }
            console.log(length, this.startLength);
            if (length > this.startLength) {
                console.log('放大了', length, this.startLength);
                this.startLength = length;
                const scale = this.imgNode.getScale();
                this.imgNode.setScale(scale.add(new Vec3(1, 1, 0).multiplyScalar(0.05)))
            } else if (length < this.startLength) {
                console.log('缩小了', this.startLength, length);
                if (this.imgNode.getScale().x <= 1) {
                    this.imgNode.setScale(new Vec3(1, 1, 0));
                    return;
                }
                this.startLength = length;
                const scale = this.imgNode.getScale();
                this.imgNode.setScale(scale.subtract(new Vec3(1, 1, 0).multiplyScalar(0.05)))
            }
        }
    }

    onDestroy() {
        this.node.off(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
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
