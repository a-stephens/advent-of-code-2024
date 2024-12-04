function isSafe(levels, lowerBound, upperBound) {
    let hadBadLevel = false;
    let isAllIncreasing = true;
    let isAllDecreasing = true;
    for (let i = 0; i < levels.length - 1; i++) {
        let levelDifference = Math.abs(levels[i] - levels[i + 1]);
        let withinBounds = levelDifference >= lowerBound && levelDifference <= upperBound;
        let isDecreasing = levels[i + 1] < levels[i];
        let isIncreasing = levels[i + 1] > levels[i];
        let hasBadLevel = !withinBounds;
        if (isAllIncreasing) {
            hasBadLevel = hasBadLevel || isIncreasing;
        } else if (isAllDecreasing) {
            hasBadLevel = hasBadLevel || isDecreasing;
        }
        if (hadBadLevel && hasBadLevel) {
            return false;
        } else if (hasBadLevel) {
            hadBadLevel = true;
            continue;
        }
        isAllIncreasing = isAllIncreasing && isIncreasing;
        isAllDecreasing = isAllDecreasing && isDecreasing;
    }
    if (!(isAllIncreasing || isAllDecreasing)) {
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
let counter = 0;
for (const report of reports) {
    if (isSafe(report, 1, 3)) {
        counter++;
    }
}
console.log(counter)
