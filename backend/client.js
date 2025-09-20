import * as minesweeper from "./minesweeper.js";

const board = minesweeper.BuildBoard(10);
minesweeper.addMines(board, 10);
minesweeper.PrintBoard(board);