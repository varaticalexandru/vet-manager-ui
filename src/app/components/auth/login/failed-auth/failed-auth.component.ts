import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-failed-auth',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './failed-auth.component.html',
  styleUrl: './failed-auth.component.scss'
})
export class FailedAuthComponent {

}
