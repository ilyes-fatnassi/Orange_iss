import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Application {
  id: string;
  offerId: string;
  candidateId: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
  offer?: {
    id: string;
    title: string;
    description: string;
    department?: { id: string; name: string };
    topics: { id: string; name: string }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private apiUrl = `${environment.apiUrl}/applications`;

  constructor(private http: HttpClient) {}

  apply(offerId: string): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/offers/${offerId}`, {});
  }

  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }
}
