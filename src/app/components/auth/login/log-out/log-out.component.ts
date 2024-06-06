import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.scss'
})
export class LogOutComponent {

}
