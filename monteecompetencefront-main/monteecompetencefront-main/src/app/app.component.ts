import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'monteecompetencefront';

  currentRoute = ''; // Route actuelle

  constructor(private router: Router) {
      // Abonnez-vous aux changements de route
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        this.currentRoute = event.url; // Stocke la route actuelle
      }
    });
  }
}
