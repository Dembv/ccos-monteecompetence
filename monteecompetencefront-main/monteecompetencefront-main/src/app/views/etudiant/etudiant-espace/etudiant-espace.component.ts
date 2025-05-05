import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EtudiantModel } from '../../../shared/models/etudiant.model';
import { EtudiantService } from '../../../core/services/etudiant.service';
import { InscriptionService } from '../../../core/services/inscription.service';
import { InscriptionModel } from '../../../shared/models/inscription.model';
import { FormationService } from '../../../core/services/formation.service';
import { NiveauService } from '../../../core/services/niveau.service';
import { AnneeAcademiqueService } from '../../../core/services/annee-academique.service';
import { FormationModel } from '../../../shared/models/formation.model';
import { NiveauModel } from '../../../shared/models/niveau.model';
import { AnneeAcademiqueModel } from '../../../shared/models/annee-academique.model';
import { UserModel } from '../../../shared/models/user.model';
import { AccountService } from '../../../core/services/account.service';
import { first } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant-espace',
  standalone: true,
  imports: [
    ReactiveFormsModule,
      CommonModule,],
  templateUrl: './etudiant-espace.component.html',
  styleUrl: './etudiant-espace.component.css'
})
export class EtudiantEspaceComponent {

  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('btnSideBar') btnSideBar!: ElementRef;
  @ViewChild('disparaitre') disparaitre!: ElementRef;
  @ViewChild('disparaitre2') disparaitre2!: ElementRef;
  @ViewChild('liste') liste!: ElementRef;

  @ViewChildren('texteDisparaitre', { read: ElementRef }) textes!: QueryList<ElementRef>;
  @ViewChildren('imageReduit', { read: ElementRef }) images!: QueryList<ElementRef>;

  isSidebarVisible: any;
  etudiantForm: FormGroup;
  inscriptionForm: FormGroup;

  accountConnected: UserModel | null = null;

  etudiant: EtudiantModel | null = null;
  inscriptionsEtudiant: InscriptionModel[] =  [];

  selectedUser: number = -1;
  selectedInscription: InscriptionModel | null = null;

  formations: FormationModel[] = [];
  niveaux: NiveauModel[] = [];
  anneesAcademiques: AnneeAcademiqueModel[] = [];

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
    private inscriptionService: InscriptionService,
    private formationService: FormationService,
    private niveauService: NiveauService,
    private anneeAcademiqueService: AnneeAcademiqueService,
    private accountService: AccountService,
    private authService: AuthService
  ) {
    this.etudiantForm = this.formBuilder.group({
      id: [null, [
        Validators.required
      ]],
      user: this.formBuilder.group({
        id: [null, [
          Validators.required
        ]],
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

    this.inscriptionForm = this.formBuilder.group({
      id: [null],
      dateInscription : [null],
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

  ngOnInit() : void {
    this.getUserConnected();
  }

  loadEtudiant(id: any): void {
    this.etudiantService.getEtudiantByUser(id).subscribe(data => {
      this.etudiant = data;
      console.log('Mon étudiant' + this.etudiant);
      this.loadEtudiantFormValues(this.etudiant);
      this.loadInscriptionsEtudiant(this.etudiant.id);
      console.log(this.etudiant);
    });
  }

  loadInscriptionsEtudiant(id: any): void {
    this.inscriptionService.getEtudiantInscriptions(id).subscribe(data => {
      this.inscriptionsEtudiant = data;
    })
  }

  loadFormations(): void {
    this.formationService.getFormations().subscribe(data => {
      this.formations = data;
    })
  }

  loadNiveaux(): void {
    this.niveauService.getNiveaux().subscribe(data => {
      this.niveaux = data;
    })
  }

  loadAnneesAcademiques(): void {
    this.anneeAcademiqueService.getAnneeAcademiques().subscribe(data => {
      this.anneesAcademiques = data;
    })
  }

  getUserConnected(): void {
    this.accountService.getAccount().subscribe(data => {
      this.accountConnected = data;
      if (this.accountConnected?.id) {
        this.loadEtudiant(this.accountConnected.id);
      }
      console.log(this.etudiant);
      console.log(this.inscriptionsEtudiant);
    });
    console.log('Etudiant: ' + this.etudiant);
  }

  loadEtudiantFormValues(etudiant: EtudiantModel): void {
    this.etudiantForm.patchValue({
      id: etudiant.id,
      user: {
        id: etudiant.user.id,
        firstName: etudiant.user.firstName,
        lastName: etudiant.user.lastName,
      },
      codeEtudiant: etudiant.codeEtudiant,
      dateNaissance: etudiant.dateNaissance,
      emailPersonnel: etudiant.emailPersonnel,
      telephone: etudiant.telephone,
      adresse: etudiant.adresse,
      sexe: etudiant.sexe
    })
  }

  onSubmitEtudiantForm() {
    if (this.etudiantForm.valid) {
      const etudiant: EtudiantModel = this.etudiantForm.value;
      console.log(etudiant);

      if (etudiant.id) {
        this.etudiantService.updateEtudiant(etudiant).subscribe(data => {
          this.etudiant = data;
          this.loadEtudiantFormValues(this.etudiant);
        });
      } else {

      }
    } else {
      console.log('Form Invalide');
      console.log(this.inscriptionForm.value);
    }
  }

  onSubmitInscriptionForm() {
    if (this.inscriptionForm.valid) {
      const formValue = this.inscriptionForm.value;
      const inscription: InscriptionModel = {
        ...formValue,
        etudiant: { id: this.etudiant?.id! }, // on crée l'objet `etudiant`
        dateInscription: new Date()
      };
      console.log(inscription.etudiant.id);
      inscription.dateInscription = new Date();
      console.log(inscription);
      if (inscription.id) {
        this.inscriptionService.updateInscription(inscription).subscribe(() => {
          this.loadInscriptionsEtudiant(this.etudiant?.id);
        });
      } else {
        this.inscriptionService.addInscription(inscription).subscribe(() => {
          this.loadInscriptionsEtudiant(this.etudiant?.id);
        });
      }
      this.resetInscriptionForm();
    } else {
      console.log('Form Invalide');
      console.log(this.inscriptionForm.value);
    }
  }

  // Vide le formulaire et annule le mode édition
  resetInscriptionForm(): void {
    this.inscriptionForm.reset();
    this.selectedInscription = null;
  }

  // Pré-remplit le formulaire avec une formation existante pour la modification
  onInscrptionEdit(inscription: InscriptionModel): void {
    this.selectedInscription = inscription;
    this.inscriptionForm.patchValue({
      id: inscription.id,
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

  toggleSidebar() {
    this.sidebar.nativeElement.classList.toggle('collapsed');
    this.disparaitre.nativeElement.classList.toggle('enteteMobile');
    this.disparaitre2.nativeElement.classList.toggle('enteteMobile');
    this.liste.nativeElement.classList.toggle('text-end');

    const textes = document.querySelectorAll('.texteDisparaitre');
    textes.forEach((el) => el.classList.toggle('texteDisparaitre2'));

    const images = document.querySelectorAll('.imageReduit');
    images.forEach((el) => el.classList.toggle('imageReduit2'));

    const icones = document.querySelectorAll('.fas');
    icones.forEach((el) => el.classList.remove('pe-2'));
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
