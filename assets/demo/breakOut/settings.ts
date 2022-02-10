export interface LevelSetting {
    level: number;
    row: number;
    col: number;
    spaceX: number;
    spaceY: number;
    brickWidth: number;
    brickHeight: number;
    state: 'UNLOCKED' | 'LOCKED' | 'PASSED';
}

const settings: LevelSetting[] = [
    {
        level: 1,
        row: 4,
        col: 4,
        spaceX: 20,
        spaceY: 20,
        brickWidth: 200,
        brickHeight: 100,
        state: 'PASSED'
    },
    {
        level: 2,
        row: 4,
        col: 4,
        spaceX: 20,
        spaceY: 20,
        brickWidth: 200,
        brickHeight: 100,
        state: 'UNLOCKED'
    },
    {
        level: 3,
        row: 4,
        col: 4,
        spaceX: 20,
        spaceY: 20,
        brickWidth: 200,
        brickHeight: 100,
        state: 'LOCKED'
    },
    {
        level: 4,
        row: 4,
        col: 4,
        spaceX: 20,
        spaceY: 20,
        brickWidth: 200,
        brickHeight: 100,
        state: 'LOCKED'
    },
    {
        level: 5,
        row: 4,
        col: 4,
        spaceX: 20,
        spaceY: 20,
        brickWidth: 200,
        brickHeight: 100,
        state: 'LOCKED'
    },
    {
        level: 6,                   // 第6关
        row: 13,
        col: 13,
        spaceX: 4,
        spaceY: 4,
        brickWidth: 60,
        brickHeight: 30,
        state: 'LOCKED',
    }
]

export { settings };