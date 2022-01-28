
import { _decorator, Component, Node, Animation, animation, AnimationClip, UITransform } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = bgMove
 * DateTime = Tue Jan 25 2022 08:53:32 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = bgMove.ts
 * FileBasenameNoExtension = bgMove
 * URL = db://assets/scripts/bgMove.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('bgMove')
export class bgMove extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property()
    public speed = 0;

    @property(Animation)
    public snailAnimation: Animation | null = null;

    @property(Node)
    public bg1Node: Node | null = null;

    @property(Node)
    public bg2Node: Node | null = null;

    triggerX = 0;

    start() {
        // [3]
        this.snailAnimation.clips[0].speed = this.speed / 50;
        this.snailAnimation.clips[0].wrapMode = AnimationClip.WrapMode.Loop;
        this.snailAnimation.play()
        const state = this.snailAnimation.getState(this.snailAnimation.clips[0].name);
        state.speed = this.speed / 50;
        state.wrapMode = AnimationClip.WrapMode.Loop;
        const ui = this.bg1Node.getComponent(UITransform);
        this.triggerX = -ui.width;
    }

    update(deltaTime: number) {
        const position1 = this.bg1Node.getPosition();
        const position2 = this.bg2Node.getPosition();
        position1.x -= this.speed * deltaTime;
        position2.x -= this.speed * deltaTime;
        if (position1.x <= this.triggerX) {
            position1.x = position2.x - this.triggerX;
        } else if (position2.x <= this.triggerX) {
            position2.x = position1.x - this.triggerX;
        }
        this.bg1Node.setPosition(position1);
        this.bg2Node.setPosition(position2);
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
