import { IInscription } from 'app/entities/inscription/inscription.model';

export interface IFormation {
  id: number;
  codeFormation?: string | null;
  libelleFormation?: string | null;
  inscriptions?: Pick<IInscription, 'id'>[] | null;
}

export type NewFormation = Omit<IFormation, 'id'> & { id: null };
