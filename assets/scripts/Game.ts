
import { _decorator, Component, Node, Label, Button, Prefab, Vec3, UITransform, Pool, NodePool, instantiate, sys } from 'cc';
import { Play } from './Player';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Game
 * DateTime = Mon Jan 24 2022 12:29:44 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = Game.ts
 * FileBasenameNoExtension = Game
 * URL = db://assets/Scripts/Game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('Game')
export class Game extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Label)
    public scoreDisplay: Label | null = null;
    @property(Node)
    public btnStartNode: Node | null = null;
    @property(Node)
    public gameOverNode: Node | null = null;
    @property(Node)
    public groundNode: Node | null = null;
    @property(Prefab)
    public starPrefab: Prefab | null = null;
    @property(Play)
    public Player: Play | null = null;
    @property(Label)
    public infoControl: Label | null = null;
    @property()
    public minStarDuration = 0;
    @property()
    public maxStarDuration = 0;


    score: number = 0;
    groundY: number = 0;
    starPool: NodePool;
    currentStar: Node;
    starDuration = 0;
    timer = 0;
    currentStarX = 0;

    start() {
        const groupUi = this.groundNode.getComponent(UITransform);
        const playerUi = this.Player.node.getComponent(UITransform);
        this.groundY = this.groundNode.getPosition().y + groupUi.height / 2 + playerUi.height / 2;
        this.gameOverNode.active = false;
        this.enabled = false;
        this.infoControl.string = sys.isMobile ?
            '点击左半屏幕：向左加速\n点击右半屏幕：向右加速' : 'A：向左加速\nD：向右加速';
        this.starPool = new NodePool();
    }

    onStartGame() {
        this.initScore();
        this.enabled = true;
        this.btnStartNode.active = false;
        this.Player.startMoveAt(new Vec3(0, this.groundY, 0));
        this.spawnNewStar();
    }

    spawnNewStar() {
        let newStar = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.starPool.size() > 0) {
            newStar = this.starPool.get(this); // this will be passed to Star's reuse method
        } else {
            newStar = instantiate(this.starPrefab);
        }
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // pass Game instance to star
        newStar.getComponent('star').init(this);
        // start star timer and store star reference
        this.startTimer();
        this.currentStar = newStar;
    }

    startTimer() {
        // get a life duration for next star
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    }

    getNewStarPosition() {
        // if there's no star, set a random x pos
        const ui = this.node.getComponent(UITransform)
        if (!this.currentStar) {
            this.currentStarX = (Math.random() - 0.5) * 2 * ui.width / 2;
        }
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.Player.jumpHeight + 50;
        // 根据屏幕宽度和上一个星星的 x 坐标，随机得到一个新生成星星 x 坐标
        var maxX = ui.width / 2;
        if (this.currentStarX >= 0) {
            randX = -Math.random() * maxX;
        } else {
            randX = Math.random() * maxX;
        }
        this.currentStarX = randX;
        // 返回星星坐标
        return new Vec3(randX, randY, 0);
    }

    //初始化积分
    initScore() {
        this.score = 0;
        this.scoreDisplay.string = 'Score : ' + this.score.toString();
    }

    gameOver() {
        this.gameOverNode.active = true;
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
