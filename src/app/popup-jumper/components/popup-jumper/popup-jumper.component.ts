import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-jumper',
  template: `<div class="container">
    <div class="letter">{{ data }}</div>
  </div>`,
  styleUrls: ['./popup-jumper.component.scss']
})
export class PopupJumperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public data?: string;

}
