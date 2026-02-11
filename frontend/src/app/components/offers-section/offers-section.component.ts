import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OffersService, Offer } from '../../services/offers.service';
import { LikesService } from '../../services/likes.service';
import { ApplicationsService } from '../../services/applications.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-offers-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="offers-section">
      <div class="container">
        <div class="section-header">
          <h2>Offres de stage disponibles</h2>
          <div class="underline"></div>
        </div>

        <div class="loading-state" *ngIf="loading">
          <p>Chargement des offres...</p>
        </div>

        <div class="empty-state" *ngIf="!loading && offers.length === 0">
          <p>Aucune offre disponible pour le moment. Revenez bientôt !</p>
        </div>

        <div class="offers-grid" *ngIf="!loading && offers.length > 0">
          <div class="offer-card" *ngFor="let offer of offers" (click)="openDetail(offer)">
            <div class="offer-card-top">
              <span class="offer-badge" *ngIf="offer.department">{{ offer.department.name }}</span>
              <button class="like-btn" *ngIf="isLoggedIn && isCandidate" [class.liked]="isLiked(offer.id)" (click)="toggleLike($event, offer.id)" title="Like">
                <svg width="20" height="20" viewBox="0 0 24 24" [attr.fill]="isLiked(offer.id) ? '#e53935' : 'none'" stroke="currentColor" stroke-width="2">
                  <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/>
                </svg>
              </button>
            </div>
            <h3>{{ offer.title }}</h3>
            <p class="offer-desc">{{ offer.description }}</p>
            <div class="offer-topics" *ngIf="offer.topics?.length">
              <span class="topic-tag" *ngFor="let topic of offer.topics">{{ topic.name }}</span>
            </div>
            <div class="offer-footer">
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"/>
                </svg>
                {{ offer.createdAt | date:'mediumDate' }}
              </span>
              <button class="apply-btn" *ngIf="isLoggedIn && isCandidate" [disabled]="hasApplied(offer.id)" (click)="applyToOffer($event, offer.id)">
                {{ hasApplied(offer.id) ? 'Applied ✓' : 'Apply' }}
              </button>
              <a routerLink="/login" class="apply-btn" *ngIf="!isLoggedIn" (click)="$event.stopPropagation()">Sign in to apply</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Modal -->
      <div class="modal-overlay" *ngIf="selectedOffer" (click)="closeDetail()">
        <div class="modal" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeDetail()">&times;</button>
          <span class="offer-badge modal-badge" *ngIf="selectedOffer.department">{{ selectedOffer.department.name }}</span>
          <h2>{{ selectedOffer.title }}</h2>
          <div class="modal-topics" *ngIf="selectedOffer.topics?.length">
            <span class="topic-tag" *ngFor="let topic of selectedOffer.topics">{{ topic.name }}</span>
          </div>
          <div class="modal-desc">{{ selectedOffer.description }}</div>
          <div class="modal-meta">
            <span *ngIf="selectedOffer.createdBy">Posted by: {{ selectedOffer.createdBy.firstName }} {{ selectedOffer.createdBy.lastName }}</span>
            <span>Date: {{ selectedOffer.createdAt | date:'longDate' }}</span>
          </div>
          <div class="modal-actions">
            <button class="like-btn-lg" *ngIf="isLoggedIn && isCandidate" [class.liked]="isLiked(selectedOffer.id)" (click)="toggleLike($event, selectedOffer.id)">
              <svg width="22" height="22" viewBox="0 0 24 24" [attr.fill]="isLiked(selectedOffer.id) ? '#e53935' : 'none'" stroke="currentColor" stroke-width="2">
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/>
              </svg>
              {{ isLiked(selectedOffer.id) ? 'Liked' : 'Like' }}
            </button>
            <button class="apply-btn-lg" *ngIf="isLoggedIn && isCandidate" [disabled]="hasApplied(selectedOffer.id)" (click)="applyToOffer($event, selectedOffer.id)">
              {{ hasApplied(selectedOffer.id) ? 'Applied ✓' : 'Apply Now' }}
            </button>
            <a routerLink="/login" class="apply-btn-lg" *ngIf="!isLoggedIn">Sign in to apply</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .offers-section {
      padding: 4rem 0;
      background-color: #f8f8f8;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-header {
      margin-bottom: 2rem;
    }

    .section-header h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .underline {
      width: 60px;
      height: 4px;
      background-color: #ff7900;
    }

    .offers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .offer-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: relative;
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }

    .offer-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }

    .offer-card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
    }

    .like-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #ccc;
      padding: 4px;
      transition: color 0.2s;
    }

    .like-btn:hover, .like-btn.liked {
      color: #e53935;
    }

    .offer-badge {
      display: inline-block;
      background-color: #000;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .offer-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #000;
    }

    .offer-card p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .offer-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .topic-tag {
      background: #fff3e0;
      color: #f57c00;
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .offer-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.75rem;
      border-top: 1px solid #f0f0f0;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      font-size: 0.85rem;
    }

    .apply-btn {
      background: #FF7900;
      color: white;
      border: none;
      padding: 0.5rem 1.25rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: background 0.2s;
      text-decoration: none;
    }

    .apply-btn:hover:not(:disabled) {
      background: #e66d00;
    }

    .apply-btn:disabled {
      background: #ccc;
      cursor: default;
    }

    /* Detail Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 2rem;
    }

    .modal {
      background: white;
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 700px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
    }

    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #999;
      line-height: 1;
    }

    .modal-close:hover {
      color: #333;
    }

    .modal-badge {
      margin-bottom: 1rem;
    }

    .modal h2 {
      font-size: 1.5rem;
      margin: 0.5rem 0 1rem;
      color: #333;
    }

    .modal-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .modal-desc {
      color: #555;
      line-height: 1.8;
      white-space: pre-line;
      margin-bottom: 1.5rem;
    }

    .modal-meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #888;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
    }

    .like-btn-lg {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #f5f5f5;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      color: #666;
      transition: all 0.2s;
    }

    .like-btn-lg:hover, .like-btn-lg.liked {
      background: #fce4ec;
      color: #e53935;
    }

    .apply-btn-lg {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #FF7900;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s;
    }

    .apply-btn-lg:hover:not(:disabled) {
      background: #e66d00;
    }

    .apply-btn-lg:disabled {
      background: #ccc;
      cursor: default;
    }

    .loading-state,
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    @media (max-width: 768px) {
      .offers-grid {
        grid-template-columns: 1fr;
      }
      .modal {
        margin: 1rem;
        padding: 1.5rem;
      }
    }
  `]
})
export class OffersSectionComponent implements OnInit {
  offers: Offer[] = [];
  loading = true;
  selectedOffer: Offer | null = null;
  isLoggedIn = false;
  isCandidate = false;
  likedOfferIds = new Set<string>();
  appliedOfferIds = new Set<string>();

  constructor(
    private offersService: OffersService,
    private likesService: LikesService,
    private applicationsService: ApplicationsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();

    // Check if candidate
    const user = (this.authService as any).currentUserSubject?.value;
    const role = typeof user?.role === 'string' ? user.role : user?.role?.name;
    this.isCandidate = role === 'CANDIDATE';

    this.offersService.getPublicOffers().subscribe({
      next: (offers: Offer[]) => {
        this.offers = offers;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });

    // Load user's likes and applications if logged in
    if (this.isLoggedIn && this.isCandidate) {
      this.likesService.getMyLikes().subscribe({
        next: (likes: any[]) => {
          this.likedOfferIds = new Set(likes.map((l: any) => l.offerId));
        }
      });
      this.applicationsService.getMyApplications().subscribe({
        next: (apps: any[]) => {
          this.appliedOfferIds = new Set(apps.map((a: any) => a.offerId));
        }
      });
    }
  }

  isLiked(id: string): boolean {
    return this.likedOfferIds.has(id);
  }

  hasApplied(id: string): boolean {
    return this.appliedOfferIds.has(id);
  }

  toggleLike(event: Event, offerId: string) {
    event.stopPropagation();
    if (!this.isLoggedIn) return;
    if (this.isLiked(offerId)) {
      this.likesService.unlike(offerId).subscribe({
        next: () => { this.likedOfferIds.delete(offerId); }
      });
    } else {
      this.likesService.like(offerId).subscribe({
        next: () => { this.likedOfferIds.add(offerId); }
      });
    }
  }

  applyToOffer(event: Event, offerId: string) {
    event.stopPropagation();
    this.applicationsService.apply(offerId).subscribe({
      next: () => { this.appliedOfferIds.add(offerId); },
      error: (err: any) => console.error('Apply failed:', err)
    });
  }

  openDetail(offer: Offer) {
    this.selectedOffer = offer;
  }

  closeDetail() {
    this.selectedOffer = null;
  }
}
