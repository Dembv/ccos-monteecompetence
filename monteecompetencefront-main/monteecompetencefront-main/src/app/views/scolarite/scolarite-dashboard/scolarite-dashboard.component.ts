import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { ScolariteSidebarComponent } from "../../../shared/components/scolarite-sidebar/scolarite-sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scolarite-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ScolariteSidebarComponent],
  templateUrl: './scolarite-dashboard.component.html',
  styleUrl: './scolarite-dashboard.component.css'
})
export class ScolariteDashboardComponent {

}
