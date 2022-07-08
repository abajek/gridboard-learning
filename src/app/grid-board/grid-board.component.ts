import { ReturnStatement } from '@angular/compiler';
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
  exitRow = 0;
  exitCol = 0;
  instructions:string = "F\nF\nR\nF\nF\nL\nF"
  instructionPtr: number = 0

  ngOnInit() {
    for (var i = 0; i < this.width; i++){
      this.items[i]=[]
      for (var j = 0; j < this.height; j++){
        this.items[i][j] = Math.round(Math.random()*10);
      }
    }
    this.exitRow = Math.round(Math.random()*(this.height-1));
    this.exitCol = Math.round(Math.random()*(this.width-1));
  }

  onClick() {
    var oldPersonDirection = this.personDirection;
    var oldPersonRow = this.personRow;
    var oldPersonCol = this.personCol;
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
    if (this.items[this.personRow][this.personCol]>7){
      this.boop();
      this.personRow = oldPersonRow;
      this.personCol = oldPersonCol;
    } else
      this.beep()
  }

  getTileColor(row, col){
    if ( row == this.personRow && col == this.personCol)
      return "#0000FF"
    else if ( row == this.exitRow && col == this.exitCol)
      return "#00FF00"
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
    } else if ( row == this.exitRow && col == this.exitCol)
      return "E"
  }

  boop() {
    var snd = new Audio("data:audio/mp3;base64,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");  
    snd.play();
}

  beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}
}
