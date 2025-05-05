import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolariteProfileFormulaireComponent } from './scolarite-profile-formulaire.component';

describe('ScolariteProfileFormulaireComponent', () => {
  let component: ScolariteProfileFormulaireComponent;
  let fixture: ComponentFixture<ScolariteProfileFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScolariteProfileFormulaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScolariteProfileFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
