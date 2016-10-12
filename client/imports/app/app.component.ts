import { Component } from '@angular/core';

import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
export class AppComponent {
  parties:any[];

  constructor() {
    this.parties = [
			{
        name: 'House warming',
        description: 'I moved to a new house',
        location: 'Singapore'
      },
			{
        name: 'Swimming',
        description: 'At swimming pool',
        location: 'Shanghai'
      },
			{
        name: 'Rainbow',
        description: 'I saw rainbow today',
        location: 'Shenzhen'
      }      
    ]
  }
}
