import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VragenlijstComponent } from './vragenlijst.component';

describe('VragenlijstComponent', () => {
  let component: VragenlijstComponent;
  let fixture: ComponentFixture<VragenlijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VragenlijstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VragenlijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
