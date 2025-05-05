import { IFormation, NewFormation } from './formation.model';

export const sampleWithRequiredData: IFormation = {
  id: 14018,
  codeFormation: 'dans la mesure où',
};

export const sampleWithPartialData: IFormation = {
  id: 28469,
  codeFormation: 'ha ha afin que derrière',
  libelleFormation: 'membre de l’équipe proche de',
};

export const sampleWithFullData: IFormation = {
  id: 8477,
  codeFormation: 'impressionner prononcer',
  libelleFormation: 'adorable',
};

export const sampleWithNewData: NewFormation = {
  codeFormation: 'lorsque raccrocher',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
