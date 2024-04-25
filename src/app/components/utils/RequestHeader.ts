import { HttpClient, HttpHeaders } from '@angular/common/http';

export class RequestHeader{

  protected token: string | null | undefined;
  protected httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor() {
    if(!this.token){
      this.token = localStorage.getItem('token');
    }
  }

  public generateHeader(){
    this.token = localStorage.getItem('token');
    var options = this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json',
  })}
  return options;
  };
}
