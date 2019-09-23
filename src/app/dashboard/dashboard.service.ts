import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summation, SummationHistory } from './dashboard.interface';

@Injectable({
    providedIn: 'root',
  })
export class SummationService {
    private baseUrl: string = 'http://localhost:49390/api';
    constructor(private http: HttpClient) {
    }
    SumAndSave(summation: Summation): Observable<HttpResponse<any>> {
        const sumUrl: string = `${this.baseUrl}/calculate/sum`;
        return this.http.post(sumUrl, summation, { observe: 'response', responseType: 'text' });
    }
    GetSummationResult() : Observable<SummationHistory[]> {
      const sumResultUrl: string = `${this.baseUrl}/calculate/summation-result`;
      return this.http.get<SummationHistory[]>(sumResultUrl);
    }
}