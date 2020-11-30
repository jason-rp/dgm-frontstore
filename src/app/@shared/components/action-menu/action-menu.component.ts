import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent implements OnInit {
  @Input() actions: MenuItem[] = [];
  @Input() data: any;
  @Input() buttonIcon = 'fa-ellipsis-h';
  @Input() buttonClass: string;
  @Output() toggleMenu = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
