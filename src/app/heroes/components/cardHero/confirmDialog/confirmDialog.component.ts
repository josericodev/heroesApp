import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>¿Está seguro?</h2>
    <mat-dialog-content>
      <p>Este proceso no es reversible, está a punto de elimar a <strong>{{ data.superhero }}</strong></p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <span class="spacer"></span>
      <button mat-button color="primary" (click)="onConfirm()">Delete</button>
    </mat-dialog-actions>
`,
  styleUrl: './confirmDialog.component.css',
})
export class ConfirmDialogComponent {
  constructor (
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  public onNoClick (): void {
    this.dialogRef.close(false);
  }

  public onConfirm (): void {
    this.dialogRef.close(true);
  }
}
