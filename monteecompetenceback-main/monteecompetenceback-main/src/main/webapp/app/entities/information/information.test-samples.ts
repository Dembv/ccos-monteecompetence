import { IInformation, NewInformation } from './information.model';

export const sampleWithRequiredData: IInformation = {
  id: 9352,
};

export const sampleWithPartialData: IInformation = {
  id: 18324,
  titre: 'super rejeter sans',
  contenu: 'écraser spécialiste',
};

export const sampleWithFullData: IInformation = {
  id: 209,
  titre: 'convaincre bè dans la mesure où',
  imageInfos: '../fake-data/blob/hipster.png',
  imageInfosContentType: 'unknown',
  contenu: 'bouger touriste',
};

export const sampleWithNewData: NewInformation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
