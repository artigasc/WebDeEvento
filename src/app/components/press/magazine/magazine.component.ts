import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss']
})
export class MagazineComponent {
  title = 'SolutionEventFrontEnd';

  scroll(el) {
    el.scrollIntoView();
  }
}


