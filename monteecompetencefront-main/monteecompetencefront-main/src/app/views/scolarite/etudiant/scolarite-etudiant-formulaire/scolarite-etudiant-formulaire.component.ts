import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EtudiantModel } from '../../../../shared/models/etudiant.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scolarite-etudiant-formulaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './scolarite-etudiant-formulaire.component.html',
  styleUrl: './scolarite-etudiant-formulaire.component.css'
})
export class ScolariteEtudiantFormulaireComponent {


  constructor(private fb: FormBuilder) {
  }


}
