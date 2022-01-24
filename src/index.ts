import { start } from './main.js'
import { next, prev, reset ,string2Grid} from './support.js'


let auto = false;
let interval: any;


const maze = document.querySelector('input') as HTMLInputElement;
const startButton = document.getElementById('startBtn') as HTMLButtonElement;
startButton.addEventListener('click', function () {
    
    if (!maze.files) {
        alert("Upload a file first");
        return;
    }
    else {
        let reader = new FileReader();
        let mazeFile = maze.files[0];
        reader.addEventListener("load", () => {
            let mazeStr :string = reader.result as string;
            let maze : string[][] = string2Grid(mazeStr);
            start(maze);
          }, false);
        
        reader.readAsText(mazeFile,"ascii");
        //
    }
});
const nextButton = document.getElementById('nextBtn') as HTMLButtonElement;
const prevButton = document.getElementById('prevBtn') as HTMLButtonElement;
const autoButton = document.getElementById('autoBtn') as HTMLButtonElement;
const resetButton = document.getElementById('resetBtn') as HTMLButtonElement;

nextButton.addEventListener('click', next);
prevButton.addEventListener('click', prev);
autoButton.addEventListener('click', function () {
    if (!auto) {

        interval = setInterval(function () {
            let stop = next();
            if (stop) {
                clearInterval(interval);
            }
        }, 0);
    }
    else {
        clearInterval(interval);
    }
    auto = !auto;
    console.log('a');
});
resetButton.addEventListener('click', function(){
    reset();
    auto = false;
});







