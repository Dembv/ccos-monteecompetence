import { UserModel } from "./user.model";

export interface EtudiantModel {
  id?: number,
  codeEtudiant?: string,
  telephone?: string,
  emailPersonnel?: string,
  adresse?: string,
  sexe?: string,
  dateNaissance?: Date,
  user: UserModel
}
