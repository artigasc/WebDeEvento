import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener, VERSION, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { HubService } from '../../services/hub.service';
import MenuModel from '../../models/menu.model';
import { CookieService } from 'ngx-cookie-service';
import { Global, Helper } from '../../global.module';
import { window } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'menu-inicio',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  language: string;
  menuList: MenuModel[];
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private hubService: HubService,
    private cookieService: CookieService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.language = this.cookieService.get('lang');
    try {
      this.hubService.getMenus(this.language)
          .subscribe(data => {
            if (data.status === Global.responseOk) {
              this.menuList = data.data;
              Helper.menuGlobal = data.data;
            }
          })
    } catch (e) {
      console.log(e.message);
    }
    this.spinnerService.hide();
  };

  changeCulturization (lang) {
    this.cookieService.set('lang', lang);
    location.reload();
  }

}
