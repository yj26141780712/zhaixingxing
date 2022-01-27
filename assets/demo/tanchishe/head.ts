
import { _decorator, Component, Node, UITransform, Sprite, math, color, Vec3, Prefab, instantiate, Color, Vec2, macro, UI, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = head
 * DateTime = Tue Jan 25 2022 18:52:32 GMT+0800 (中国标准时间)
 * Author = yj261417807
 * FileBasename = head.ts
 * FileBasenameNoExtension = head
 * URL = db://assets/demo/tanchishe/head.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('head')
export class head extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Prefab)
    public bodyPrefab: Prefab | null = null;

    @property()
    public bodyNum = 2;

    @property()
    public sectionLength = 25;

    @property(Prefab)
    public foodPrefab: Prefab;

    snakeArray: Node[] = [];
    snakeColor: Color;
    dir: Vec3;
    speed: number;
    //蛇身所有的点
    pointsArray: Vec3[] = [];
    //蛇头走过的点的数量
    headPointsNum = 0;
    start() {
        // [3]
        this.speed = this.sectionLength / 5;
        this.snakeArray.push(this.node);
        const sprite = this.node.getComponent(Sprite);
        this.snakeColor = this.randomColor();
        sprite.color = this.snakeColor;
        this.node.setPosition(this.randomPos());
        this.rotateHead(this.node.getPosition());
        for (let i = 0; i < this.bodyNum; i++) {
            this.getNewBody();
        }
        this.dir = null;
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        let newFood = instantiate(this.foodPrefab);
        this.node.parent.addChild(newFood);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        otherCollider.node.removeFromParent();
        let newFood = instantiate(this.foodPrefab);
        this.node.parent.addChild(newFood);
        this.getNewBody();
    }

    randomColor() {
        const red = Math.round(Math.random() * 255);
        const green = Math.round(Math.random() * 255);
        const blue = Math.round(Math.random() * 255);
        return color(red, green, blue);
    }

    randomPos() {
        const uiTransform = this.node.parent.getComponent(UITransform);
        const height = uiTransform.height;
        const width = uiTransform.width;
        const x = Math.round(width * Math.random()) - width / 2;
        const y = Math.round(height * Math.random()) - height / 2;
        return new Vec3(x, y, 0);
    }

    rotateHead(pos: Vec3) {
        // const rotation = this.node.getRotation().getEulerAngles(new Vec3(0,0,90));
        // this.node.setRotationFromEuler(new Vec3(0,0,90));
        // this.node.setRotationFromEuler
        const angle = - new Vec2(pos.x, pos.y).signAngle(new Vec2(1, 0));
        const degree = angle / Math.PI * 180;
        console.log(degree);
        this.node.setRotationFromEuler(new Vec3(0, 0, degree - 90));
    }

    moveSnake() {
        const posV = new Vec3().add(this.dir).multiplyScalar(this.speed);
        this.node.setPosition(this.node.getPosition().add(posV));
        this.pointsArray.push(this.node.getPosition());
        this.headPointsNum += 1;
        console.log(this.pointsArray.length, this.headPointsNum);
        for (let i = 1; i < this.snakeArray.length; i++) {
            let num = Math.floor((this.pointsArray.length - this.headPointsNum) / (this.snakeArray.length - 1) * (this.snakeArray.length - 1 - i));
            this.snakeArray[i].setPosition(this.pointsArray[num + this.snakeArray[i].curIndex]);
            (this.snakeArray[i] as any).curIndex += 1;
        }
    }

    getNewBody() {
        const bodyNode = instantiate(this.bodyPrefab);
        (bodyNode as any).curIndex = 0;
        if (this.snakeArray.length > this.bodyNum) {
            bodyNode.curIndex = this.snakeArray[this.snakeArray.length - 1].curIndex;
        } else {
            bodyNode.curIndex = 0;
        }
        if (this.snakeArray.length === 1) { // 只有蛇头
            const dir = this.node.getPosition().normalize();
            const newPos = this.node.getPosition().subtract(dir.multiplyScalar(this.sectionLength));
            bodyNode.setPosition(newPos);
        } else {
            const last = this.snakeArray[this.snakeArray.length - 1];
            const lastLast = this.snakeArray[this.snakeArray.length - 2];
            const dir = lastLast.getPosition().subtract(last.getPosition()).normalize();
            const newPos = last.getPosition().subtract(dir.multiplyScalar(this.sectionLength));
            bodyNode.setPosition(newPos)
        }
        const sprite = bodyNode.getComponent(Sprite);
        sprite.color = this.snakeColor;
        this.node.parent.addChild(bodyNode);
        this.snakeArray.push(bodyNode);
        this.recordPoints();
        this.changeZIndex();
    }

    recordPoints() {
        let len = 0;
        let index = 0;
        while (len < this.sectionLength) {
            len += this.speed;
            let lastNode = this.snakeArray[this.snakeArray.length - 1];
            let lastLastNode = this.snakeArray[this.snakeArray.length - 2];
            let dir = lastNode.getPosition().subtract(lastLastNode.getPosition()).normalize();
            let pos = lastNode.getPosition().add(dir.multiplyScalar(len));
            this.pointsArray.splice(index, 0, pos);
            index++;
        }
    }

    changeZIndex() {
        for (let i = 0; i < this.snakeArray.length; i++) {
            const index = this.node.parent.children.length - i - 1;
            this.snakeArray[i].setSiblingIndex(index);
        }
    }

    update(deltaTime: number) {
        if (this.dir) {
            this.rotateHead(this.dir);
            this.moveSnake();
        }
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
