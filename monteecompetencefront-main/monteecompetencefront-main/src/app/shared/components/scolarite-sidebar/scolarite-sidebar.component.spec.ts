import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolariteSidebarComponent } from './scolarite-sidebar.component';

describe('ScolariteSidebarComponent', () => {
  let component: ScolariteSidebarComponent;
  let fixture: ComponentFixture<ScolariteSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScolariteSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScolariteSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
