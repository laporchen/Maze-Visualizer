import {
    mazeValidate,
    changeCanvas,
    getMaxSize,
} from './support.js';
import {
    maze
} from './mazeValue.js'
import {
    findPath
} from './recursion.js'

export async function start(maze :string [][]) {
    if(await mazeValidate(maze) === false){
        return;
    }
    let size =  await getMaxSize(maze);
    changeCanvas(size[1] * 50,size[0]*50);
    findPath(0,maze);
}

/* let startButton = document.getElementById('start') as HTMLButtonElement;
startButton.onclick = start; */

