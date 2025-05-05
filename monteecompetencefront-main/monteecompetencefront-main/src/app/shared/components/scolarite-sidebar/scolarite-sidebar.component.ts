import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-scolarite-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './scolarite-sidebar.component.html',
  styleUrl: './scolarite-sidebar.component.css'
})
export class ScolariteSidebarComponent {
  isSidebarVisible = false;

  toggleSidebar(event: MouseEvent): void {
    event.stopPropagation();
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  closeSidebar(): void {
    if (window.innerWidth <= 767) {
      this.isSidebarVisible = false;
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (window.innerWidth <= 768) {
      this.isSidebarVisible = false;
    }
  }

  @HostListener('click', ['$event'])
  onSidebarClick(event: MouseEvent): void {
    event.stopPropagation(); // Empêche la fermeture en cliquant dedans
  }
}
