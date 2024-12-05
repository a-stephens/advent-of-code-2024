function mul(lhs, rhs) {
    return lhs * rhs;
}

function getHighestIndexUpTo(indexes, maxIndex) {
    let ret = -1;
    for (let i = 0; i < indexes.length; i++) {
        let ind = indexes[i];
        if (ind < maxIndex) {
            ret = ind;
        } else {
            break;
        }
    }
    return ret;
}

function parseForMul(str, initialDo) {
    let matches = str.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
    let dontInstrs = str.matchAll(/don\'t\(\)/g);
    let donts = [];
    for (const instr of dontInstrs) {
        donts.push(instr.index);
    }
    let doInstrs = str.matchAll(/do\(\)/g);
    let dos = [];
    for (const instr of doInstrs) {
        dos.push(instr.index);
    }
    let ret = [];
    for (const match of matches) {
        let dontIndex = getHighestIndexUpTo(donts, match.index);
        let doIndex = getHighestIndexUpTo(dos, match.index);
        if (doIndex >= 0 || dontIndex >= 0) {
            initialDo.value = doIndex > dontIndex;
        }
        if (initialDo.value) {
            ret.push([Number(match[1]), Number(match[2])]);
        }
    }
    return ret;
}

function readInput(filepath) {
    var fs = require("fs");
    let data = fs.readFileSync(filepath).toString().split('\n').filter(n => n);
    return data;
}

let output = readInput("./input.txt");
let total = 0;
let initialDoInstr = { value: true };
for (const out of output) {
    let args = parseForMul(out, initialDoInstr);
    for (const arg of args) {
        total += mul(arg[0], arg[1]);
    }
}
console.log("Total: " + total);
