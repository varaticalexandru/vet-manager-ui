import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-out-confirm',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './log-out-confirm.component.html',
  styleUrl: './log-out-confirm.component.scss'
})
export class LogOutConfirmComponent {

  constructor(
    private dialogRef: MatDialogRef<LogOutConfirmComponent>
  ) { }

  onLogoutClick(): void {
    this.dialogRef.close(true);
  }
  
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
