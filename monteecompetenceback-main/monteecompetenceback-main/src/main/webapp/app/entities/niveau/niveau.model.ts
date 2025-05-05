import { IInscription } from 'app/entities/inscription/inscription.model';

export interface INiveau {
  id: number;
  codeNiveau?: string | null;
  libelle?: string | null;
  inscriptions?: Pick<IInscription, 'id'>[] | null;
}

export type NewNiveau = Omit<INiveau, 'id'> & { id: null };
