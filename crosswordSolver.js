const crosswordSolver = (grid, wordList) => {
    if (!checkInput(grid, wordList)) {
        console.log("Error");
        return
    }

    const gridNumbers = parseGrid(grid);
    const startCells = findStartCells(gridNumbers);

    if (startCells.reduce((sum, cell) => sum + gridNumbers[cell.row][cell.col], 0) !== wordList.length) {
        console.log("Error");
        return
    }

    if (!hasUniformWidth(gridNumbers)) {
        console.log("Error");
        return
    }

    if (new Set(wordList).size !== wordList.length) {
        console.log("Error");
        return
    }

    wordList.sort((a, b) => b.length - a.length);
    const gridWords = gridNumbers.map(row => row.map(cell => cell === -1 ? "." : ""));

    if (!placeWords(wordList, startCells, gridWords, gridNumbers)) {
        console.log("Error");
        return
    }

    const result = gridWords.map(row => row.join("")).join("\n");
    console.log("Output:\n" + result);
    return
};

const checkInput = (grid, wordList) => {
    if (typeof grid !== "string" || !Array.isArray(wordList) || wordList.some(word => typeof word !== "string")) {
        return false;
    }
    if (!/^[.\n012]+$/.test(grid)) {
        return false;
    }
    return true;
};

const parseGrid = (grid) => {
    return grid.split('\n').map(row => row.split("").map(cell => cell === "." ? -1 : parseInt(cell)));
};

const findStartCells = (gridNumbers) => {
    const startCells = [];
    gridNumbers.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell > 0) {
                startCells.push({ row: rowIndex, col: colIndex });
            }
        });
    });
    return startCells;
};

const hasUniformWidth = (gridNumbers) => {
    const width = gridNumbers[0].length;
    return gridNumbers.every(row => row.length === width);
};

const canPlaceWord = (word, row, col, direction, gridWords, gridNumbers) => {
    if (direction === "horizontal" && col + word.length > gridNumbers[0].length) return false;
    if (direction === "vertical" && row + word.length > gridNumbers.length) return false;

    for (let i = 0; i < word.length; i++) {
        if (gridWords[row][col] !== "" && gridWords[row][col] !== word[i]) {
            return false;
        }
        direction === "horizontal" ? col++ : row++;
    }

    const nextCell = gridNumbers[row]?.[col];
    return nextCell === -1 || nextCell === undefined;
};

const placeWords = (wordList, startCells, gridWords, gridNumbers) => {
    if (wordList.length === 0) return true;

    for (const word of wordList) {
        for (const cell of startCells) {
            if (gridNumbers[cell.row][cell.col] === 0) continue;

            if (canPlaceWord(word, cell.row, cell.col, "horizontal", gridWords, gridNumbers)) {
                const backupRow = [...gridWords[cell.row]];
                for (let j = 0; j < word.length; j++) {
                    gridWords[cell.row][cell.col + j] = word[j];
                }
                gridNumbers[cell.row][cell.col]--;
                if (placeWords(wordList.filter(w => w !== word), startCells, gridWords, gridNumbers)) return true;
                gridNumbers[cell.row][cell.col]++;
                gridWords[cell.row] = backupRow;
            }

            if (canPlaceWord(word, cell.row, cell.col, "vertical", gridWords, gridNumbers)) {
                const backupCol = gridWords.map(row => row[cell.col]);
                for (let j = 0; j < word.length; j++) {
                    gridWords[cell.row + j][cell.col] = word[j];
                }
                gridNumbers[cell.row][cell.col]--;
                if (placeWords(wordList.filter(w => w !== word), startCells, gridWords, gridNumbers)) return true;
                gridNumbers[cell.row][cell.col]++;
                gridWords.forEach((row, index) => row[cell.col] = backupCol[index]);
            }
        }
    }
    return false;
};


const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['aaab', 'aaac', 'aaad', 'aaae']

crosswordSolver(puzzle, words)
