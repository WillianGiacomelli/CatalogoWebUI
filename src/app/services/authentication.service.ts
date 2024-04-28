import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  protected readonly apiUrl: string = 'https://localhost:7074/api/Autoriza';
  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  protected token?: string;

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<User> {
    var url = `${this.apiUrl}/login`;
    return this.http.post<User>(url, user, this.httpOptions).pipe(
      tap((response: User) => {
        localStorage.setItem('token', response.token!);
      }),
      catchError(this._handleError<User>('login'))
    );
  }

  public create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, this.httpOptions).pipe(
      tap((response: User) => {
        localStorage.setItem('token', response.token!);
      }),
      catchError(this._handleError<User>('loginCreate'))
    );
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return result as Observable<T>;
    };
  }
}
