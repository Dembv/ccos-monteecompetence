// modal.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-modal',
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="visible" (click)="closeModal()"></div>
    <div class="modal" *ngIf="visible">
      <div class="modal-content">
        <ng-content></ng-content>
        <button class="close-btn" (click)="closeModal()">×</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
    .modal {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: white; padding: 1rem; border-radius: 8px;
      z-index: 1001; min-width: 300px;
    }
    .close-btn {
      position: absolute; top: 5px; right: 10px;
      border: none; background: transparent;
      font-size: 1.5rem; cursor: pointer;
    }
  `]
})
export class ModalComponent {
  visible = false;

  openModal(): void {
    this.visible = true;
  }

  closeModal(): void {
    this.visible = false;
  }
}
