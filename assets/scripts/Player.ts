
import { _decorator, Component, Vec3, tween, Tween, Node, UITransform, systemEvent, SystemEvent, macro, EventKeyboard, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Play
 * DateTime = Mon Jan 24 2022 12:29:56 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = Play.ts
 * FileBasenameNoExtension = Play
 * URL = db://assets/Scripts/Play.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('Play')
export class Play extends Component {
    // [1]
    // dummy = '';
    //主角跳跃高度
    @property()
    jumpHeight = 0;
    //主角跳跃时间
    @property()
    jumpDuration = 0;
    // 辅助形变动作时间
    @property()
    squashDuration = 0;
    //最大移动速度
    @property()
    maxMoveSpeed = 0;
    //加速度
    @property()
    accel = 0;
    //加速度方向开关
    accLeft = false;
    accRight = false;
    //主角水平方向速度
    xSpeed: number = 0;
    action: Tween<Node>;
    // 屏幕边界
    minPosX = 0;
    maxPosX = 0;
    start() {
        this.enabled = false;
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;
        const ui = this.node.parent.getComponent(UITransform);
        this.minPosX = -ui.width / 2;
        this.maxPosX = ui.width / 2;
        this.setAction();
        //初始化键盘监听
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        const canvasNode = this.node.parent;
        canvasNode.on('touchstart', this.onTouchStart, this);
        canvasNode.on('touchend', this.onTouchEnd, this);
    }

    onDestroy() {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        const canvasNode = this.node.parent;
        canvasNode.off('touchstart', this.onTouchStart, this);
        canvasNode.off('touchend', this.onTouchEnd, this);
    }

    startMoveAt(position: Vec3) {
        this.enabled = true;
        this.xSpeed = 0;
        this.node.setPosition(position);
        this.startAction();
    }

    setAction() {
        this.action = tween(this.node)
            .to(this.squashDuration, { scale: new Vec3(1, 0.6) })
            .to(this.squashDuration, { scale: new Vec3(1, 1.2) })
            .by(this.jumpDuration, { position: new Vec3(0, this.jumpHeight) }, { easing: 'cubicOut' })
            .to(this.squashDuration, { scale: new Vec3(1, 1) })
            .by(this.jumpDuration, { position: new Vec3(0, -this.jumpHeight) }, { easing: 'cubicIn' })
            .union()
            .repeatForever();
    }

    startAction() {
        this.action.start();
    }

    endAction() {
        this.action.stop();
    }

    onKeyDown(event: EventKeyboard) {
        console.log(event);
        switch (event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:
                this.accLeft = true;
                this.accRight = false;
                break;
            case macro.KEY.d:
            case macro.KEY.right:
                this.accLeft = false;
                this.accRight = true;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:
                this.accLeft = false;
                break;
            case macro.KEY.d:
            case macro.KEY.right:
                this.accRight = false;
                break;
        }
    }

    onTouchStart(event: EventTouch) {
        var touchLoc = event.getLocation();
        console.log(touchLoc)
        // if (touchLoc.x >= winSize.width / 2) {
        //     this.accLeft = false;
        //     this.accRight = true;
        // } else {
        //     this.accLeft = true;
        //     this.accRight = false;
        // }
    }

    onTouchEnd(event: EventTouch) {
        this.accLeft = false;
        this.accRight = false;
    }

    update(deltaTime: number) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * deltaTime;
        } else if (this.accRight) {
            this.xSpeed += this.accel * deltaTime;
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        const position = this.node.getPosition()
        // 根据当前速度更新主角的位置
        position.x += this.xSpeed * deltaTime;

        // limit player position inside screen
        if (position.x > this.maxPosX) {
            position.x = this.maxPosX;
            this.xSpeed = 0;
        } else if (position.x < this.minPosX) {
            position.x = this.minPosX;
            this.xSpeed = 0;
        }
        this.node.setPosition(position);
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
