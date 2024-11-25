import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridSizeFormType, MineBoardOptionsFormType } from './mine-board-options-form';
import { MineBoardOptionsService } from './mine-board-options.service';

@Component({
  selector: 'app-mine-board-options',
  templateUrl: './mine-board-options.component.html',
  styleUrl: './mine-board-options.component.scss',
})
export class MineBoardOptionsComponent {
  private readonly service = inject(MineBoardOptionsService);

  optionsForm = this.initializeForm();

  save() {
    if (this.optionsForm.valid) {
      this.service.options = {
        gridSize: {
          cols: this.optionsForm.controls.gridSize.controls.cols.value,
          rows: this.optionsForm.controls.gridSize.controls.rows.value
        },
        mineCount: this.optionsForm.controls.mineCount.value
      }
    }
  }

  private initializeForm(): FormGroup<MineBoardOptionsFormType> {
    const service = inject(MineBoardOptionsService);
    return new FormGroup<MineBoardOptionsFormType>({
      gridSize: new FormGroup<GridSizeFormType>({
        rows: new FormControl<number>(service.options.gridSize.rows, { nonNullable: true, validators: [Validators.required, Validators.min(5), Validators.max(10)] }),
        cols: new FormControl<number>(service.options.gridSize.cols, { nonNullable: true, validators: [Validators.required, Validators.min(5), Validators.max(10)] })
      }),
      mineCount: new FormControl<number>(service.options.mineCount, { nonNullable: true,validators: [Validators.required, Validators.min(1)] })
    });
  }

}
