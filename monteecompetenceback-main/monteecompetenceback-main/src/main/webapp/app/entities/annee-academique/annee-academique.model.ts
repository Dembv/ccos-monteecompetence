import { IInscription } from 'app/entities/inscription/inscription.model';

export interface IAnneeAcademique {
  id: number;
  annee?: string | null;
  inscriptions?: Pick<IInscription, 'id'>[] | null;
}

export type NewAnneeAcademique = Omit<IAnneeAcademique, 'id'> & { id: null };
