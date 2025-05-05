import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolariteInscriptionListeComponent } from './scolarite-inscription-liste.component';

describe('ScolariteInscriptionListeComponent', () => {
  let component: ScolariteInscriptionListeComponent;
  let fixture: ComponentFixture<ScolariteInscriptionListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScolariteInscriptionListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScolariteInscriptionListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
