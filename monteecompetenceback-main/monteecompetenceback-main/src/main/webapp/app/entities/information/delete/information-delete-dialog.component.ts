import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IInformation } from '../information.model';
import { InformationService } from '../service/information.service';

@Component({
  standalone: true,
  templateUrl: './information-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class InformationDeleteDialogComponent {
  information?: IInformation;

  constructor(
    protected informationService: InformationService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.informationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
