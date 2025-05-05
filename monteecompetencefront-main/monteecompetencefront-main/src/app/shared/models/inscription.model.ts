import { AnneeAcademiqueModel } from "./annee-academique.model";
import { EtudiantModel } from "./etudiant.model";
import { FormationModel } from "./formation.model";
import { NiveauModel } from "./niveau.model";

export interface InscriptionModel {
  id?: number,
  dateInscription: Date,
  etudiant: EtudiantModel,
  niveau: NiveauModel,
  anneeAcademique: AnneeAcademiqueModel,
  formation: FormationModel
}
