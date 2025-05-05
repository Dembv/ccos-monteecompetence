import dayjs from 'dayjs/esm';

import { IEtudiant, NewEtudiant } from './etudiant.model';

export const sampleWithRequiredData: IEtudiant = {
  id: 9671,
  codeEtudiant: 'traverser',
};

export const sampleWithPartialData: IEtudiant = {
  id: 26272,
  codeEtudiant: 'dès que',
  telephone: '0409402831',
  emailPersonnel: 'quoique',
  adresse: 'afin que chez tant',
  sexe: 'M',
};

export const sampleWithFullData: IEtudiant = {
  id: 13145,
  codeEtudiant: 'patientèle',
  telephone: '+33 781376809',
  emailPersonnel: 'vouh',
  adresse: 'ouille multiple',
  sexe: 'M',
  dateNaissance: dayjs('2025-04-24'),
};

export const sampleWithNewData: NewEtudiant = {
  codeEtudiant: 'triangulaire sitôt',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
