export class Tile{
    constructor(x,y){
        this.element = "hidden";
        this.x = x;
        this.y = y;
        this.mine = false;
        this.adjMines = 0;
    }

    getElement(){
        return this.element;
    }
    setElement(element){
        this.element = element;
    }
    isMine(){
        return this.mine;
    }
    setMine(){
        this.mine = true;
    }
    nearbyMines(){
        return this.adjMines;
    }

    //The function to check for nearby mines should be handled by the caller.
}