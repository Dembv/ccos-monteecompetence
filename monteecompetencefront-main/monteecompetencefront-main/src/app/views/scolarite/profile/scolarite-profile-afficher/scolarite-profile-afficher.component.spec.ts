import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolariteProfileAfficherComponent } from './scolarite-profile-afficher.component';

describe('ScolariteProfileAfficherComponent', () => {
  let component: ScolariteProfileAfficherComponent;
  let fixture: ComponentFixture<ScolariteProfileAfficherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScolariteProfileAfficherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScolariteProfileAfficherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
