
import { _decorator, Component, Node, EventTouch, Vec3, tween, SystemEvent, UITransform, Vec2, Tween } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = guide
 * DateTime = Tue Feb 08 2022 10:52:31 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = guide.ts
 * FileBasenameNoExtension = guide
 * URL = db://assets/demo/guide/guide.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('guide')
export class guide extends Component {

    @property(Node)
    public frame: Node = null;

    @property(Node)
    public title: Node = null;

    @property(Node)
    public hand: Node = null;

    guideStep = 1;
    handTween: Tween<Node> = null;

    start() {
        // [3]
        this.node.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        this.guide();
    }

    onDestroy() {
        this.node.off(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
        if (this.guideStep === 0) {
            return;
        }
        const location = event.getLocation();
        const canvas = this.node.parent.getComponent(UITransform);
        const pos = canvas.convertToNodeSpaceAR(new Vec3(location.x, location.y, 0));
        let btn: Node = null;
        if (this.guideStep === 1) {
            btn = this.node.parent.getChildByName('Button1');
        } else if (this.guideStep === 2) {
            btn = this.node.parent.getChildByName('Button2');
        } else if (this.guideStep === 3) {
            btn = this.node.parent.getChildByName('Button3');
        }
        const btnUI = btn.getComponent(UITransform);
        const box = btnUI.getBoundingBox();
        if (box.contains(new Vec2(pos.x, pos.y))) { //手指点的区域在这个按钮上
            this.guideStep++;
            if (this.guideStep > 3) {
                this.guideStep = 0;
                this.title.active = false;
                this.hand.active = false;
                this.frame.active = false;
            } else {
                this.guide();
            }
        }
    }

    guide() {
        if (this.guideStep === 1) {
            const btn1 = this.node.parent.getChildByName('Button1');
            this.frame.setPosition(btn1.getPosition());
            this.setHand(btn1.getPosition());
        } else if (this.guideStep === 2) {
            const btn2 = this.node.parent.getChildByName('Button2');
            this.frame.setPosition(btn2.getPosition());
            this.setHand(btn2.getPosition())
        } else if (this.guideStep === 3) {
            const btn3 = this.node.parent.getChildByName('Button3');
            this.frame.setPosition(btn3.getPosition());
            this.setHand(btn3.getPosition());
        }
    }

    setHand(pos: Vec3) {
        if (this.handTween) {
            this.handTween.stop();
        } else {
            this.handTween = tween(this.hand).by(0.8, {
                position: new Vec3(0, 50, 0)
            }).by(0.8, {
                position: new Vec3(0, -50, 0)
            }).union().repeatForever();
        }
        pos.add(new Vec3(0, -80, 0));
        this.hand.setPosition(pos);
        this.handTween.start();
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
