
import { _decorator, Component, Node, SystemEvent, EventTouch, UITransform, Vec3, Sprite, color, tween, Color } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = revolvePageView
 * DateTime = Wed Feb 09 2022 08:55:55 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = revolvePageView.ts
 * FileBasenameNoExtension = revolvePageView
 * URL = db://assets/demo/revolvePageView/revolvePageView.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
interface Card {
    zIndex: number;
    scale: number;
    opacity: number;
    pos: Vec3
}

@ccclass('revolvePageView')
export class revolvePageView extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    cardAttrArray: Card[] = [];
    revolveTime = 0.8;
    nodes: Node[] = [];
    start() {
        this.nodes = [].concat(this.node.children);
        this.cardAttrArray = [{
            zIndex: 5,
            scale: 1,
            opacity: 255,
            pos: this.node.children[0].getPosition()
        }, {
            zIndex: 4,
            scale: 0.8,
            opacity: 180,
            pos: this.node.children[1].getPosition()
        }, {
            zIndex: 3,
            scale: 0.5,
            opacity: 100,
            pos: this.node.children[2].getPosition()
        }, {
            zIndex: 0,
            scale: 0.2,
            opacity: 30,
            pos: this.node.children[3].getPosition()
        }, {
            zIndex: 1,
            scale: 0.5,
            opacity: 100,
            pos: this.node.children[4].getPosition()
        }, {
            zIndex: 2,
            scale: 0.8,
            opacity: 180,
            pos: this.node.children[5].getPosition()
        }];
        this.nodes.forEach((node: Node, index: number) => {
            const card = this.cardAttrArray[index];
            node.setPosition(card.pos);
            node.setScale(new Vec3(1, 1, 0).multiplyScalar(card.scale));
            node.getComponent(Sprite).color = color(255, 255, 255, card.opacity);
            node.attr({ num: index });
            node.setSiblingIndex(card.zIndex);
        });
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        console.log(123);
        for (let i = 0; i < this.nodes.length - 1; i++) {
            if (this.nodes[i]['isTween']) {
                return;
            }
        }
        const delta = event.getDelta();
        if (delta.x > this.node.parent.getComponent(UITransform).width / 40) {
            this.revolveToRight();
        } else if (delta.x < -this.node.parent.getComponent(UITransform).width / 40) {
            this.revolveToLeft();
        }
    }

    revolveToLeft() {
        this.nodes.forEach((node: Node) => {
            const num = node['num'];
            if (num > 0) {
                node.attr({ num: num - 1 });
            } else {
                node.attr({ num: this.cardAttrArray.length - 1 });
            }
            this.revolve(node);
        })
    }

    revolveToRight() {
        this.nodes.forEach((node: Node) => {
            const num = node['num'];
            if (num < this.cardAttrArray.length - 1) {
                node.attr({ num: num + 1 });
            } else {
                node.attr({ num: 0 });
            }
            this.revolve(node);
        })
    }

    revolve(node: Node) {
        const newCardAttr = this.cardAttrArray[node['num']];
        node['isTween'] = true;
        node.setSiblingIndex(newCardAttr.zIndex);
        const sprite = node.getComponent(Sprite);
        const opacity = sprite.color.a;
        tween(node).to(this.revolveTime, {
            position: newCardAttr.pos,
            scale: new Vec3(1, 1, 1).multiplyScalar(newCardAttr.scale),

        }, {
            onUpdate: (target, ratio: number) => {
                sprite.color = color(255, 255, 255, (newCardAttr.opacity - opacity) * ratio + opacity);
            },
            onComplete: () => {
                sprite.color = color(255, 255, 255, newCardAttr.opacity);
                node['isTween'] = false;
            }
        }).start();
    }

    onDestroy() {
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
