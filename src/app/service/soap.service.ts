import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SoapService {
  public url = "http://localhost:3000/api"


  constructor(public http: HttpClient) { }

  getPromedio(params: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    let parameters = JSON.stringify(params);
    return this.http.post(this.url + "/promedio-tipo-cambio-rango", parameters, { headers });
  }

  getPromedios(): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get(this.url + "/promedios", { headers });

  }

}
