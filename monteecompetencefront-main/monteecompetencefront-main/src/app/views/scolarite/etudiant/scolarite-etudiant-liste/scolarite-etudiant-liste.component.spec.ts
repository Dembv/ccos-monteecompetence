import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolariteEtudiantListeComponent } from './scolarite-etudiant-liste.component';

describe('ScolariteEtudiantListeComponent', () => {
  let component: ScolariteEtudiantListeComponent;
  let fixture: ComponentFixture<ScolariteEtudiantListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScolariteEtudiantListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScolariteEtudiantListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
