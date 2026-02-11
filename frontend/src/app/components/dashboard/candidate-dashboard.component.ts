import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { OffersService, Offer } from '../../services/offers.service';
import { ApplicationsService, Application } from '../../services/applications.service';
import { LikesService } from '../../services/likes.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <div class="dashboard-page">
      <app-header></app-header>

      <div class="dashboard-content">
        <div class="container">
          <div class="dashboard-header">
            <h1>Welcome back, {{ userName }}!</h1>
            <p>Track your liked offers and applications.</p>
          </div>

          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/>
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ likedOfferIds.size }}</span>
                <span class="stat-label">Liked Offers</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ applications.length }}</span>
                <span class="stat-label">My Applications</span>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="tabs">
            <button class="tab" [class.active]="activeTab === 'liked'" (click)="activeTab = 'liked'">
              Liked Offers ({{ likedOfferIds.size }})
            </button>
            <button class="tab" [class.active]="activeTab === 'applications'" (click)="activeTab = 'applications'">
              My Applications ({{ applications.length }})
            </button>
          </div>

          <!-- Liked Tab -->
          <div class="tab-content" *ngIf="activeTab === 'liked'">
            <div class="empty-state" *ngIf="likedOffers.length === 0">
              <p>You haven't liked any offers yet. Browse offers and save your favorites!</p>
            </div>
            <div class="offers-grid" *ngIf="likedOffers.length > 0">
              <div class="offer-card" *ngFor="let offer of likedOffers">
                <div class="offer-card-header">
                  <span class="dept-badge" *ngIf="offer.department">{{ offer.department.name }}</span>
                  <button class="like-btn liked" (click)="toggleLike(offer.id)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#e53935" stroke="currentColor" stroke-width="2">
                      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/>
                    </svg>
                  </button>
                </div>
                <h3>{{ offer.title }}</h3>
                <p class="offer-desc">{{ offer.description }}</p>
                <div class="topics" *ngIf="offer.topics?.length">
                  <span class="topic-chip" *ngFor="let topic of offer.topics">{{ topic.name }}</span>
                </div>
                <div class="offer-card-footer">
                  <button
                    class="apply-btn"
                    [disabled]="hasApplied(offer.id)"
                    (click)="applyToOffer(offer.id)"
                  >
                    {{ hasApplied(offer.id) ? 'Applied' : 'Apply' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Applications Tab -->
          <div class="tab-content" *ngIf="activeTab === 'applications'">
            <div class="empty-state" *ngIf="applications.length === 0">
              <p>You haven't applied to any offers yet.</p>
            </div>
            <div class="applications-list" *ngIf="applications.length > 0">
              <div class="application-row" *ngFor="let app of applications">
                <div class="app-info">
                  <h4>{{ app.offer?.title || 'Offer' }}</h4>
                  <span class="app-dept" *ngIf="app.offer?.department">{{ app.offer!.department!.name }}</span>
                </div>
                <div class="app-meta">
                  <span class="app-date">{{ app.appliedAt | date:'mediumDate' }}</span>
                  <span class="status-badge" [ngClass]="getStatusClass(app.status)">
                    {{ getStatusLabel(app.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .dashboard-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #f5f5f5;
    }

    .dashboard-content {
      flex: 1;
      padding: 2rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 0.5rem 0;
    }

    .dashboard-header p {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .stat-icon.orange { background: #FF7900; }
    .stat-icon.blue { background: #1976d2; }
    .stat-icon.green { background: #388e3c; }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
    }

    .stat-label {
      font-size: 0.85rem;
      color: #999;
    }

    /* Tabs */
    .tabs {
      display: flex;
      gap: 0.5rem;
      border-bottom: 2px solid #e0e0e0;
      margin-bottom: 2rem;
    }

    .tab {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      transition: all 0.2s;
    }

    .tab:hover {
      color: #FF7900;
    }

    .tab.active {
      color: #FF7900;
      border-bottom-color: #FF7900;
    }

    /* Offers grid */
    .offers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 1.5rem;
    }

    .offer-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .offer-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    }

    .offer-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
    }

    .dept-badge {
      background: #000;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .like-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #ccc;
      transition: color 0.2s;
      padding: 4px;
    }

    .like-btn:hover,
    .like-btn.liked {
      color: #e53935;
    }

    .offer-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 0.5rem 0;
    }

    .offer-desc {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0 0 1rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .topic-chip {
      background: #fff3e0;
      color: #f57c00;
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .offer-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.75rem;
      border-top: 1px solid #f0f0f0;
    }

    .date {
      font-size: 0.8rem;
      color: #999;
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
    }

    .apply-btn:hover:not(:disabled) {
      background: #e66d00;
    }

    .apply-btn:disabled {
      background: #ccc;
      cursor: default;
    }

    /* Applications list */
    .applications-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .application-row {
      background: white;
      border-radius: 10px;
      padding: 1.25rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }

    .app-info h4 {
      margin: 0 0 0.25rem 0;
      color: #333;
      font-size: 1rem;
    }

    .app-dept {
      font-size: 0.8rem;
      color: #999;
    }

    .app-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .app-date {
      font-size: 0.8rem;
      color: #999;
    }

    .status-badge {
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .status-badge.submitted {
      background: #e3f2fd;
      color: #1976d2;
    }

    .status-badge.under-review {
      background: #fff3e0;
      color: #f57c00;
    }

    .status-badge.accepted {
      background: #e8f5e9;
      color: #388e3c;
    }

    .status-badge.rejected {
      background: #fce4ec;
      color: #c62828;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #999;
    }

    .loading-spinner {
      text-align: center;
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      .offers-grid {
        grid-template-columns: 1fr;
      }
      .tabs {
        flex-wrap: wrap;
      }
      .application-row {
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
      }
    }
  `]
})
export class CandidateDashboardComponent implements OnInit {
  userName = '';
  activeTab = 'liked';
  loading = true;

  offers: Offer[] = [];
  likedOffers: Offer[] = [];
  applications: Application[] = [];
  likedOfferIds = new Set<string>();
  appliedOfferIds = new Set<string>();

  constructor(
    private offersService: OffersService,
    private applicationsService: ApplicationsService,
    private likesService: LikesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService['currentUserSubject']?.value;
    this.userName = user?.firstName || 'Candidate';

    this.loadData();
  }

  loadData() {
    this.loading = true;

    // Load offers (role-filtered: candidates see only approved)
    this.offersService.getOffers().subscribe({
      next: (offers: Offer[]) => {
        this.offers = offers;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });

    // Load likes
    this.likesService.getMyLikes().subscribe({
      next: (likes: any[]) => {
        this.likedOfferIds = new Set(likes.map((l: any) => l.offerId));
        this.likedOffers = likes
          .filter((l: any) => l.offer)
          .map((l: any) => l.offer as Offer);
      }
    });

    // Load applications
    this.applicationsService.getMyApplications().subscribe({
      next: (apps: Application[]) => {
        this.applications = apps;
        this.appliedOfferIds = new Set(apps.map((a: Application) => a.offerId));
      }
    });
  }

  isLiked(offerId: string): boolean {
    return this.likedOfferIds.has(offerId);
  }

  hasApplied(offerId: string): boolean {
    return this.appliedOfferIds.has(offerId);
  }

  toggleLike(offerId: string) {
    if (this.isLiked(offerId)) {
      this.likesService.unlike(offerId).subscribe({
        next: () => {
          this.likedOfferIds.delete(offerId);
          this.likedOffers = this.likedOffers.filter(o => o.id !== offerId);
        }
      });
    } else {
      this.likesService.like(offerId).subscribe({
        next: () => {
          this.likedOfferIds.add(offerId);
          const offer = this.offers.find(o => o.id === offerId);
          if (offer) this.likedOffers.push(offer);
        }
      });
    }
  }

  applyToOffer(offerId: string) {
    this.applicationsService.apply(offerId).subscribe({
      next: (app: Application) => {
        this.applications.push(app);
        this.appliedOfferIds.add(offerId);
      },
      error: (err: any) => {
        console.error('Application failed:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'SUBMITTED': return 'submitted';
      case 'UNDER_REVIEW': return 'under-review';
      case 'ACCEPTED': return 'accepted';
      case 'REJECTED': return 'rejected';
      default: return 'submitted';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'SUBMITTED': return 'Submitted';
      case 'UNDER_REVIEW': return 'Under Review';
      case 'ACCEPTED': return 'Accepted';
      case 'REJECTED': return 'Rejected';
      default: return status;
    }
  }
}
