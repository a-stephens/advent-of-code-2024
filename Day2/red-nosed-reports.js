function isAllIncreasing(levels) {
    for (let i = 1; i < levels.length; i++) {
        if (levels[i] <= levels[i - 1]) {
            return false;
        }
    }
    return true;
}

function isAllDecreasing(levels) {
    for (let i = 1; i < levels.length; i++) {
        if (levels[i] >= levels[i - 1]) {
            return false;
        }
    }
    return true;
}

function isSafe(levels, lowerBound, upperBound) {
    for (let i = 1; i < levels.length; i++) {
        let levelDifference = Math.abs(levels[i] - levels[i - 1]);
        let withinBounds = levelDifference >= lowerBound && levelDifference <= upperBound;
        if (!withinBounds) {
            return false;
        }
    }
    if (!(isAllIncreasing(levels) || isAllDecreasing(levels))) {
        return false;
    }

    return true;
}

function isSafeDampened(levels, lowerBound, upperBound) {
    let numErrors = 0;
    let isAllInc = true;
    let isAllDec = true;
    for (let i = 1; i < levels.length;) {
        let levelDifference = Math.abs(levels[i] - levels[i - 1]);
        let withinBounds = levelDifference >= lowerBound && levelDifference <= upperBound;
        let isInc = levels[i] > levels[i - 1];
        let isDec = levels[i] < levels[i - 1];
        if (!withinBounds && numErrors >= 1) {
            return false;
        } else if (!withinBounds) {
            numErrors++;
            levels.splice(i, 1);
            continue;
        }
        let tmpIsAllInc = isAllInc && isInc;
        let tmpIsAllDec = isAllDec && isDec;
        if (!(tmpIsAllInc || tmpIsAllDec)) {
            numErrors++;
            levels.splice(i, 1);
            continue;
        }
        isAllInc = isAllInc && isInc;
        isAllDec = isAllDec && isDec;
        i++;
    }
    if (!(isAllInc || isAllDec)) {
        return false;
    }

    return true;
}

function readInput(filepath) {
    var fs = require("fs");
    let data = fs.readFileSync(filepath).toString().split('\n').filter(n => n);
    let reports = [];
    for (const d of data) {
        let numbers = d.split(" ");
        for (i in numbers) {
            numbers[i] = Number(numbers[i]);
        }
        reports.push(numbers);
    }
    return reports;
}

let reports = readInput("example_input.txt");
console.log("Part one:");
let counter = 0;
for (const report of reports) {
    if (isSafe(report, 1, 3)) {
        counter++;
    }
}
console.log("Safe reports: " + counter);

console.log("Part two:");
counter = 0;
for (const report of reports) {
    if (isSafeDampened(report, 1, 3)) {
        counter++;
    }
}
console.log("Safe reports: " + counter);
