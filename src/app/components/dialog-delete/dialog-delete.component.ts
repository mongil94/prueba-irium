import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  templateUrl: 'dialog-delete.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
  ],
})
export class DialogDeleteComponent {
  constructor(private _dialogRef: MatDialogRef<DialogDeleteComponent>) {}

  public onNoClick(): void {
    this._dialogRef.close(false);
  }
  public onYesClick(): void {
    this._dialogRef.close(true);
  }
}
