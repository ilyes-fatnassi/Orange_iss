import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Topic {
  id: string;
  name: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
  createdAt: string;
  updatedAt: string;
  department?: { id: string; name: string };
  topics: Topic[];
  createdBy?: { id: string; firstName: string; lastName: string; email: string };
  applicantCount?: number;
}

export interface CreateOfferDto {
  title: string;
  description: string;
  topicIds: string[];
}

export interface UpdateOfferDto {
  title?: string;
  description?: string;
  topicIds?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private apiUrl = `${environment.apiUrl}/offers`;

  constructor(private http: HttpClient) {}

  /** Public — no auth needed (landing page) */
  getPublicOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/public`);
  }

  /** Authenticated — role-filtered */
  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }

  getOffer(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/${id}`);
  }

  createOffer(dto: CreateOfferDto): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, dto);
  }

  updateOffer(id: string, dto: UpdateOfferDto): Observable<Offer> {
    return this.http.patch<Offer>(`${this.apiUrl}/${id}`, dto);
  }

  approveOffer(id: string): Observable<Offer> {
    return this.http.patch<Offer>(`${this.apiUrl}/${id}/approve`, {});
  }

  declineOffer(id: string): Observable<Offer> {
    return this.http.patch<Offer>(`${this.apiUrl}/${id}/decline`, {});
  }
}
