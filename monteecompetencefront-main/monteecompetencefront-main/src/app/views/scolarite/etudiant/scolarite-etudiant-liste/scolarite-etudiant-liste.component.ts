import { Component, ElementRef, ViewChild } from '@angular/core';
import { EtudiantModel } from '../../../../shared/models/etudiant.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../../../../core/services/etudiant.service';
import { ScolariteSidebarComponent } from "../../../../shared/components/scolarite-sidebar/scolarite-sidebar.component";
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // si tu utilises Bootstrap 5 avec Angular
import { InscriptionModel } from '../../../../shared/models/inscription.model';
import { InscriptionService } from '../../../../core/services/inscription.service';

declare var bootstrap: any;

@Component({
  selector: 'app-scolarite-etudiant-liste',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ScolariteSidebarComponent,
    HeaderComponent
],
  templateUrl: './scolarite-etudiant-liste.component.html',
  styleUrl: './scolarite-etudiant-liste.component.css'
})
export class ScolariteEtudiantListeComponent {
  @ViewChild('etudiantFormModal') etudiantFormModalRef!: ElementRef;
  @ViewChild('etudiantDeleteModal') etudiantDeleteModalRef!: ElementRef;
  @ViewChild('etudiantViewModal') etudiantViewModalRef!: ElementRef;


  etudiants: EtudiantModel[] = [];
  inscriptionsEtudiant: InscriptionModel[] = [];

  etudiantForm: FormGroup;
  selectedEtudiant: EtudiantModel | null = null;
  etudiantToDelete: number = 0;

  etudiantFormModal: any;
  etudiantViewModal: any;
  etudiantDeleteModal: any;

  constructor(
    private formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
    private inscriptionService: InscriptionService
  ) {

    this.etudiantForm = this.formBuilder.group({
      id: [null],
      user: this.formBuilder.group({
        id: [null],
        firstName: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]],
        lastName: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]],
      }),
      codeEtudiant: ['', [
        Validators.required
      ]],
      dateNaissance: ['', [
        Validators.required
      ]],
      emailPersonnel: ['', [
        Validators.required,
        Validators.email
      ]],
      telephone: ['', [
        Validators.required,
        Validators.pattern(/^(\+?\d{1,3}[- ]?)?\d{8,14}$/)
      ]],
      adresse: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      sexe: ['', [
        Validators.required,
        Validators.pattern(/^(M|F)$/i)
      ]]
    });

  }

  ngOnInit(): void {
    this.loadEtudiants();
  }

  ngAfterViewInit(): void {
    this.etudiantFormModal = new bootstrap.Modal(document.getElementById('etudiantFormModal'));
    this.etudiantDeleteModal = new bootstrap.Modal(document.getElementById('etudiantDeleteModal'));
    this.etudiantViewModal = new bootstrap.Modal(document.getElementById('etudiantViewModal'));
  }

  loadEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe(data => {
      this.etudiants = data;
    });
  }

  loadInscriptionsEtudiant(id: any): void {
    this.inscriptionService.getEtudiantInscriptions(id).subscribe(data => {
      this.inscriptionsEtudiant = data;
    })
  }

  openEtudiantFormModal(etudiant?: EtudiantModel): void {
    this.resetForm();

    if (etudiant) {
      this.selectedEtudiant = etudiant;

      this.etudiantForm.patchValue({
        id: this.selectedEtudiant.id,
        user: {
          id: this.selectedEtudiant.user.id,
          firstName: this.selectedEtudiant.user.firstName,
          lastName: this.selectedEtudiant.user.lastName,
        },
        codeEtudiant: this.selectedEtudiant.codeEtudiant,
        dateNaissance: this.selectedEtudiant.dateNaissance,
        emailPersonnel: this.selectedEtudiant.emailPersonnel,
        telephone: this.selectedEtudiant.telephone,
        adresse: this.selectedEtudiant.adresse,
        sexe: this.selectedEtudiant.sexe
      });

    }

    this.etudiantFormModal.show();
  }

  openEtudiantViewModal(etudiant: EtudiantModel): void {
    this.selectedEtudiant = etudiant;
    this.loadInscriptionsEtudiant(this.selectedEtudiant.id);
    this.etudiantViewModal.show();
  }

  closeEtudiantFormModal(): void {
    this.resetForm();
    this.etudiantFormModal.hide();
  }

  closeEtudiantViewModal() {
    this.etudiantViewModal.hide();
  }

  // Supprime un etudiant par son ID
  onDelete(etudiantId: any): void {
    this.etudiantToDelete = etudiantId;
    this.etudiantDeleteModal.show();
  }

  confirmDelete() {
    if (this.etudiantToDelete !=0) {
      this.etudiantService.deleteEtudiant(this.etudiantToDelete).subscribe(() => {
        this.loadEtudiants();
      });

      this.etudiantToDelete = 0;
    }

    this.etudiantDeleteModal.hide();
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.etudiantForm.valid) {
      const etudiant: EtudiantModel = this.etudiantForm.value;
      // console.log(this.etudiantForm.value);

      if (etudiant.id) {
        // console.log(etudiant);
        console.log(this.etudiantForm.value);

        this.etudiantService.updateEtudiant(etudiant).subscribe(() => {
          this.loadEtudiants();
        });
      } else {
        this.etudiantService.addEtudiant(etudiant).subscribe(() => {
          this.loadEtudiants();
        });
      }

      this.resetForm();
      this.closeEtudiantFormModal();
    } else {

      console.warn('Erreurs de validation :', this.etudiantForm.errors);
      console.warn('État du formulaire :', this.etudiantForm);

      console.log("Validation échouée");
    }
  }

  // Vide le formulaire et annule le mode édition
  resetForm(): void {
    this.etudiantForm.reset();
    this.selectedEtudiant = null;
  }



  // Pré-remplit le formulaire avec un etudiant existant pour la modification
  onEdit(etudiant: EtudiantModel): void {
    this.selectedEtudiant = etudiant;
    this.etudiantForm.patchValue({
      id: this.selectedEtudiant.id,
      user: {
        id: this.selectedEtudiant.user.id,
        firstName: this.selectedEtudiant.user.firstName,
        lastName: this.selectedEtudiant.user.lastName,
      },
      codeEtudiant: this.selectedEtudiant.codeEtudiant,
      dateNaissance: this.selectedEtudiant.dateNaissance,
      emailPersonnel: this.selectedEtudiant.emailPersonnel,
      telephone: this.selectedEtudiant.telephone,
      adresse: this.selectedEtudiant.adresse,
      sexe: this.selectedEtudiant.sexe
    });
  }




}


