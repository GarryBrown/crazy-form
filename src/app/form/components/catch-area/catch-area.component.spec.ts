import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchAreaComponent } from './catch-area.component';

describe('CatchAreaComponent', () => {
  let component: CatchAreaComponent;
  let fixture: ComponentFixture<CatchAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
