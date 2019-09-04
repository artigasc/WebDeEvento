import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SolutionEventFrontEnd';

  constructor(private cookieService: CookieService) {

  }
  ngOnInit(): void {
    if (this.cookieService.get('lang') === "") {
      this.cookieService.set('lang', 'es');
    }
  }
}
