
import { _decorator, Component, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact, Sprite, color, Node, AudioSource, AudioClip, Vec2 } from 'cc';
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
    @property(AudioSource)
    public audioSource: AudioSource = null;

    @property(AudioClip)
    public clips: AudioClip[] = [];

    start() {
        // [3]
        // 球方向随机
        this.node.getComponent(RigidBody2D).linearVelocity
            = new Vec2(Math.random() * -30, 30)
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.POST_SOLVE, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
        console.log(otherCollider.node.name);
        const node = otherCollider.node;
        if (node.name === 'brick') {
            // 播放消除砖块声音
            this.audioSource.playOneShot(this.clips[1]);
            this.scheduleOnce(() => { //碰撞节点销毁必须在下一帧以后才能执行
                const sprite = node.getComponent(Sprite);
                sprite.color = color(255, 255, 255, 0);
                const rigidBody2D = node.getComponent(RigidBody2D);
                if (rigidBody2D) {
                    rigidBody2D.destroy();
                }
            }, 0)
        } else {
            // 播放碰墙声音
            this.audioSource.playOneShot(this.clips[0]);
        }
    }

    update(deltaTime: number) {
        // console.log(this.node.getComponent(RigidBody2D).linearVelocity);
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
