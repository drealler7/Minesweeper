import { FormControl, FormGroup } from "@angular/forms";

export type GridSizeFormType = {
  rows: FormControl<number>,
  cols: FormControl<number>
};

export type MineBoardOptionsFormType = {
  mineCount: FormControl<number>,
  gridSize: FormGroup<GridSizeFormType>
}


