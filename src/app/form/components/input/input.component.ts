import {Component, OnInit} from '@angular/core';
import {EventBusService} from "../../services/event-bus.service";
import {FormBuilder} from "@angular/forms";
import {DialogService} from "../../../dialog/servises/dialog.service";
import {PopupJumperComponent} from "../../../popup-jumper/components/popup-jumper/popup-jumper.component";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  form = this.fb.group({
    simpleInput: ['']
  })

  constructor(private eventBusService: EventBusService,
              private fb: FormBuilder,
              private dialog: DialogService) {
  }

  ngOnInit(): void {
    this.eventBusService.on<string>("letter-caught").subscribe(v => {
      const cur = this.form.value.simpleInput
      this.form.patchValue({simpleInput: cur + v})
      this.dialog.open(PopupJumperComponent, v)
    })
  }

}
