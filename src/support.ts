import { start } from "repl";

/* import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
export async function readLine() {
    return new Promise(res => {
        rl.question("> press enter", res);
    });
} */
export const Dirs: [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];


export async function mazeValidate(maze: string[][]): Promise<boolean> {
    let startPointCount = 0;
    let endPointCount = 0;
    for (let r = 0; r < maze.length; ++r) {
        for (let c = 0; c < maze[r].length; ++c) {
            switch (maze[r][c]) {
                case '#':
                    break;
                case 'O':
                    ++startPointCount;
                    break;
                case 'X':
                    ++endPointCount;
                    break;
                case ' ':
                    break;
                default:
                    alert("This maze contain unvalid character");
                    return false;
            }
        }
    }
    if (endPointCount !== 1 || startPointCount !== 1) {
        alert("The end points and start points are not valid");
        return false;
    }
    return true;
}
export function string2Grid(maze: string): string[][] {
    let mazeGrid: string[][] = maze.replaceAll('\r', '').split('\n').slice(0).map((x: string) => x.split(''));
    mazeGrid.pop();
    for (let r = 0; r < mazeGrid.length; ++r)
        console.log(mazeGrid[r]);
    let size = getMaxSize(mazeGrid);
    for (let r = 0; r < mazeGrid.length; ++r)
        for (let c = mazeGrid[r].length; c < size[1]; ++c)
            mazeGrid[r].push(' ');

    return mazeGrid;
}

export async function printMaze(maze: string[][]): Promise<void> {
    // 0 = wall, 1 = seen ,2 = unseen ,3 = end
    const board = document.getElementById("maze") as HTMLCanvasElement;
    const ctx = board.getContext('2d') as CanvasRenderingContext2D;
    let size: [number, number] = [50, 50];

    for (let r = 0; r < maze.length; ++r) {
        for (let c = 0; c < maze[r].length; ++c) {
            switch (maze[r][c]) {
                case '#':
                    ctx.fillStyle = 'grey';
                    //output[r][c] = '#';
                    break;
                case 'O':
                    ctx.fillStyle = 'lightgreen';
                    //output[r][c] = ' ';
                    break;
                case ' ':
                    ctx.fillStyle = 'white';
                    //output[r][c] = ' ';
                    break;
                case 'X':
                    ctx.fillStyle = 'red';
                    //output[r][c] = 'X';
                    break;
                case 'A':
                    ctx.fillStyle = 'yellow';
            }
            ctx.fillRect(c * size[1], r * size[0], size[0], size[1]);
        }
    }



}

let cnt = -1;
let mazeProgress: string[][][] = [];
export function addToData(maze: string[][], cur: [number, number]) {
    mazeProgress[cnt] = [];
    for (let r = 0; r < maze.length; ++r) {
        mazeProgress[cnt][r] = maze[r].slice();
    }
    mazeProgress[cnt][cur[0]][cur[1]] = 'A';
    ++cnt;
}

let currentIndex = 0;
export function next(): boolean {
    let end = true;
    if (currentIndex < cnt - 1) {
        ++currentIndex;
        end = false;
    }

    printMaze(mazeProgress[currentIndex]);
    return end;
}
export function prev() {
    if (currentIndex > 0)
        --currentIndex;
    printMaze(mazeProgress[currentIndex]);
}
export function reset() {
    mazeProgress = [];
    currentIndex = 0;
    cnt = 0;
    const board = document.getElementById("maze") as HTMLCanvasElement;
    const context = board.getContext('2d');
    context?.clearRect(0, 0, board.width, board.height);
    //printMaze(mazeProgress[currentIndex]);
}

export async function changeCanvas(width: number, height: number) {
    let canvas = document.getElementById('maze') as HTMLCanvasElement;
    canvas.height = height;
    canvas.width = width;
}

export function getMaxSize(maze: string[][]): [number, number] {
    let width = 0;
    let height = maze.length;
    for (let r = 0; r < maze.length; ++r) {
        width = Math.max(width, maze[r].length);
    }
    return [height, width];
}