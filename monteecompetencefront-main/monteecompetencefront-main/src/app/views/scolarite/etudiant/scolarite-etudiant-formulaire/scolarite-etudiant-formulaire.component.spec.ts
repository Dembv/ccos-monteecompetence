import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolariteEtudiantFormulaireComponent } from './scolarite-etudiant-formulaire.component';

describe('ScolariteEtudiantFormulaireComponent', () => {
  let component: ScolariteEtudiantFormulaireComponent;
  let fixture: ComponentFixture<ScolariteEtudiantFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScolariteEtudiantFormulaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScolariteEtudiantFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
