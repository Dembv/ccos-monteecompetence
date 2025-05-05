import dayjs from 'dayjs/esm';

import { IInscription, NewInscription } from './inscription.model';

export const sampleWithRequiredData: IInscription = {
  id: 4197,
};

export const sampleWithPartialData: IInscription = {
  id: 24998,
};

export const sampleWithFullData: IInscription = {
  id: 9183,
  dateInscription: dayjs('2025-04-24T08:17'),
};

export const sampleWithNewData: NewInscription = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
