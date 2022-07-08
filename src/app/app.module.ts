import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { GridBoardComponent } from './grid-board/grid-board.component';
import { InstructionListComponent } from './instruction-list/instruction-list.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, GridBoardComponent, InstructionListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
