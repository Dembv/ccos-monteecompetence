// Importation des modules nécessaires
import { Component } from '@angular/core';
import { FormationModel } from '../../../shared/models/formation.model'; // Modèle de données Formation
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';   // Outils pour gérer les formulaires
import { FormationService } from '../../../core/services/formation.service'; // Service pour les opérations CRUD sur Formation
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScolariteSidebarComponent } from "../../../shared/components/scolarite-sidebar/scolarite-sidebar.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // si tu utilises Bootstrap 5 avec Angular

declare var bootstrap: any;

@Component({
  selector: 'app-formation',  // Nom du composant utilisé dans les templates
  standalone: true,           // Composant autonome (pas besoin d'être déclaré dans un module)
  imports: [CommonModule,
    HttpClientModule, ReactiveFormsModule, ScolariteSidebarComponent, HeaderComponent],                // Aucun module importé ici pour l’instant
  templateUrl: './formation.component.html', // Fichier HTML associé
  styleUrl: './formation.component.css'      // Fichier CSS associé
})
export class FormationComponent {
  formations: FormationModel[] = []; // Tableau contenant la liste des formations récupérées
  formationForm: FormGroup;          // Groupe de contrôle pour le formulaire de création/modification
  selectedFormation: FormationModel | null = null; // Formation actuellement sélectionnée (en modification)
  formationToDelete: number = 0;

  constructor(
    private formBuilder: FormBuilder,             // Constructeur de formulaire
    private formationService: FormationService    // Service injecté pour appeler les méthodes API
  ) {
    // Initialisation du formulaire avec des champs et des validateurs
    this.formationForm = this.formBuilder.group({
      id: [null], // Utilisé en mode édition uniquement
      codeFormation: ['', [Validators.required, Validators.minLength(3)]], // Code obligatoire, min. 3 caractères
      libelleFormation: ['', [Validators.minLength(5)]] // Libellé optionnel, mais min. 10 caractères si rempli
    });
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.loadFormations(); // Chargement de la liste des formations au démarrage
  }

  // Récupère toutes les formations via le service
  loadFormations(): void {
    this.formationService.getFormations().subscribe(data => {
      this.formations = data; // Met à jour la liste affichée
    });
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    if (this.formationForm.valid) { // Vérifie que le formulaire est valide
      const formation: FormationModel = this.formationForm.value;

      if (formation.id) {
        // Si un ID est présent, c'est une mise à jour
        this.formationService.updateFormation(formation).subscribe(() => {
          this.loadFormations(); // Recharger la liste après modification
          this.resetForm();      // Réinitialiser le formulaire
        });
      } else {
        // Sinon, c’est une création
        this.formationService.addFormation(formation).subscribe(() => {
          this.loadFormations(); // Recharger la liste après ajout
          this.resetForm();      // Réinitialiser le formulaire
        });
      }
    }
  }

  // Vide le formulaire et annule le mode édition
  resetForm(): void {
    this.formationForm.reset();
    this.selectedFormation = null;
  }

  // Pré-remplit le formulaire avec une formation existante pour la modification
  onEdit(formation: FormationModel): void {
    this.selectedFormation = formation;
    this.formationForm.patchValue(formation); // Remplit les champs du formulaire
  }

  // Supprime une formation par son ID
  onDelete(formationId: any): void {
    this.formationToDelete = formationId;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  }

  // Confirme la suppression
  confirmDelete() {
    if (this.formationToDelete !== 0) {
      // Appel à ton service ou logique de suppression ici
      this.formationService.deleteFormation(this.formationToDelete).subscribe(() => {
        this.loadFormations(); // Recharger la liste après suppression
      });
      this.formationToDelete = 0;
    }

    const deleteModalEl = document.getElementById('deleteModal');
    if (deleteModalEl) {
      const modalInstance = bootstrap.Modal.getInstance(deleteModalEl);
      modalInstance?.hide();
    }
  }
}
