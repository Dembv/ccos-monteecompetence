import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { ScolariteSidebarComponent } from '../scolarite-sidebar/scolarite-sidebar.component';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() sidebar!: ScolariteSidebarComponent;
  showUserDropdown = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  // toggleUserMenu(event: MouseEvent): void {
  //   event.stopPropagation();
  //   this.showUserDropdown = !this.showUserDropdown;
  // }

  // @HostListener('document:click')
  // closeMenus(): void {
  //   this.showUserDropdown = false;
  // }

  // onUserDropdownClick(event: MouseEvent): void {
  //   event.stopPropagation(); // Ne pas fermer si clic dans le menu
  // }

  isUserMenuOpen = false;

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
