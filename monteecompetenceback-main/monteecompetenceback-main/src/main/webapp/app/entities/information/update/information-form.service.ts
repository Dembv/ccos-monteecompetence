import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInformation, NewInformation } from '../information.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInformation for edit and NewInformationFormGroupInput for create.
 */
type InformationFormGroupInput = IInformation | PartialWithRequiredKeyOf<NewInformation>;

type InformationFormDefaults = Pick<NewInformation, 'id'>;

type InformationFormGroupContent = {
  id: FormControl<IInformation['id'] | NewInformation['id']>;
  titre: FormControl<IInformation['titre']>;
  imageInfos: FormControl<IInformation['imageInfos']>;
  imageInfosContentType: FormControl<IInformation['imageInfosContentType']>;
  contenu: FormControl<IInformation['contenu']>;
};

export type InformationFormGroup = FormGroup<InformationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InformationFormService {
  createInformationFormGroup(information: InformationFormGroupInput = { id: null }): InformationFormGroup {
    const informationRawValue = {
      ...this.getFormDefaults(),
      ...information,
    };
    return new FormGroup<InformationFormGroupContent>({
      id: new FormControl(
        { value: informationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      titre: new FormControl(informationRawValue.titre),
      imageInfos: new FormControl(informationRawValue.imageInfos),
      imageInfosContentType: new FormControl(informationRawValue.imageInfosContentType),
      contenu: new FormControl(informationRawValue.contenu),
    });
  }

  getInformation(form: InformationFormGroup): IInformation | NewInformation {
    return form.getRawValue() as IInformation | NewInformation;
  }

  resetForm(form: InformationFormGroup, information: InformationFormGroupInput): void {
    const informationRawValue = { ...this.getFormDefaults(), ...information };
    form.reset(
      {
        ...informationRawValue,
        id: { value: informationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): InformationFormDefaults {
    return {
      id: null,
    };
  }
}
