import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InformationService } from '../service/information.service';
import { IInformation } from '../information.model';
import { InformationFormService } from './information-form.service';

import { InformationUpdateComponent } from './information-update.component';

describe('Information Management Update Component', () => {
  let comp: InformationUpdateComponent;
  let fixture: ComponentFixture<InformationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let informationFormService: InformationFormService;
  let informationService: InformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), InformationUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(InformationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InformationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    informationFormService = TestBed.inject(InformationFormService);
    informationService = TestBed.inject(InformationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const information: IInformation = { id: 456 };

      activatedRoute.data = of({ information });
      comp.ngOnInit();

      expect(comp.information).toEqual(information);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInformation>>();
      const information = { id: 123 };
      jest.spyOn(informationFormService, 'getInformation').mockReturnValue(information);
      jest.spyOn(informationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ information });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: information }));
      saveSubject.complete();

      // THEN
      expect(informationFormService.getInformation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(informationService.update).toHaveBeenCalledWith(expect.objectContaining(information));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInformation>>();
      const information = { id: 123 };
      jest.spyOn(informationFormService, 'getInformation').mockReturnValue({ id: null });
      jest.spyOn(informationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ information: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: information }));
      saveSubject.complete();

      // THEN
      expect(informationFormService.getInformation).toHaveBeenCalled();
      expect(informationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInformation>>();
      const information = { id: 123 };
      jest.spyOn(informationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ information });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(informationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
