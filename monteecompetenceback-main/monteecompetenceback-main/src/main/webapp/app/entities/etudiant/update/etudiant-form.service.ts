import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEtudiant, NewEtudiant } from '../etudiant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEtudiant for edit and NewEtudiantFormGroupInput for create.
 */
type EtudiantFormGroupInput = IEtudiant | PartialWithRequiredKeyOf<NewEtudiant>;

type EtudiantFormDefaults = Pick<NewEtudiant, 'id'>;

type EtudiantFormGroupContent = {
  id: FormControl<IEtudiant['id'] | NewEtudiant['id']>;
  codeEtudiant: FormControl<IEtudiant['codeEtudiant']>;
  telephone: FormControl<IEtudiant['telephone']>;
  emailPersonnel: FormControl<IEtudiant['emailPersonnel']>;
  adresse: FormControl<IEtudiant['adresse']>;
  sexe: FormControl<IEtudiant['sexe']>;
  dateNaissance: FormControl<IEtudiant['dateNaissance']>;
  user: FormControl<IEtudiant['user']>;
};

export type EtudiantFormGroup = FormGroup<EtudiantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EtudiantFormService {
  createEtudiantFormGroup(etudiant: EtudiantFormGroupInput = { id: null }): EtudiantFormGroup {
    const etudiantRawValue = {
      ...this.getFormDefaults(),
      ...etudiant,
    };
    return new FormGroup<EtudiantFormGroupContent>({
      id: new FormControl(
        { value: etudiantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codeEtudiant: new FormControl(etudiantRawValue.codeEtudiant, {
        validators: [Validators.required],
      }),
      telephone: new FormControl(etudiantRawValue.telephone),
      emailPersonnel: new FormControl(etudiantRawValue.emailPersonnel),
      adresse: new FormControl(etudiantRawValue.adresse),
      sexe: new FormControl(etudiantRawValue.sexe),
      dateNaissance: new FormControl(etudiantRawValue.dateNaissance),
      user: new FormControl(etudiantRawValue.user),
    });
  }

  getEtudiant(form: EtudiantFormGroup): IEtudiant | NewEtudiant {
    return form.getRawValue() as IEtudiant | NewEtudiant;
  }

  resetForm(form: EtudiantFormGroup, etudiant: EtudiantFormGroupInput): void {
    const etudiantRawValue = { ...this.getFormDefaults(), ...etudiant };
    form.reset(
      {
        ...etudiantRawValue,
        id: { value: etudiantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EtudiantFormDefaults {
    return {
      id: null,
    };
  }
}
