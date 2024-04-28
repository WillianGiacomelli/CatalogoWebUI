import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { RequestHeader } from '../components/utils/RequestHeader';
import { Categorie } from '../../model/categorie';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements OnInit {
  protected readonly apiUrl: string = 'https://localhost:7074/api/Categorias';
  protected header!: object;

  constructor(private http: HttpClient, private requestHeader: RequestHeader) {
    this.header = this.requestHeader.generateHeader();
  }

  ngOnInit(): void {
    console.log(this.header);
  }

  public getCategories(): Observable<Categorie[]> {
    const headers = this.requestHeader.generateHeader();
    const url = `${this.apiUrl}/list`;
    return this.http
      .get<Categorie[]>(url, { headers: headers })
      .pipe(catchError(this._handleError<Categorie[]>('GetCategorie')));
  }

  public addCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, categorie, this.header).pipe(
      tap((categorie: Categorie) =>
        console.log(
          `Categoria com  w/ id=${categorie.id} adicionada com sucesso`
        )
      ),
      catchError(this._handleError<Categorie>('AddCategorie'))
    );
  }

  public UpdateCategorie(
    id: number,
    categorie: Categorie
  ): Observable<Categorie> {
    var header = this.requestHeader.generateHeader();
    var url = `${this.apiUrl}/${id}`;
    return this.http.put<Categorie>(url, categorie, this.header).pipe(
      tap((categorie: Categorie) =>
        console.log(
          `Categoria com  w/ id=${categorie.id} atualizada com sucesso`
        )
      ),
      catchError(this._handleError<Categorie>('UpdateCategorie'))
    );
  }

  public DeleteCategorie(id: number): Observable<Categorie> {
    var header = this.requestHeader.generateHeader();
    var url = `${this.apiUrl}/${id}`;
    return this.http.delete<Categorie>(url, this.header).pipe(
      tap((categorie: Categorie) =>
        console.log(`Categoria com  w/ id=${categorie.id} deletada com sucesso`)
      ),
      catchError(this._handleError<Categorie>('DeleteCategorie'))
    );
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return result as Observable<T>;
    };
  }
}
