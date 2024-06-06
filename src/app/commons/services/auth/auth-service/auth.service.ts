import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, UserLogin } from '../../../model/user/user.model';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FailedAuthComponent } from '../../../../components/auth/login/failed-auth/failed-auth.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );
  public loggedInUserSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  loggedInuserId$ = this.loggedInUserSubject.asObservable();

  auth_url = `${environment.backend.auth_url}`;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  login(user: UserLogin) {
    this.http.post<AuthResponse>(this.auth_url, user).subscribe({
      next: (data: AuthResponse) => {
        console.log(data);
        
        localStorage.setItem('token', data.jwt);
        this.loggedIn.next(true);
        this.loggedInUserSubject.next(user.username);
        this.router.navigate(['/appointments']);
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
        this.dialog.open(FailedAuthComponent);
      },
    });
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
