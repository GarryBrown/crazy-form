import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupJumperComponent } from './popup-jumper.component';

describe('PopupJumperComponent', () => {
  let component: PopupJumperComponent;
  let fixture: ComponentFixture<PopupJumperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupJumperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupJumperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
