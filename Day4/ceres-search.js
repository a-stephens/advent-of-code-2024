let numRows, numCols;
let dx = [-1, -1, -1, 0, 0, 1, 1, 1];
let dy = [-1, 0, 1, -1, 1, -1, 0, 1];

function searchWord(grid, r, c, word) {
    let ret = 0;
    if (grid[r][c] !== word[0]) {
        return ret;
    }

    let wordLength = word.length;
    let directionIndex = 0;

    while (directionIndex < 8) {
        let k, currentRow = r + dx[directionIndex];
        let currentCol = c + dy[directionIndex];

        for (k = 1; k < wordLength; k++) {
            if (currentRow >= numRows || currentRow < 0 ||
                currentCol >= numCols || currentCol < 0)
                break;

            if (grid[currentRow][currentCol] !== word[k])
                break;

            currentRow += dx[directionIndex];
            currentCol += dy[directionIndex];
        }

        if (k === wordLength)
            ret++;

        directionIndex++;
    }

    return ret;
}

function findPattern(grid, targetWord) {
    let numMatches = 0;
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            numMatches += searchWord(grid, r, c, targetWord);
        }
    }
    return numMatches;
}

function readInput(filepath) {
    var fs = require("fs");
    let data = fs.readFileSync(filepath).toString().split('\n').filter(n => n);
    let results = [];
    for (const d of data) {
        results.push(d.split(""));
    }
    return results;
}

let output = readInput("./input.txt");
numRows = output.length;
numCols = output[0].length;
console.log("Size: " + numRows + "x" + numCols);
console.log(findPattern(output, "XMAS"));
