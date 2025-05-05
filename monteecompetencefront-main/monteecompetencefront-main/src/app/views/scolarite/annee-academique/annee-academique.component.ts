import { Component } from '@angular/core';
import { AnneeAcademiqueModel } from '../../../shared/models/annee-academique.model';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AnneeAcademiqueService } from '../../../core/services/annee-academique.service';
import { CommonModule } from '@angular/common';
import { ScolariteSidebarComponent } from "../../../shared/components/scolarite-sidebar/scolarite-sidebar.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // si tu utilises Bootstrap 5 avec Angular
declare var bootstrap: any;

@Component({
  selector: 'app-annee-academique',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScolariteSidebarComponent, HeaderComponent],
  templateUrl: './annee-academique.component.html',
  styleUrl: './annee-academique.component.css'
})
export class AnneeAcademiqueComponent {
  annees: AnneeAcademiqueModel[] = []; // Tableau contenant la liste des annees récupérés
  anneeForm: FormGroup;          // Groupe de contrôle pour le formulaire de création/modification
  selectedAnnee: AnneeAcademiqueModel | null = null; // annee actuellement sélectionné (en modification)
  anneeToDelete: number = 0

  constructor(
    private formBuilder: FormBuilder,             // Constructeur de formulaire
    private anneeService: AnneeAcademiqueService    // Service injecté pour appeler les méthodes API
  ) {
    // Initialisation du formulaire avec des champs et des validateurs
    this.anneeForm = this.formBuilder.group({
      id: [null], // Utilisé en mode édition uniquement
      annee: ['', [Validators.required, this.anneeAcademiqueValidator]], // Code obligatoire, regex doit etre respecté
    });
  }

    // Méthode appelée lors de l'initialisation du composant
    ngOnInit(): void {
      this.loadAnnees(); // Chargement de la liste des annees au démarrage
    }

    // Récupère toutes les annees via le service
    loadAnnees(): void {
      this.anneeService.getAnneeAcademiques().subscribe(data => {
        this.annees = data; // Met à jour la liste affichée
      });
    }

    // Méthode appelée lors de la soumission du formulaire
    onSubmit(): void {
      if (this.anneeForm.valid) { // Vérifie que le formulaire est valide
        const annee: AnneeAcademiqueModel = this.anneeForm.value;

        if (annee.id) {
          // Si un ID est présent, c'est une mise à jour
          this.anneeService.updateAnneeAcademique(annee).subscribe(() => {
            this.loadAnnees(); // Recharger la liste après modification
            this.resetForm();      // Réinitialiser le formulaire
          });
        } else {
          // Sinon, c’est une création
          this.anneeService.addAnneAcademique(annee).subscribe(() => {
            this.loadAnnees(); // Recharger la liste après ajout
            this.resetForm();      // Réinitialiser le formulaire
          });
        }
      }
    }

    // Vide le formulaire et annule le mode édition
    resetForm(): void {
      this.anneeForm.reset();
      this.selectedAnnee = null;
    }

    // Pré-remplit le formulaire avec une annee existante pour la modification
    onEdit(annee: AnneeAcademiqueModel): void {
      this.selectedAnnee = annee;
      this.anneeForm.patchValue(annee); // Remplit les champs du formulaire
    }

    // Supprime une annee par son ID
    onDelete(id: any): void {
      this.anneeToDelete = id;
      const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
      deleteModal.show();
    }

    confirmDelete() {
      if (this.anneeToDelete !== 0) {
        // Appel à ton service ou logique de suppression ici
        this.anneeService.deleteAnneeAcademique(this.anneeToDelete).subscribe(() => {
          this.loadAnnees(); // Recharger la liste après suppression
        });
        this.anneeToDelete = 0;
      }

      const deleteModalEl = document.getElementById('deleteModal');
      if (deleteModalEl) {
        const modalInstance = bootstrap.Modal.getInstance(deleteModalEl);
        modalInstance?.hide();
      }
    }

    anneeAcademiqueValidator(control: AbstractControl): ValidationErrors | null {
      const value: string = control.value;
      const regex = /^(\d{4})-(\d{4})$/;

      const match = regex.exec(value);
      if (!match) {
        return { invalidFormat: true };
      }

      const startYear = parseInt(match[1], 10);
      const endYear = parseInt(match[2], 10);

      if (endYear !== startYear + 1) {
        return { invalidRange: true };
      }

      return null;
    }
}
