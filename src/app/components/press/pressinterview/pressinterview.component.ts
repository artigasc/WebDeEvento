import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './pressinterview.component.html',
  styleUrls: ['./pressinterview.component.scss']
})
export class PressInterviewComponent {
  title = 'SolutionEventFrontEnd';

  scroll(el) {
    el.scrollIntoView();
  }
}


