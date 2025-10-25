/**
 * Represents a Tile in a Minesweeper game.
 * state: is the state in which that Tile is displayed (hidden, revealed, flagged)
 * x: x coordinate of the Tile in a board
 * y: y coordinate of the Tile in a board
 * mine: boolean representing whether the Tile is a mine or not
 * adjMines: number of mines in adjacent Tiles - this number should be set by the caller.
 */
export class Tile{
    /**
     * Constructs a Tile object.
     * @param {number} x - x coordinate of the Tile in a board 
     * @param {number} y - y coordinate of the Tile in a board
     */
    constructor(x,y, state){
        this.state = state;
        this.x = x;
        this.y = y;
        this.mine = false;
        this.adjMines = 0;
    }

    /**
     * Gets the state of the Tile.
     * @returns {string} - the state in which the Tile is currently.
     */
    getState(){
        return this.state.dataset.status;
    }
    /**
     * Sets the state of the Tile.
     * @param {string} state - the new state to se the Tile to. 
     */
    setState(state){
        this.state.dataset.status = state;
    }
    /**
     * Checks wheather the Tile is a mine or not.
     * @returns {boolean}
     */
    isMine(){
        return this.mine;
    }
    /**
     * Sets the Tile as a mine.
     */
    setMine(){
        this.mine = true;
    }
    /**
     * Returns the number of adjacent Mines.
     * @returns {number} - adjacent Mines
     */
    nearbyMines(){
        return this.adjMines;
    }

    //The function to check for nearby mines should be handled by the caller.
}