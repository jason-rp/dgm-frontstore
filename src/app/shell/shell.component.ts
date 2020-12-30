import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@app/app.service';
import { AuthenticationService } from '@app/auth/authentication.service';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {
  isSidebarShown = false;

  readonly navMenu: MenuItem[] = [
    // {
    //   label: this.translateService.instant('Dashboard'),
    //   routerLink: ['dashboard'],
    // },
    // {
    //   label: this.translateService.instant('User management'),
    //   routerLink: ['users'],
    // },
    // {
    //   label: this.translateService.instant('Heros'),
    //   routerLink: ['heroes'],
    // }
    {
        label: this.translateService.instant('shower'),
        routerLink: ['home'],
      
    }
  ];

  paginatorFirstText = this.translateService.instant('First');
  paginatorLastText = this.translateService.instant('Last');

  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private authenticationService: AuthenticationService,
    private appService: AppService
  ) { }

  ngOnInit() {
    // TODO: removed after calling real API endpoints
    this.appService.isLoading = false;
  }

  ngOnDestroy(): void { }

  get title(): string {
    return this.titleService.getTitle();
  }

  logout() {
    this.authenticationService.logout();
  }

  toggleSidebar() {
    this.isSidebarShown = !this.isSidebarShown;
  }
}
