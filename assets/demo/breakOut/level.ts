
import { _decorator, Component, Node, Sprite, SpriteFrame, Label, SystemEvent, sys, director } from 'cc';
import { Level, LevelSetting } from './settings';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = level
 * DateTime = Thu Feb 10 2022 12:08:07 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = level.ts
 * FileBasenameNoExtension = level
 * URL = db://assets/demo/breakOut/level.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('level')
export class level extends Component {

    @property(Node)
    public numNode: Node = null;

    @property(Node)
    public starNode: Node = null;

    @property(SpriteFrame)
    public spriteList: SpriteFrame[] = []; // 0  1 star  2 3 

    setting: LevelSetting;
    // levelSetting: LevelSetting;

    start() {
        // [3]
        this.node.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
    }

    changeState(state: string, num: number) {
        this.numNode.getComponent(Label).string = num.toString();
        if (state === 'LOCKED') {
            this.numNode.active = false;
            this.starNode.getComponent(Sprite).spriteFrame = this.spriteList[0];
            this.node.getComponent(Sprite).spriteFrame = this.spriteList[2]
        } else if (state === 'UNLOCKED') {
            this.starNode.getComponent(Sprite).spriteFrame = this.spriteList[0];
            this.node.getComponent(Sprite).spriteFrame = this.spriteList[3]
        } else if (state === 'PASSED') {
            this.starNode.getComponent(Sprite).spriteFrame = this.spriteList[1];
            this.node.getComponent(Sprite).spriteFrame = this.spriteList[3]
        }
    }

    onTouchStart() {
        if (this.setting.state === 'LOCKED') {
            console.log('关卡未解锁！');
            return;
        }
        // console.log(this.levelSetting);
        sys.localStorage.setItem('currentLevelInfo', JSON.stringify(this.setting));
        director.loadScene('打砖块');
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
