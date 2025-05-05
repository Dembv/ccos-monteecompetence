import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InformationModel } from '../../../shared/models/information.model';
import { InformationService } from '../../../core/services/information.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  informations: InformationModel[] = [];

  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
    this.loadInformations();
  }

  loadInformations(): void {
    this.informationService.getInformations().subscribe(data => {
      this.informations = data;
    });

    console.log(this.informations);
  }
}
