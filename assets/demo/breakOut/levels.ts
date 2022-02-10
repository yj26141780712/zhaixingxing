
import { _decorator, Component, Node, Layout, math, instantiate, Prefab, sys } from 'cc';
import { level } from './level';
import { LevelSetting, settings } from './settings';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = levels
 * DateTime = Thu Feb 10 2022 12:07:57 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = levels.ts
 * FileBasenameNoExtension = levels
 * URL = db://assets/demo/breakOut/levels.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('levels')
export class levels extends Component {

    @property(Prefab)
    public levelPrefab: Prefab = null;

    @property(Node)
    public levelsLayout: Node = null;

    start() {
        // [3]
        this.initLayout();
    }

    initLayout() {
        const saveSettingsJson = sys.localStorage.getItem('settings');
        if (saveSettingsJson) {
            const saveSettings = JSON.parse(saveSettingsJson);
            saveSettings.forEach((setting: LevelSetting) => {
                this.initLevel(setting);
            });
        } else {
            settings.forEach((setting: LevelSetting) => {
                this.initLevel(setting);
            });
            sys.localStorage.setItem('settings', JSON.stringify(settings));
        }
    }

    initLevel(setting: LevelSetting) {
        const levelNode = instantiate(this.levelPrefab);
        const levelC = levelNode.getComponent(level);
        levelC.setting = setting;
        levelC.changeState(setting.state, setting.level);
        this.levelsLayout.addChild(levelNode);
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
