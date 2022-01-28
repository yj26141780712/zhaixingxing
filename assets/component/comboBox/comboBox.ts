
import { _decorator, Component, Node, Label, Prefab, instantiate, UITransform, tween, Quat, Vec3 } from 'cc';
import { item } from './item';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = comboBox
 * DateTime = Tue Jan 25 2022 10:48:21 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = comboBox.ts
 * FileBasenameNoExtension = comboBox
 * URL = db://assets/scripts/comboBox.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('comboBox')
export class comboBox extends Component {

    @property(Node)
    public triangle: Node | null = null;

    @property(Label)
    public comboLabel: Label | null = null;

    @property(Node)
    public dropdown: Node | null = null;

    @property(Node)
    public vLayout: Node | null = null;

    @property(Node)
    public content: Node | null = null;

    @property(Prefab)
    public itemPrefab: Prefab | null = null;


    isDropdown = false;
    itemArray = ['Cocos Creator', 'Cocos-2dx', 'Cocos2d-js', 'Cocos2d-Lua', 'Cocos Creator 3D', 'Cocos Service', 'Cocos社区'];

    start() {
        this.dropdown.active = false;
        this.initItems();
        // [3]
    }

    initItems() {
        let totalHeight = 0;
        this.itemArray.forEach((x) => {
            let item = instantiate(this.itemPrefab);
            item.children[0].getComponent(Label).string = x;
            this.vLayout.addChild(item);
            const component = <item>item.getComponent('item');
            component.comboBox = this;
            const ui = item.getComponent(UITransform);
            totalHeight += ui.height;
        });
        const uiContent = this.content.getComponent(UITransform);
        if (totalHeight > uiContent.height) {
            uiContent.height = totalHeight;
        }
    }

    onClick() {
        this.isDropdown = !this.isDropdown;
        this.showHideDropDownBox();
        this.rotateTriangle();
    }

    rotateTriangle() {
        if (this.isDropdown) {
            const quat = new Quat();
            Quat.fromEuler(quat, 0, 0, 180);
            tween(this.triangle).to(0.5, {
                rotation: quat
            }, { easing: "cubicOut" }).start()
        } else {
            const quat = new Quat();
            Quat.fromEuler(quat, 0, 0, 90);
            tween(this.triangle).to(0.5, {
                rotation: quat
            }, { easing: "cubicOut" }).start()
        }
    }

    showHideDropDownBox() {
        if (this.isDropdown) {
            this.dropdown.active = true;
        } else {
            this.dropdown.active = false;
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
