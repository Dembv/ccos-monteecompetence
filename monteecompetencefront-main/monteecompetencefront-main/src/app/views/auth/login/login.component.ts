import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthModel } from '../../../shared/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authForm: FormGroup;
  errorMessage: string = '';
  jwtHelper: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.authForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-z]+\.[a-z-]+@ugb\.edu\.sn$/)
      ]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [true]
    });
  }

  ngOnInit(): void {

  }

  login() {
    if(this.authForm.valid) {
      const auth: AuthModel = this.authForm.value;

      this.authService.authenticate(auth).subscribe({
        next: (response: any) => {

          this.authService.saveToken(response.idToken, response.roles);
          console.log(response)

          this.loginSuccess();
        },
        error: () => {
          this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect';
          console.log(this.errorMessage);
        }
      });
    }
  }

  loginSuccess(): void {
    const roles = this.authService.getUserRoles();
    if (roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/scolarite']); // par exemple
    } else if (roles.includes('ROLE_USER')) {
      this.router.navigate(['/etudiant']);
    } else {
      this.router.navigate(['/']); // fallback
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
