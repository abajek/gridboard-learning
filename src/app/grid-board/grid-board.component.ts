import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-board',
  templateUrl: './grid-board.component.html',
  styleUrls: ['./grid-board.component.css']
})
export class GridBoardComponent implements OnInit {

  constructor() { }
  width:number = 15;
  height:number = 15;
  items:number[][] = [];
  personRow = 0;
  personCol = 0;
  personDirection = 1;
  instructions:string = "F\nF\nR\nF\nF\nL\nF"
  instructionPtr: number = 0

  ngOnInit() {
    for (var i = 0; i < this.width; i++){
      this.items[i]=[]
      for (var j = 0; j < this.height; j++){
        this.items[i][j] = Math.round(Math.random()*10);
      }
    }
  }

  onClick() {
    var instructionArr = this.instructions.split("\n", 100);
    var cmd = instructionArr[this.instructionPtr]
    if ( cmd == "F"){
      switch (this.personDirection){
        case 0:
          this.personRow -= 1
          this.personRow = Math.max(0, this.personRow)
          break;
        case 1:
          this.personCol += 1
          this.personCol = Math.min(this.width-1, this.personCol)
          break;
        case 2:
          this.personRow += 1
          this.personRow = Math.min(this.height-1, this.personRow)
          break;
        case 3:
            this.personCol -= 1
            this.personCol = Math.max(0, this.personCol)
            break;
      }
    } if ( cmd == "B") {
      switch (this.personDirection){
        case 0:
          this.personRow += 1
          this.personRow = Math.min(this.height-1, this.personRow)
          break;
        case 1:
          this.personCol -= 1
          this.personCol = Math.max(0, this.personCol)
          break;
        case 2:
          this.personRow -= 1
          this.personRow = Math.max(0, this.personRow)
          break;
        case 3:
            this.personCol += 1
            this.personCol = Math.min(this.width, this.personCol)
            break;
      }
    }
    if ( cmd == "L")
      this.personDirection -= 1
    if ( cmd == "R")
      this.personDirection += 1
    this.instructionPtr += 1
    console.log(this.instructions)
  }

  getTileColor(row, col){
    if ( row == this.personRow && col == this.personCol)
      return "#0000FF"
    else if ( this.items[row][col]>7 )
      return "#FF0000"
    else
      return "#666666"
  }
  getTileIcon(row, col){
    if ( row == this.personRow && col == this.personCol){
      if ( this.personDirection == 0)
        return "^"
      else if ( this.personDirection == 1)
        return ">"
      else if ( this.personDirection == 2)
        return "V"
      else
        return "<"
    } else
      return " "
  }

}