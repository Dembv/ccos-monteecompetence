import dayjs from 'dayjs/esm';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { INiveau } from 'app/entities/niveau/niveau.model';
import { IAnneeAcademique } from 'app/entities/annee-academique/annee-academique.model';
import { IFormation } from 'app/entities/formation/formation.model';

export interface IInscription {
  id: number;
  dateInscription?: dayjs.Dayjs | null;
  etudiant?: Pick<IEtudiant, 'id'> | null;
  niveau?: Pick<INiveau, 'id'> | null;
  anneeAcademique?: Pick<IAnneeAcademique, 'id'> | null;
  formation?: Pick<IFormation, 'id'> | null;
}

export type NewInscription = Omit<IInscription, 'id'> & { id: null };
