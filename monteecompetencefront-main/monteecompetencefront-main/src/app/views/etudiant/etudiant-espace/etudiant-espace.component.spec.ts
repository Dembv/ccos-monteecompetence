import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantEspaceComponent } from './etudiant-espace.component';

describe('EtudiantEspaceComponent', () => {
  let component: EtudiantEspaceComponent;
  let fixture: ComponentFixture<EtudiantEspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantEspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
