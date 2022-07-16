import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  baseUrlEndpoint = environment.baseServiceUrl;
  constructor(private httpClient: HttpClient) { }

  getAllConsultores(): Observable<any> {
    return this.httpClient.get(this.baseUrlEndpoint + "consultoresAll");
  }
}
