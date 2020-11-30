import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() isSidebarShown: boolean;

  @Output() logout = new EventEmitter<any>();
  @Output() toggleSidebar = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
