
import { _decorator, Component, Node, debug, setDisplayStats, systemEvent, SystemEvent, EventTouch, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = joyStick
 * DateTime = Tue Jan 25 2022 13:51:24 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = joyStick.ts
 * FileBasenameNoExtension = joyStick
 * URL = db://assets/demo/JoyStick/joyStick.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('joyStick')
export class joyStick extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Node)
    public joyStickBtn: Node;

    @property(Node)
    public player: Node;

    @property()
    public maxSpeed = 0;

    maxLength = 0;
    height = 0;
    width = 0;

    dir = new Vec3(0, 0, 0);

    start() {
        // [3]
        setDisplayStats(false);
        this.joyStickBtn.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        this.joyStickBtn.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.joyStickBtn.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        this.joyStickBtn.on(SystemEvent.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        const ui = this.node.getComponent(UITransform);
        this.maxLength = ui.width / 2;
        const parent = this.node.parent.getComponent(UITransform);
        this.height = parent.height;
        this.width = parent.width;
    }

    onTouchStart(event: EventTouch) {
        const local = event.getUILocation();
        const ui = this.node.getComponent(UITransform);
        const position = ui.convertToNodeSpaceAR(new Vec3(local.x, local.y, 0));
        this.joyStickBtn.setPosition(position);
    }

    onTouchMove(event: EventTouch) {
        const delta = event.getUIDelta();
        const position = this.joyStickBtn.getPosition();
        position.add(new Vec3(delta.x, delta.y, 0));
        this.joyStickBtn.setPosition(position);
        this.dir = position.normalize();
    }

    onTouchEnd(event: EventTouch) {
        this.joyStickBtn.setPosition(new Vec3(0, 0, 0));
    }

    onTouchCancel(event: EventTouch) {
        this.joyStickBtn.setPosition(new Vec3(0, 0, 0));
    }

    update(deltaTime: number) {
        // [4]
        const position = this.joyStickBtn.getPosition();
        const length = position.length();
        const ratio = length / this.maxLength;
        if (ratio > 1) {
            this.joyStickBtn.setPosition(position.multiplyScalar(1 / ratio));
            ;
        }
        // 虚拟摇杆移动的矩阵
        const dir = new Vec3().add(this.dir);
        let dis = dir.multiplyScalar(this.maxSpeed * Math.min(1, ratio));
        const playerP = this.player.position.add(dis);
        if (playerP.x > this.width / 2) {
            playerP.x = this.width / 2;
        } else if (playerP.x < - this.width / 2) {
            playerP.x = -this.width / 2
        }
        if (playerP.y > this.height / 2) {
            playerP.y = this.height / 2;
        } else if (playerP.y < -this.height / 2) {
            playerP.y = -this.height / 2;
        }
        this.player.setPosition(playerP);
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
