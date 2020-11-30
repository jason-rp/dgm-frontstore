import { Component, OnInit } from '@angular/core';
import { User } from './users.model';
import { TableColumn, SortOrder } from '@app/@shared/interfaces/table';
import { TranslateService } from '@ngx-translate/core';
import { MOCK_DATA } from './MOCK_DATA';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  // TODO: call api to get real users
  users: User[] = MOCK_DATA;
  tableCols: TableColumn[] = [
    { field: 'id', header: this.translateService.instant('ID') },
    { field: 'name', header: this.translateService.instant('Name') },
  ];
  sortField = this.tableCols[0].field;
  sortOrder = SortOrder.Asc;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}
}
