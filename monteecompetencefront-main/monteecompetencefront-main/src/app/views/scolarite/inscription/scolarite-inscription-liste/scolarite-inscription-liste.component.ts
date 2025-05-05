import { Component } from '@angular/core';
import { InscriptionModel } from '../../../../shared/models/inscription.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { ScolariteSidebarComponent } from "../../../../shared/components/scolarite-sidebar/scolarite-sidebar.component";
import { HeaderComponent } from "../../../../shared/components/header/header.component"; // si tu utilises Bootstrap 5 avec Angular
import { CommonModule } from '@angular/common';
import { FormationModel } from '../../../../shared/models/formation.model';
import { AnneeAcademiqueModel } from '../../../../shared/models/annee-academique.model';
import { NiveauModel } from '../../../../shared/models/niveau.model';
import { EtudiantModel } from '../../../../shared/models/etudiant.model';
import { FormationService } from '../../../../core/services/formation.service';
import { AnneeAcademiqueService } from '../../../../core/services/annee-academique.service';
import { NiveauService } from '../../../../core/services/niveau.service';
import { EtudiantService } from '../../../../core/services/etudiant.service';
import { InformationService } from '../../../../core/services/information.service';

declare var bootstrap: any;
@Component({
  selector: 'app-scolarite-inscription-liste',
  standalone: true,
  imports: [ScolariteSidebarComponent, HeaderComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './scolarite-inscription-liste.component.html',
  styleUrl: './scolarite-inscription-liste.component.css'
})
export class ScolariteInscriptionListeComponent {


    inscriptions: InscriptionModel[] = [];
    formations : FormationModel[] = []
    annees : AnneeAcademiqueModel[] = []
    niveaux : NiveauModel[] = []
    etudiants : EtudiantModel[] = []
    inscriptionsEtudiant : InscriptionModel[] = []
    inscriptionForm: FormGroup;
    selectedInscription: InscriptionModel | null = null;
    inscriptionToDelete: number = 0;

    inscriptionFormModal: any;
    inscriptionViewModal: any;
    inscriptionDeleteModal: any;

    /*
      dateInscription: Date,
      etudiant: EtudiantModel,
      niveau: NiveauModel,
      annee: AnneeAcademiqueModel,
      formation: FormationModel
    */

    constructor(
      private formBuilder: FormBuilder,
      private inscriptionService: InscriptionService,
      private anneeService : AnneeAcademiqueService,
      private niveauService : NiveauService,
      private etudiantService : EtudiantService,
      private formationService : FormationService,
    ) {

      this.inscriptionForm = this.formBuilder.group({
        id: [null],
        dateInscription : [null],
        etudiant: this.formBuilder.group({
          id:[null,[Validators.required]]
        }),
        niveau: this.formBuilder.group({
          id: [null,[Validators.required]]
        }),
        anneeAcademique : this.formBuilder.group({
          id : [null,[Validators.required]]
        }),
        formation : this.formBuilder.group({
          id: [null,[Validators.required]]
        })
      });

    }

    loadAnnees(){
      this.anneeService.getAnneeAcademiques().subscribe(data => this.annees = data)
    }
    loadFormations(){
      this.formationService.getFormations().subscribe(data => this.formations = data)
    }
    loadNiveaux(){
      this.niveauService.getNiveaux().subscribe(data => this.niveaux = data)
    }
    loadEtudiants(){
      this.etudiantService.getEtudiants().subscribe(data => {
        this.etudiants = data
      })
    }
    loadEtudiantInscriptions(id : any){
      this.inscriptionService.getEtudiantInscriptions(id).subscribe(data => this.inscriptionsEtudiant = data)
    }

    ngOnInit(): void {
      this.loadInscriptions();
    }

    ngAfterViewInit(): void {
      this.inscriptionFormModal = new bootstrap.Modal(document.getElementById('inscriptionFormModal'));
      this.inscriptionDeleteModal = new bootstrap.Modal(document.getElementById('inscriptionDeleteModal'));
      this.inscriptionViewModal = new bootstrap.Modal(document.getElementById('inscriptionViewModal'));
    }

    loadInscriptions(): void {
      this.inscriptionService.getInsctiptions().subscribe(data => {
        this.inscriptions = data;
      });
    }

    openInscriptionFormModal(inscription?: InscriptionModel): void {
      this.loadAnnees()
      this.loadEtudiants()
      this.loadFormations()
      this.loadNiveaux()

      this.resetForm();

      if (inscription) {
        this.selectedInscription = inscription;
        this.inscriptionForm.patchValue({
          id: inscription.id,
          etudiant: {
            id: inscription.etudiant.id,
            user : {
              id: inscription.etudiant.user.id,
            }
          },
          niveau: {
            id: inscription.niveau.id,
          },
          anneeAcademique : {
            id : inscription.anneeAcademique.id,
          },
          formation : {
            id: inscription.formation.id,
          }
        });
      }
      this.inscriptionFormModal.show();
    }

    openInscriptionViewModal(inscription: InscriptionModel): void {
      this.loadEtudiantInscriptions(inscription.etudiant.id)
      this.selectedInscription = inscription;
      this.inscriptionViewModal.show();
    }

    closeInscriptionFormModal(): void {
      this.resetForm();
      this.inscriptionFormModal.hide();
    }

    // Méthode appelée lors de la soumission du formulaire
    onSubmit(): void {
      if (this.inscriptionForm.valid) {
        const inscription: InscriptionModel = this.inscriptionForm.value;
        inscription.dateInscription = new Date()
        if (inscription.id) {
          this.inscriptionService.updateInscription(inscription).subscribe(() => {
            this.loadInscriptions();
          });
        } else {
          this.inscriptionService.addInscription(inscription).subscribe(() => {
            this.loadInscriptions();
          });
        }
        this.resetForm();
        this.closeInscriptionFormModal();
      }
    }

    // Vide le formulaire et annule le mode édition
    resetForm(): void {
      this.inscriptionForm.reset();
      this.selectedInscription = null;
    }

    closeEtudiantViewModal() {
      // this.etudiantViewModal.visible = false;
      // this.resetForm();
    }

    // Pré-remplit le formulaire avec un etudiant existant pour la modification
    onEdit(inscription: InscriptionModel): void {

      this.selectedInscription = inscription;
      this.inscriptionForm.patchValue({
        id: inscription.id,
        etudiant: {
          id: inscription.etudiant.id,
          user : {
            id: inscription.etudiant.user.id
          }
        },
        niveau: {
          id: inscription.niveau.id
        },
        anneeAcademique : {
          id : inscription.anneeAcademique.id
        },
        formation : {
          id: inscription.formation.id
        }
      });
    }

    // Supprime un etudiant par son ID
    onDelete(etudiantId: any): void {
      this.inscriptionToDelete = etudiantId;
      this.inscriptionDeleteModal.show();
    }

    confirmDelete() {
      if (this.inscriptionToDelete !=0) {
        this.inscriptionService.deleteInscription(this.inscriptionToDelete).subscribe(() => {
          this.loadInscriptions();
        });

        this.inscriptionToDelete = 0;
      }

      this.inscriptionDeleteModal.hide();
    }

}
