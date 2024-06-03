import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardModule, MatCardTitle } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FailedAuthComponent } from './failed-auth/failed-auth.component';
import { UserLogin } from '../../commons/model/auth/user-login.model';
import { LoginService } from '../../commons/services/auth/login-service/login.service';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatError, MatFormField, MatInput, MatInputModule, MatLabel, MatSuffix} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {MatButton, MatButtonModule} from "@angular/material/button";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    NgIf,
    MatError,
    MatButton,
    MatCardFooter,
    MatProgressBar,
    MatSlideToggleModule
  ],
})
export class LoginComponent implements OnInit {

hide: boolean = true;
loginForm!: FormGroup;
user!: UserLogin;
error: boolean = false;
isLoading: boolean = false;
matcher = new MyErrorStateMatcher();

constructor(
  private router: Router,
  private loginService: LoginService,
  private dialog: MatDialog,
) {

}

ngOnInit(): void {
  this.initLoginForm();
}

initLoginForm() {
  this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
}

submit() {
  this.isLoading = true;

  if (this.loginForm.valid) {
    this.user = this.loginForm.value;
    this.loginService.login(this.user).subscribe(
      (data: boolean) => {

        this.isLoading = false;

        if (data) {
          this.router.navigate(['/appointments']);
        }
        else {
          this.error = true;
          this.dialog.open(FailedAuthComponent);
        }
      }
    );
  }
}
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
  const isSubmitted = form && form.submitted;
  return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
}
}
