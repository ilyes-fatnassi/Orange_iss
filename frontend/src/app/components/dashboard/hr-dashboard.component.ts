import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { OffersService, Offer } from '../../services/offers.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <div class="dashboard-page">
      <app-header></app-header>

      <div class="dashboard-content">
        <div class="container">
          <div class="dashboard-header">
            <h1>HR Admin Dashboard</h1>
            <p>Review, approve, and decline internship offers from Department Chiefs.</p>
          </div>

          <!-- Stats -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon total">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ allOffers.length }}</span>
                <span class="stat-label">Total Offers</span>
              </div>
            </div>
            <div class="stat-card highlight">
              <div class="stat-icon pending">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ pendingCount }}</span>
                <span class="stat-label">Pending Review</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon approved">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ approvedCount }}</span>
                <span class="stat-label">Approved</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon declined">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ declinedCount }}</span>
                <span class="stat-label">Declined</span>
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="filters">
            <button class="filter-btn" [class.active]="statusFilter === 'ALL'" (click)="statusFilter = 'ALL'">All</button>
            <button class="filter-btn" [class.active]="statusFilter === 'PENDING'" (click)="statusFilter = 'PENDING'">
              Pending ({{ pendingCount }})
            </button>
            <button class="filter-btn" [class.active]="statusFilter === 'APPROVED'" (click)="statusFilter = 'APPROVED'">Approved</button>
            <button class="filter-btn" [class.active]="statusFilter === 'DECLINED'" (click)="statusFilter = 'DECLINED'">Declined</button>
          </div>

          <!-- Offers List -->
          <div class="offers-list">
            <div class="empty-state" *ngIf="filteredOffers.length === 0 && !loading">
              <p>No offers matching this filter.</p>
            </div>

            <div class="offer-row" *ngFor="let offer of filteredOffers">
              <div class="offer-main">
                <div class="offer-top">
                  <h3>{{ offer.title }}</h3>
                  <span class="status-badge" [ngClass]="offer.status.toLowerCase()">{{ offer.status }}</span>
                </div>
                <p class="offer-desc">{{ offer.description }}</p>
                <div class="offer-meta">
                  <span class="meta-item" *ngIf="offer.department">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                    </svg>
                    {{ offer.department.name }}
                  </span>
                  <span class="meta-item" *ngIf="offer.createdBy">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    {{ offer.createdBy.firstName }} {{ offer.createdBy.lastName }}
                  </span>
                  <span class="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
                    </svg>
                    {{ offer.createdAt | date:'mediumDate' }}
                  </span>
                  <span class="meta-item applicants">
                    {{ offer.applicantCount || 0 }} applicant{{ (offer.applicantCount || 0) === 1 ? '' : 's' }}
                  </span>
                </div>
                <div class="topics" *ngIf="offer.topics?.length">
                  <span class="topic-chip" *ngFor="let t of offer.topics">{{ t.name }}</span>
                </div>
              </div>

              <!-- Actions for PENDING offers -->
              <div class="offer-actions" *ngIf="offer.status === 'PENDING'">
                <button class="btn-approve" (click)="approve(offer)" [disabled]="processingIds.has(offer.id)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Approve
                </button>
                <button class="btn-decline" (click)="decline(offer)" [disabled]="processingIds.has(offer.id)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                  Decline
                </button>
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
      margin: 0;
    }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

    .stat-card.highlight {
      border: 2px solid #FF7900;
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

    .stat-icon.total { background: #546e7a; }
    .stat-icon.pending { background: #f57c00; }
    .stat-icon.approved { background: #388e3c; }
    .stat-icon.declined { background: #c62828; }

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

    /* Filters */
    .filters {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .filter-btn {
      padding: 0.5rem 1.25rem;
      border: 2px solid #e0e0e0;
      border-radius: 20px;
      background: white;
      font-size: 0.9rem;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-btn:hover {
      border-color: #FF7900;
      color: #FF7900;
    }

    .filter-btn.active {
      background: #FF7900;
      color: white;
      border-color: #FF7900;
    }

    /* Offers list */
    .offers-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .offer-row {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      display: flex;
      justify-content: space-between;
      gap: 1.5rem;
    }

    .offer-main {
      flex: 1;
    }

    .offer-top {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .offer-top h3 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 700;
      color: #333;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .status-badge.pending {
      background: #fff3e0;
      color: #f57c00;
    }

    .status-badge.approved {
      background: #e8f5e9;
      color: #388e3c;
    }

    .status-badge.declined {
      background: #fce4ec;
      color: #c62828;
    }

    .offer-desc {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0 0 0.75rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .offer-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.8rem;
      color: #999;
    }

    .meta-item.applicants {
      color: #1976d2;
      font-weight: 600;
    }

    .topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
    }

    .topic-chip {
      background: #fff3e0;
      color: #f57c00;
      padding: 0.15rem 0.5rem;
      border-radius: 10px;
      font-size: 0.7rem;
      font-weight: 600;
    }

    /* Actions */
    .offer-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: center;
      min-width: 130px;
    }

    .btn-approve,
    .btn-decline {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.6rem 1rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-approve {
      background: #e8f5e9;
      color: #388e3c;
    }

    .btn-approve:hover:not(:disabled) {
      background: #388e3c;
      color: white;
    }

    .btn-decline {
      background: #fce4ec;
      color: #c62828;
    }

    .btn-decline:hover:not(:disabled) {
      background: #c62828;
      color: white;
    }

    .btn-approve:disabled,
    .btn-decline:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #999;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }
      .offer-row {
        flex-direction: column;
      }
      .offer-actions {
        flex-direction: row;
      }
      .filters {
        flex-wrap: wrap;
      }
    }
  `]
})
export class HrDashboardComponent implements OnInit {
  allOffers: Offer[] = [];
  statusFilter: 'ALL' | 'PENDING' | 'APPROVED' | 'DECLINED' = 'ALL';
  loading = true;
  processingIds = new Set<string>();

  get filteredOffers(): Offer[] {
    if (this.statusFilter === 'ALL') return this.allOffers;
    return this.allOffers.filter(o => o.status === this.statusFilter);
  }

  get pendingCount(): number {
    return this.allOffers.filter(o => o.status === 'PENDING').length;
  }

  get approvedCount(): number {
    return this.allOffers.filter(o => o.status === 'APPROVED').length;
  }

  get declinedCount(): number {
    return this.allOffers.filter(o => o.status === 'DECLINED').length;
  }

  constructor(
    private offersService: OffersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.loading = true;
    this.offersService.getOffers().subscribe({
      next: (offers: Offer[]) => {
        this.allOffers = offers;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  approve(offer: Offer) {
    this.processingIds.add(offer.id);
    this.offersService.approveOffer(offer.id).subscribe({
      next: (updated: Offer) => {
        offer.status = 'APPROVED';
        this.processingIds.delete(offer.id);
      },
      error: () => { this.processingIds.delete(offer.id); }
    });
  }

  decline(offer: Offer) {
    this.processingIds.add(offer.id);
    this.offersService.declineOffer(offer.id).subscribe({
      next: (updated: Offer) => {
        offer.status = 'DECLINED';
        this.processingIds.delete(offer.id);
      },
      error: () => { this.processingIds.delete(offer.id); }
    });
  }
}
