import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.scss'],
})
export class HomeNewComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  redirect(pagename: string) {
    this.router.navigate(['/'+pagename]);
  }

  ngOnInit() {}

  ngOnDestroy() {}


}
