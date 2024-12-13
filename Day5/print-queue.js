function checkOrdering(orderings, update) {
    for (const order of orderings) {
        let page1loc = update.indexOf(order[0]);
        let page2loc = update.indexOf(order[1]);
        if (page1loc === -1 || page2loc === -1) {
            continue;
        }
        if (page1loc > page2loc) {
            return false;
        }
    }
    // does not violate any ordering rules
    return true;
}

function getMiddlePage(update) {
    if (update.length === 0) {
        return null;
    }

    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
}

function performUpdates(orderings, pages) {
    let total = 0;
    for (const update of pages) {
        let ordered = checkOrdering(orderings, update);
        if (ordered) {
            let middle = getMiddlePage(update);
            console.log("Middle: " + middle);
            total += middle;
        }
    }
    return total;
}

function readInput(filepath) {
    var fs = require("fs");
    let data = fs.readFileSync(filepath).toString().split('\n');
    let isPageOrdering = true;
    let pageOrdering = [];
    let pagesToProduce = [];
    for (const d of data) {
        if (d === "") {
            isPageOrdering = false;
            continue;
        }
        if (isPageOrdering) {
            let pageOrder = d.split("|");
            pageOrder = pageOrder.map(Number);
            pageOrdering.push(pageOrder);
        } else {
            let pages = d.split(",");
            pages = pages.map(Number);
            pagesToProduce.push(pages);
        }
    }
    return [pageOrdering, pagesToProduce];
}

let [pageOrdering, pagesToProduce] = readInput("input.txt");
console.log(performUpdates(pageOrdering, pagesToProduce));
