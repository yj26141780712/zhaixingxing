export interface ColorSetting {
    r: number;
    g: number;
    b: number;
    a: number;
    active?: boolean
}

export interface ToolSetting {
    name: string;
    active?: boolean
}

const colors: ColorSetting[] = [
    {
        r: 0, g: 0, b: 0, a: 255, active: true
    },
    {
        r: 255, g: 0, b: 0, a: 100
    },
    {
        r: 0, g: 128, b: 0, a: 100
    },
    {
        r: 0, g: 0, b: 255, a: 100
    },
    {
        r: 255, g: 255, b: 0, a: 100
    },
    {
        r: 128, g: 0, b: 128, a: 100
    }
];
const tools = [
    {
        name: 'brush',
        active: true
    },
    {
        name: 'eraser'
    }
];
export { colors, tools }