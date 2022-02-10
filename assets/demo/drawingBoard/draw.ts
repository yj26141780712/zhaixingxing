
import { _decorator, Component, Node, Slider, Prefab, instantiate, Sprite, color, Layout, UITransform, UI, setDisplayStats, resources, SpriteFrame, systemEvent, SystemEvent, EventTouch, Vec3 } from 'cc';
import { colors, tools, ColorSetting, ToolSetting } from './settings';
import { color as colorI } from './color';
import { brush } from './brush';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = draw
 * DateTime = Thu Feb 10 2022 13:14:18 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = draw.ts
 * FileBasenameNoExtension = draw
 * URL = db://assets/demo/drawingBoard/draw.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('draw')
export class draw extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Prefab)
    public colorPrefab: Prefab = null;

    @property(Prefab)
    public toolPrefab: Prefab = null;

    @property(Node)
    public colorsLayout: Node = null;

    @property(Node)
    public toolsLayout: Node = null;

    @property(Node)
    public brushNode: Node = null;

    tool: string;
    brushIns: brush;
    start() {
        this.brushIns = this.brushNode.getComponent(brush);
        setDisplayStats(false);
        this.initColors();
        this.initTools();
        this.initTouchEvent();
    }

    initColors() {
        let colorHeight = 0;
        colors.forEach(setting => {
            const node = instantiate(this.colorPrefab);
            const sprire = node.getComponent(Sprite);
            colorHeight += node.getComponent(UITransform).height;
            sprire.color = color(setting.r, setting.g, setting.b, setting.active ? 255 : 100);
            this.colorsLayout.addChild(node);
        });
        const layout = this.colorsLayout.getComponent(Layout);
        const ui = this.colorsLayout.getComponent(UITransform);
        ui.height = layout.paddingBottom + layout.paddingTop +
            layout.spacingY * (colors.length - 1) + colorHeight;
    }

    initTools() {
        let toolHeight = 0;
        tools.forEach((setting) => {
            const node = instantiate(this.toolPrefab);
            toolHeight += node.getComponent(UITransform).height;
            const sprite = node.getComponent(Sprite);
            sprite.color = color(255, 255, 255, setting.active ? 255 : 100);
            resources.load(`texture/${setting.name}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                sprite.spriteFrame = spriteFrame;
            });
            this.toolsLayout.addChild(node);
        });
        const layout = this.toolsLayout.getComponent(Layout);
        const ui = this.toolsLayout.getComponent(UITransform);
        ui.height = layout.paddingBottom + layout.paddingTop +
            layout.spacingY * (tools.length - 1) + toolHeight;
    }

    initTouchEvent() {
        this.node.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onSildeEvent(event: Slider, customEventData: string) {
        this.brushIns.ctx.lineWidth = 1 + event.progress * 5;
    }

    onTouchStart(event: EventTouch) {
        const location = event.getUILocation();
        const positon = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(location.x, location.y, 0));
        this.brushIns.setStartPos(positon.x, positon.y);
    }

    onTouchMove(event: EventTouch) {
        const location = event.getUILocation();
        const positon = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(location.x, location.y, 0));
        this.brushIns.moveTo(positon.x, positon.y);
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
