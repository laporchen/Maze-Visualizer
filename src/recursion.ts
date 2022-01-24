import {
    Dirs,
    addToData,
    reset,
    next
} from './support.js';

async function dfs(maze: string[][], seen: boolean[][], cur: [number, number], dir: number): Promise<boolean> {
    const x = cur[0];
    const y = cur[1];
    if (x < 0 || x >= maze.length || y < 0 || y >= maze[0].length) return false;
    if (maze[x][y] === '#' || seen[x][y] === true) return false;

    addToData(maze, cur);
    //await readLine();
    if (maze[x][y] === 'X') return true;
    seen[x][y] = true;
    maze[x][y] = 'O';

    let result = false;
    for (let i = 0; i < 4; ++i) {
        result = result || await dfs(maze, seen, [x + Dirs[i][0], y + Dirs[i][1]], i);
    }
    return result;
}



export async function findPath(mode: number, maze: string[][]): Promise<void> {
    reset();
    let seen: boolean[][] = new Array(maze.length).fill(0).map((_: number) => {
        return new Array(maze[0].length).fill(false) as boolean[];
    });
    let findStartPoint = false;
    let startPoint: [number, number] = [0, 0];
    for (let r = 0; r < maze.length; ++r) {
        for (let c = 0; c < maze[r].length; ++c) {
            if (maze[r][c] === 'O') {
                startPoint = [r, c];
                findStartPoint = true;
                break;
            }
        }
        if (findStartPoint) break;
    }
    let result: boolean = false;
    switch (mode) {
        case 0:
            for (let i = 0; i < 4; ++i) {
                result = result || await dfs(maze, seen, startPoint, i);
            }
            break;
    }
    if (result === true) {
        alert("The maze has a solution!");
        
    }
    else {
        alert("This maze does not have a solution!");
    }
    next();
}

