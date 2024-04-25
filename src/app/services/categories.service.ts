import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { RequestHeader } from '../components/utils/RequestHeader';
import { Categorie } from '../../model/categorie';


@Injectable({
  providedIn: 'root'
})
export class categoriesService {

  protected readonly apiUrl: string = 'https://localhost:7074/api/Categorias';
  protected httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  protected token: string | null  | undefined;

  constructor(private http: HttpClient, private requestHeader: RequestHeader) {
  }


  public getCategories(): Observable<Categorie[]>{
    var header = this.requestHeader.generateHeader();
    return this.http.post<Categorie[]>(this.apiUrl,  header)
    .pipe(
      tap((Categoria => console.log("leu as categorias"))),
      catchError(this._handleError('getCategorias', []))
    );
  }

  private _handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return result as Observable<T>;
    }
  }
}
