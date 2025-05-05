import { Component } from '@angular/core';
import { InformationModel } from '../../../shared/models/information.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InformationService } from '../../../core/services/information.service';
import { ScolariteSidebarComponent } from "../../../shared/components/scolarite-sidebar/scolarite-sidebar.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // si tu utilises Bootstrap 5 avec Angular
declare var bootstrap: any;

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [ScolariteSidebarComponent, HeaderComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {
  informations : InformationModel[] = []
  informationForm : FormGroup
  selectedInformation : InformationModel | null = null
  base64String : string = ''
  fileType : string = ''
  informationToDelete: number = 0

  constructor(private formBuilder : FormBuilder,private informationService : InformationService){
    this.informationForm = this.formBuilder.group({
      id : [null],
      titre : ['',[Validators.required,Validators.minLength(3)]],
      contenu : ['',[Validators.minLength(50)]],
      photo : [null,[Validators.required]]
    })
  }
  ngOnInit(): void {
    this.loadInformations(); // Chargement de la liste des informations au démarrage
  }
  loadInformations() : void{
    this.informationService.getInformations().subscribe(data => this.informations = data)
  }
  onSubmit() : void{
    if(this.informationForm.valid){
      const information : InformationModel = this.informationForm.value
      if(information.id){
        console.log(information)
        information.imageInfos = this.base64String
        information.imageInfosContentType = this.fileType
        this.informationService.updateInformation(information).subscribe(()=>{
          this.loadInformations()
        })
        this.resetForm()
      }
      else{
        information.imageInfos = this.base64String
        information.imageInfosContentType = this.fileType
        this.informationService.addInformation(information).subscribe(() => {
          this.loadInformations()
          this.resetForm()
        })
      }
    }
  }
  resetForm(): void {
    this.informationForm.reset();
    this.selectedInformation = null;
    this.base64String  = ''
    this.fileType  = ''
  }
  onEdit(information: InformationModel): void {
    this.base64String = information.imageInfos
    this.fileType = information.imageInfosContentType
    this.informationForm.get('photo')?.clearValidators();
    this.informationForm.get('photo')?.updateValueAndValidity();
    this.selectedInformation = information;
    this.informationForm.patchValue({
      id : information.id,
      titre : information.titre,
      contenu : information.contenu,
    });
    console.log(this.informationForm.value)
  }

  onDelete(id: any): void {
    this.informationToDelete = id;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  }
    // Confirme la suppression
    confirmDelete() {
      if (this.informationToDelete !== 0) {
        // Appel à ton service ou logique de suppression ici
        this.informationService.deleteInformation(this.informationToDelete).subscribe(() => {
          this.loadInformations(); // Recharger la liste après suppression
        });
        this.informationToDelete = 0;
      }

      const deleteModalEl = document.getElementById('deleteModal');
      if (deleteModalEl) {
        const modalInstance = bootstrap.Modal.getInstance(deleteModalEl);
        modalInstance?.hide();
      }
    }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.fileType = file.type;
    const reader = new FileReader();
    reader.onload = () => {
      this.base64String = (reader.result as string).split(',')[1];
    };
    reader.readAsDataURL(file);
  }
}
