import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { Observable, catchError, tap } from 'rxjs';
import { RequestHeader } from '../components/utils/RequestHeader';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  protected readonly apiUrl: string = 'https://localhost:7074/api/Autoriza';
  protected httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  protected token: string | null  | undefined;

  constructor(private http: HttpClient, requestHeader: RequestHeader) {
  }


  protected login$(usuario: User){
    return this.http.post<User>(this.apiUrl,  this.httpOptions)
    .pipe(
      tap((usuario: User) => localStorage.setItem('token', usuario.token!)),
      catchError(this._handleError('login', []))
    );
  }

  private _handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return result as Observable<T>;
    }
  }
}
