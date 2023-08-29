import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroPageComponent } from '../add-hero-page.component';

describe('AddHeroPageComponent', () => {
  let component: AddHeroPageComponent;
  let fixture: ComponentFixture<AddHeroPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddHeroPageComponent]
    });
    fixture = TestBed.createComponent(AddHeroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
