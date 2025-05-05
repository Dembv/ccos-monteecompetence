import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { InscriptionDetailComponent } from './inscription-detail.component';

describe('Inscription Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: InscriptionDetailComponent,
              resolve: { inscription: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(InscriptionDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load inscription on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', InscriptionDetailComponent);

      // THEN
      expect(instance.inscription).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
