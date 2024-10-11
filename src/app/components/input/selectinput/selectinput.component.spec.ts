import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectinputComponent } from './selectinput.component';

describe('SelectinputComponent', () => {
  let component: SelectinputComponent;
  let fixture: ComponentFixture<SelectinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectinputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
