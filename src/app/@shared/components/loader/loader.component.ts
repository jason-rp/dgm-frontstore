import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() isLoading = false;
  @Input() width = '50px';
  @Input() height = '50px';
  @Input() strokeWidth = 2;
  @Input() message: string | undefined;

  constructor() {}

  ngOnInit() {}
}
