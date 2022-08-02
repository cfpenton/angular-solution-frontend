import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrlEndpoint = environment.baseServiceUrl;
  constructor(private httpClient: HttpClient) { }

  getConsultores(): Observable<any> {
    return this.httpClient.get(this.baseUrlEndpoint + "consultores");
  }

  getSalarios(): Observable<any> {
    return this.httpClient.get(this.baseUrlEndpoint + "salarios");
  }

  getRelatorioDoConsultor(consultor: string, monthStart: string, yearStart: string, monthEnd: string, yearEnd: string): Observable<any> {
    return this.httpClient.get(this.baseUrlEndpoint + "relatorio/" + consultor +"/"+ monthStart +"/"+ yearStart +"/"+ monthEnd +"/"+ yearEnd);
  }
}
