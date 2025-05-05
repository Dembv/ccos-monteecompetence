import { INiveau, NewNiveau } from './niveau.model';

export const sampleWithRequiredData: INiveau = {
  id: 14557,
  codeNiveau: 'chef de cuisine diplomate',
};

export const sampleWithPartialData: INiveau = {
  id: 17410,
  codeNiveau: 'tranquille',
};

export const sampleWithFullData: INiveau = {
  id: 17048,
  codeNiveau: 'tantôt assigner en face de',
  libelle: 'à demi',
};

export const sampleWithNewData: NewNiveau = {
  codeNiveau: 'auprès de tchou tchouu',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
