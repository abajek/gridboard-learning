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

  ngOnInit() {
    for (var i = 0; i < this.width; i++){
      this.items[i]=[]
      for (var j = 0; j < this.height; j++){
        this.items[i][j] = 123;
      }
    }
  }

  onClick() {
    this.items[1][2]=Math.round(Math.random()*256)
  }

}