import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <app-input class="form"></app-input>
    <app-catch-area></app-catch-area>`,
  styles: [``]
})
export class FormComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
