
import { _decorator, Component, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact, PolygonCollider2D, Sprite, color } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ball
 * DateTime = Wed Feb 09 2022 13:45:46 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = ball.ts
 * FileBasenameNoExtension = ball
 * URL = db://assets/demo/breakOut/ball.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('ball')
export class ball extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    removeList = [];

    start() {
        // [3]
        // 球方向随机
        // console.log(123);
        // this.node.getComponent(RigidBody2D).linearVelocity
        //     = new Vec2(Math.random() * -12, 10)
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
        console.log(otherCollider.node.name);
        const node = otherCollider.node;
        if (node.name === 'brick') {
            this.node.active = false;
            const sprite = node.getComponent(Sprite);
            sprite.color = color(255, 255, 255, 0);
            const rigidBody2D = node.getComponent(RigidBody2D);
            rigidBody2D.destroy();
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
