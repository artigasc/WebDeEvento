import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'SolutionEventFrontEnd';

  constructor(private cookieService: CookieService) {

  }
  ngOnInit(): void {
    
  }
}
