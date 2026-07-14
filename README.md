# Crossword

A small JavaScript program that solves a crossword puzzle by fitting a list of words into a numbered grid using backtracking.

## Overview

The project is a single Node.js script, `crosswordSolver.js`, that takes a crossword grid (as a string) and a list of words, validates them, and attempts to place every word into the grid so that all horizontal and vertical slots are filled consistently. If a valid arrangement exists, the solved grid is printed to the console; otherwise `"Error"` is printed.

## Features

- Parses a text-based grid where each cell is `.` (blocked cell) or a digit `0`, `1`, or `2` (number of words starting at that cell).
- Validates the grid and word list before attempting to solve:
  - the grid may only contain `.`, `\n`, and the digits `0`, `1`, `2`
  - every row of the grid must have the same width
  - the number of word-start cells must match the number of supplied words
  - the word list must not contain duplicates
- Solves the puzzle with a recursive backtracking algorithm that tries placing each remaining word horizontally or vertically at each valid start cell, undoing placements that don't lead to a solution.
- Sorts words from longest to shortest before solving, to try more constrained placements first.
- Prints the solved grid as text, or `"Error"` if the input is invalid or no solution exists.

## Technologies

- JavaScript (Node.js) — no external dependencies or frameworks are used.

## Project Structure

```
crossword/
├── crosswordSolver.js   # Grid parsing, validation, and the backtracking solver
├── COPYRIGHT.md         # Copyright notice
└── LICENSE              # License terms
```

## Requirements

- Node.js (tested with Node.js v24)

## Installation

No dependencies to install. Just clone the repository:

```bash
git clone https://github.com/3xoob/crossword.git
cd crossword
```

## Usage

Run the script directly with Node:

```bash
node crosswordSolver.js
```

The grid and word list are currently defined at the bottom of `crosswordSolver.js`:

```js
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(puzzle, words)
```

To solve a different puzzle, edit the `puzzle` string and `words` array in the file:

- `puzzle` is a multi-line string where each line is a row of the grid.
  - `.` marks a blocked (unusable) cell.
  - `0` marks a cell that is part of a word but is not the start of a new word.
  - `1` marks a cell where exactly one word starts (horizontally or vertically).
  - `2` marks a cell where two words start (one horizontal, one vertical).
- `words` is an array of strings, one for each word that needs to be placed, with no duplicates.

The number of `1`s and `2`s (`2` counting twice) in the grid must equal the number of words supplied.

## Example

Given the puzzle grid:

```
2001
0..0
1000
0..0
```

and the word list `['casa', 'alan', 'ciao', 'anta']`, running `node crosswordSolver.js` prints:

```
Solved!
casa
i..l
anta
o..n
```

## Learning Objectives

This project is an exercise in implementing a constraint-based backtracking algorithm in JavaScript: parsing a custom text format into a data structure, validating input, generating candidate placements, recursively trying and undoing choices, and terminating with either a valid solution or a failure state.

## Limitations

- The puzzle and word list are hardcoded in the script; there is no command-line interface or file-based input.
- Grid cells only support the values `0`, `1`, `2`, or `.`; a cell cannot be the start of more than two words.
- Errors are only reported as the string `"Error"` printed to the console, with no further detail on why validation or solving failed.

## License

This project is released under an all-rights-reserved license — see [LICENSE](LICENSE) and [COPYRIGHT.md](COPYRIGHT.md). The source code is publicly available for portfolio and viewing purposes only; copying, modifying, distributing, or commercial use is not permitted without prior written permission from the copyright holder.
