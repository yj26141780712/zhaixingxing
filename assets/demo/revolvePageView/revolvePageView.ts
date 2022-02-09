
import { _decorator, Component, Node, SystemEvent, EventTouch, UITransform, Vec3, Sprite, color, tween } from 'cc';
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
    revolveTime = 2;
    nodes: Node[] = [];
    start() {
        this.nodes = [].concat(this.node.children);
        this.cardAttrArray = [{
            zIndex: 3,
            scale: 1,
            opacity: 255,
            pos: this.node.children[0].getPosition()
        }, {
            zIndex: 2,
            scale: 0.8,
            opacity: 180,
            pos: this.node.children[1].getPosition()
        }, {
            zIndex: 1,
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
        for (let i = 0; i < this.nodes.length - 1; i++) {

        }
        const delta = event.getDelta();
        if (delta.x > this.node.parent.getComponent(UITransform).width / 40) {
            this.revolveToRight();
        } else if (delta.x < -this.node.parent.getComponent(UITransform).width / 40) {
            this.revolveToLeft();
        }
    }

    revolveToLeft() {
        // this.node.children.forEach((node: Node, index: number) => {
        //     const num = node['num'];
        //     if (num < this.cardAttrArray.length - 1) {
        //         node.attr({ num: num + 1 });
        //     } else {
        //         node.attr({ num: 0 });
        //     }
        //     const newCardAttr = this.cardAttrArray[node['num']];
        //     tween(node).to(this.revolveTime, {
        //         position: newCardAttr.pos,
        //         scale: new Vec3(1, 1, 1).multiplyScalar(newCardAttr.scale)
        //     })
        // })
    }

    revolveToRight() {
        this.nodes.forEach((node: Node, index: number) => {
            const num = node['num'];
            if (num < this.cardAttrArray.length - 1) {
                node.attr({ num: num + 1 });
            } else {
                node.attr({ num: 0 });
            }
            const newCardAttr = this.cardAttrArray[node['num']];
            node['isTween'] = true;
            tween(node).to(this.revolveTime, {
                position: newCardAttr.pos,
                scale: new Vec3(1, 1, 1).multiplyScalar(newCardAttr.scale),
            }, {
                onComplete: () => {
                    node['isTween'] = false;
                }
            }).start();
        })
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
