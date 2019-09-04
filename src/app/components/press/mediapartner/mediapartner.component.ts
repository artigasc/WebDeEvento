import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './mediapartner.component.html',
  styleUrls: ['./mediapartner.component.scss']
})
export class MediaPartnerComponent {
  title = 'SolutionEventFrontEnd';

  scroll(el) {
    el.scrollIntoView();
  }
}


