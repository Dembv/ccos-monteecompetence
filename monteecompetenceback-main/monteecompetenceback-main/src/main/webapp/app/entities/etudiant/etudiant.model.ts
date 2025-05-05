import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { IInscription } from 'app/entities/inscription/inscription.model';
import { Sexe } from 'app/entities/enumerations/sexe.model';

export interface IEtudiant {
  id: number;
  codeEtudiant?: string | null;
  telephone?: string | null;
  emailPersonnel?: string | null;
  adresse?: string | null;
  sexe?: keyof typeof Sexe | null;
  dateNaissance?: dayjs.Dayjs | null;
  user?: Pick<IUser, 'id'> | null;
  inscriptions?: Pick<IInscription, 'id'>[] | null;
}

export type NewEtudiant = Omit<IEtudiant, 'id'> & { id: null };
