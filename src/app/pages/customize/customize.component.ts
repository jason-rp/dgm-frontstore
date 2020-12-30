import { Component, OnInit } from '@angular/core';

declare function InitiateDrawingUI(): any;
@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {


  constructor() { }
  ngOnInit(...args: []): void {
    this.InitDrawing();
  }

  InitDrawing(){
    InitiateDrawingUI();
  }
}
