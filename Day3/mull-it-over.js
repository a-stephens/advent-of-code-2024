function mul(lhs, rhs) {
    return lhs * rhs;
}

function parseForMul(str) {
    let matches = str.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
    let ret = [];
    for (const match of matches) {
        ret.push([Number(match[1]), Number(match[2])]);
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
for (const out of output) {
    let args = parseForMul(out);
    for (const arg of args) {
        total += mul(arg[0], arg[1]);
    }
}
console.log("Total: " + total);
