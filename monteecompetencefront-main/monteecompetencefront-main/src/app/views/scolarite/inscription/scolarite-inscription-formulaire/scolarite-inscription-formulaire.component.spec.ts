import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolariteInscriptionFormulaireComponent } from './scolarite-inscription-formulaire.component';

describe('ScolariteInscriptionFormulaireComponent', () => {
  let component: ScolariteInscriptionFormulaireComponent;
  let fixture: ComponentFixture<ScolariteInscriptionFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScolariteInscriptionFormulaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScolariteInscriptionFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
