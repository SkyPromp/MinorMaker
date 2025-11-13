import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlantenLijstComponent } from './klanten-lijst.component';

describe('KlantenLijstComponent', () => {
  let component: KlantenLijstComponent;
  let fixture: ComponentFixture<KlantenLijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlantenLijstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlantenLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
