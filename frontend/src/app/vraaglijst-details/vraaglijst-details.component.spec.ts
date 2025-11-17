import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VraaglijstDetailsComponent } from './vraaglijst-details.component';

describe('VraaglijstDetailsComponent', () => {
  let component: VraaglijstDetailsComponent;
  let fixture: ComponentFixture<VraaglijstDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VraaglijstDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VraaglijstDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
