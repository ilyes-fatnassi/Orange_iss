import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Like {
  id: string;
  offerId: string;
  candidateId: string;
  createdAt: string;
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
export class LikesService {
  private apiUrl = `${environment.apiUrl}/likes`;
  private likedOfferIdsSubject = new BehaviorSubject<Set<string>>(new Set());
  public likedOfferIds$ = this.likedOfferIdsSubject.asObservable();

  constructor(private http: HttpClient) {}

  like(offerId: string): Observable<Like> {
    return this.http.post<Like>(`${this.apiUrl}/offers/${offerId}`, {}).pipe(
      tap(() => {
        const set = new Set(this.likedOfferIdsSubject.value);
        set.add(offerId);
        this.likedOfferIdsSubject.next(set);
      })
    );
  }

  unlike(offerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/offers/${offerId}`).pipe(
      tap(() => {
        const set = new Set(this.likedOfferIdsSubject.value);
        set.delete(offerId);
        this.likedOfferIdsSubject.next(set);
      })
    );
  }

  getMyLikes(): Observable<Like[]> {
    return this.http.get<Like[]>(this.apiUrl).pipe(
      tap(likes => {
        const ids = new Set(likes.map(l => l.offerId));
        this.likedOfferIdsSubject.next(ids);
      })
    );
  }

  isLiked(offerId: string): boolean {
    return this.likedOfferIdsSubject.value.has(offerId);
  }
}
