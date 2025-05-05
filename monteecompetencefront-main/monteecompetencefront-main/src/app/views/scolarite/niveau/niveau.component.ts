import { Component } from '@angular/core';
import { NiveauModel } from '../../../shared/models/niveau.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NiveauService } from '../../../core/services/niveau.service';
import { ScolariteSidebarComponent } from "../../../shared/components/scolarite-sidebar/scolarite-sidebar.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // si tu utilises Bootstrap 5 avec Angular
declare var bootstrap: any;


@Component({
  selector: 'app-niveau',
  standalone: true,
  imports: [ScolariteSidebarComponent, CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './niveau.component.html',
  styleUrl: './niveau.component.css'
})
export class NiveauComponent {
  niveaux: NiveauModel[] = []; // Tableau contenant la liste des niveaux récupérés
  niveauForm: FormGroup;          // Groupe de contrôle pour le formulaire de création/modification
  selectedNiveau: NiveauModel | null = null; // niveau actuellement sélectionné (en modification)
  niveauToDelete: number = 0

  constructor(
    private formBuilder: FormBuilder,             // Constructeur de formulaire
    private niveauService: NiveauService    // Service injecté pour appeler les méthodes API
  ) {
    // Initialisation du formulaire avec des champs et des validateurs
    this.niveauForm = this.formBuilder.group({
      id: [null], // Utilisé en mode édition uniquement
      codeNiveau: ['', [Validators.required, Validators.minLength(2)]], // Code obligatoire, min. 3 caractères
      libelle: ['', [Validators.minLength(5)]] // Libellé optionnel, mais min. 10 caractères si rempli
    });
  }

    // Méthode appelée lors de l'initialisation du composant
    ngOnInit(): void {
      this.loadNiveaux(); // Chargement de la liste des niveaux au démarrage
    }

    // Récupère toutes les niveaux via le service
    loadNiveaux(): void {
      this.niveauService.getNiveaux().subscribe(data => {
        this.niveaux = data; // Met à jour la liste affichée
      });
    }

    // Méthode appelée lors de la soumission du formulaire
    onSubmit(): void {
      if (this.niveauForm.valid) { // Vérifie que le formulaire est valide
        const niveau: NiveauModel = this.niveauForm.value;

        if (niveau.id) {
          // Si un ID est présent, c'est une mise à jour
          this.niveauService.updateNiveau(niveau).subscribe(() => {
            this.loadNiveaux(); // Recharger la liste après modification
            this.resetForm();      // Réinitialiser le formulaire
          });
        } else {
          // Sinon, c’est une création
          this.niveauService.addNiveau(niveau).subscribe(() => {
            this.loadNiveaux(); // Recharger la liste après ajout
            this.resetForm();      // Réinitialiser le formulaire
          });
        }
      }
    }

    // Vide le formulaire et annule le mode édition
    resetForm(): void {
      this.niveauForm.reset();
      this.selectedNiveau = null;
    }

    // Pré-remplit le formulaire avec un niveau existante pour la modification
    onEdit(niveau: NiveauModel): void {
      this.selectedNiveau = niveau;
      this.niveauForm.patchValue(niveau); // Remplit les champs du formulaire
    }

    // Supprime un niveau par son ID
    onDelete(id: any): void {
      this.niveauToDelete = id;
      const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
      deleteModal.show();
    }
    confirmDelete() {
      if (this.niveauToDelete !== 0) {
        // Appel à ton service ou logique de suppression ici
        this.niveauService.deleteNiveau(this.niveauToDelete).subscribe(() => {
          this.loadNiveaux(); // Recharger la liste après suppression
        });
        this.niveauToDelete = 0;
      }

      const deleteModalEl = document.getElementById('deleteModal');
      if (deleteModalEl) {
        const modalInstance = bootstrap.Modal.getInstance(deleteModalEl);
        modalInstance?.hide();
      }
    }
}
