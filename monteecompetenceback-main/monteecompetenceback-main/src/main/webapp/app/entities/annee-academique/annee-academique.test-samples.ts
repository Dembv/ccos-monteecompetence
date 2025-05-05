import { IAnneeAcademique, NewAnneeAcademique } from './annee-academique.model';

export const sampleWithRequiredData: IAnneeAcademique = {
  id: 14357,
  annee: 'honorer',
};

export const sampleWithPartialData: IAnneeAcademique = {
  id: 31140,
  annee: 'causer maigre sans que',
};

export const sampleWithFullData: IAnneeAcademique = {
  id: 25349,
  annee: 'adapter déshabiller',
};

export const sampleWithNewData: NewAnneeAcademique = {
  annee: 'de peur de éclairer maigre',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
