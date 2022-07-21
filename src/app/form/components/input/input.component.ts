import {Component, OnInit} from '@angular/core';
import {EventBusService} from "../../services/event-bus.service";
import {FormBuilder} from "@angular/forms";
import {DialogService} from "../../../dialog/servises/dialog.service";
import {PopupJumperComponent} from "../../../popup-jumper/components/popup-jumper/popup-jumper.component";
import {PictureAction, PictureActionEnum} from "../../types/PictureAction.interface";

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
    this.eventBusService.on<PictureAction>("letter-caught").subscribe(v => {
      const curValue = this.form.value.simpleInput
      if (v.type === PictureActionEnum.ADD) {
        this.form.patchValue({simpleInput: curValue + v.value!})
        this.dialog.open(PopupJumperComponent, v)
      }
      if (v.type === PictureActionEnum.REMOVE) {
        this.form.patchValue({simpleInput: curValue?.slice(0, curValue?.length - 1)})
      }
      if (v.type === PictureActionEnum.RESET) {
        this.form.patchValue({simpleInput: ''})
      }

    })
  }

}
