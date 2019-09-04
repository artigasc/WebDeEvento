import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './strategicsponsors.component.html',
  styleUrls: ['./strategicsponsors.component.scss']
})
export class StrategicSponsorComponent {
  title = 'SolutionEventFrontEnd';

  scroll(el) {
    el.scrollIntoView();
  }
}


