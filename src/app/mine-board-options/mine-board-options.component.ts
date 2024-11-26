import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GridSizeFormType, MineBoardOptionsFormType } from './mine-board-options-form';
import { MineBoardOptionsService } from './mine-board-options.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import { DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-mine-board-options',
  templateUrl: './mine-board-options.component.html',
  styleUrl: './mine-board-options.component.scss',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class MineBoardOptionsComponent {
  private readonly service = inject(MineBoardOptionsService);
  readonly dialog = inject(DialogRef);

  optionsForm = this.initializeForm();

  save() {
    if (this.optionsForm.valid) {
      this.service.options = {
        gridSize: {
          cols: this.optionsForm.controls.gridSize.controls.cols.value,
          rows: this.optionsForm.controls.gridSize.controls.rows.value
        },
        mineCount: this.optionsForm.controls.mineCount.value
      };
      this.dialog.close(true);
    }
  }

  private initializeForm(): FormGroup<MineBoardOptionsFormType> {
    return new FormGroup<MineBoardOptionsFormType>({
      gridSize: new FormGroup<GridSizeFormType>({
        rows: new FormControl<number>(this.service.options.gridSize.rows, { nonNullable: true, validators: [Validators.required, Validators.min(5), Validators.max(10)] }),
        cols: new FormControl<number>(this.service.options.gridSize.cols, { nonNullable: true, validators: [Validators.required, Validators.min(5), Validators.max(10)] })
      }),
      mineCount: new FormControl<number>(this.service.options.mineCount, { nonNullable: true, validators: [Validators.required, Validators.min(1)] })
    });
  }

}
