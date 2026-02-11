import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { OffersService, Offer, CreateOfferDto } from '../../services/offers.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Topic {
  id: string;
  name: string;
}

@Component({
  selector: 'app-chief-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <div class="dashboard-page">
      <app-header></app-header>

      <div class="dashboard-content">
        <div class="container">
          <div class="dashboard-header">
            <div>
              <h1>Department Chief Dashboard</h1>
              <p>Manage your internship offers and track their status.</p>
            </div>
            <button class="btn-create" (click)="showCreateModal = true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              New Offer
            </button>
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
                <span class="stat-number">{{ offers.length }}</span>
                <span class="stat-label">Total Offers</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon pending">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-number">{{ pendingCount }}</span>
                <span class="stat-label">Pending Approval</span>
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

          <!-- Offers Table -->
          <div class="offers-table-wrapper">
            <h2>My Offers</h2>
            <div class="empty-state" *ngIf="offers.length === 0 && !loading">
              <p>You haven't created any offers yet. Click "New Offer" to get started.</p>
            </div>
            <table class="offers-table" *ngIf="offers.length > 0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Topics</th>
                  <th>Status</th>
                  <th>Applicants</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let offer of offers">
                  <td class="title-cell">{{ offer.title }}</td>
                  <td>
                    <div class="topics">
                      <span class="topic-chip" *ngFor="let t of offer.topics">{{ t.name }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="status-badge" [ngClass]="offer.status.toLowerCase()">
                      {{ offer.status }}
                    </span>
                  </td>
                  <td class="center">{{ offer.applicantCount || 0 }}</td>
                  <td>{{ offer.createdAt | date:'shortDate' }}</td>
                  <td>
                    <button
                      class="btn-edit"
                      *ngIf="offer.status !== 'APPROVED'"
                      (click)="editOffer(offer)"
                    >Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div class="modal-overlay" *ngIf="showCreateModal" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h2>{{ editingOffer ? 'Edit Offer' : 'Create New Offer' }}</h2>
          <form (ngSubmit)="submitOffer()">
            <div class="form-group">
              <label>Title</label>
              <input type="text" [(ngModel)]="formData.title" name="title" required placeholder="e.g. Stage Développeur Web" />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea [(ngModel)]="formData.description" name="description" required rows="4" placeholder="Describe the internship..."></textarea>
            </div>
            <div class="form-group">
              <label>Topics (max 3)</label>
              <div class="topics-selector">
                <div
                  class="topic-option"
                  *ngFor="let topic of availableTopics"
                  [class.selected]="isTopicSelected(topic.id)"
                  (click)="toggleTopic(topic.id)"
                >
                  {{ topic.name }}
                </div>
              </div>
              <small *ngIf="formData.topicIds.length > 3" class="error-text">Maximum 3 topics allowed</small>
            </div>
            <div class="error-banner" *ngIf="errorMessage">
              {{ errorMessage }}
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-cancel" (click)="closeModal()">Cancel</button>
              <button
                type="submit"
                class="btn-submit"
                [disabled]="!formData.title || !formData.description || formData.topicIds.length > 3 || submitting"
              >
                {{ submitting ? 'Saving...' : (editingOffer ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
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
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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

    .btn-create {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #FF7900;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-create:hover {
      background: #e66d00;
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

    /* Table */
    .offers-table-wrapper {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .offers-table-wrapper h2 {
      font-size: 1.3rem;
      margin: 0 0 1rem 0;
      color: #333;
    }

    .offers-table {
      width: 100%;
      border-collapse: collapse;
    }

    .offers-table th {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.8rem;
      text-transform: uppercase;
      color: #999;
      border-bottom: 2px solid #f0f0f0;
    }

    .offers-table td {
      padding: 1rem;
      border-bottom: 1px solid #f0f0f0;
      font-size: 0.9rem;
      color: #333;
    }

    .offers-table tr:last-child td {
      border-bottom: none;
    }

    .title-cell {
      font-weight: 600;
      max-width: 250px;
    }

    .center {
      text-align: center;
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

    .status-badge {
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
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

    .btn-edit {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 0.4rem 1rem;
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-edit:hover {
      background: #e0e0e0;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }

    .modal {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal h2 {
      margin: 0 0 1.5rem 0;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #FF7900;
    }

    .topics-selector {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .topic-option {
      padding: 0.4rem 0.9rem;
      border: 2px solid #e0e0e0;
      border-radius: 20px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .topic-option:hover {
      border-color: #FF7900;
    }

    .topic-option.selected {
      background: #FF7900;
      color: white;
      border-color: #FF7900;
    }

    .error-text {
      color: #c62828;
      font-size: 0.8rem;
    }

    .error-banner {
      background: #fdecea;
      color: #c62828;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .btn-cancel {
      background: #f5f5f5;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-submit {
      background: #FF7900;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-submit:hover:not(:disabled) {
      background: #e66d00;
    }

    .btn-submit:disabled {
      background: #ccc;
      cursor: default;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #999;
    }

    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        gap: 1rem;
      }
      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }
      .offers-table-wrapper {
        overflow-x: auto;
      }
    }
  `]
})
export class ChiefDashboardComponent implements OnInit {
  offers: Offer[] = [];
  availableTopics: Topic[] = [];
  loading = true;
  showCreateModal = false;
  editingOffer: Offer | null = null;
  errorMessage = '';
  submitting = false;

  formData: CreateOfferDto = {
    title: '',
    description: '',
    topicIds: []
  };

  get pendingCount(): number {
    return this.offers.filter(o => o.status === 'PENDING').length;
  }

  get approvedCount(): number {
    return this.offers.filter(o => o.status === 'APPROVED').length;
  }

  get declinedCount(): number {
    return this.offers.filter(o => o.status === 'DECLINED').length;
  }

  constructor(
    private offersService: OffersService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadOffers();
    this.loadTopics();
  }

  loadOffers() {
    this.loading = true;
    this.offersService.getOffers().subscribe({
      next: (offers: Offer[]) => {
        this.offers = offers;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  loadTopics() {
    // Load available topics for the form
    this.http.get<Topic[]>(`${environment.apiUrl}/topics`).subscribe({
      next: (topics) => { this.availableTopics = topics; },
      error: () => {
        // Topics endpoint may not exist yet — use empty
        this.availableTopics = [];
      }
    });
  }

  isTopicSelected(id: string): boolean {
    return this.formData.topicIds.includes(id);
  }

  toggleTopic(id: string) {
    const idx = this.formData.topicIds.indexOf(id);
    if (idx > -1) {
      this.formData.topicIds.splice(idx, 1);
    } else {
      if (this.formData.topicIds.length < 3) {
        this.formData.topicIds.push(id);
      }
    }
  }

  editOffer(offer: Offer) {
    this.editingOffer = offer;
    this.formData = {
      title: offer.title,
      description: offer.description,
      topicIds: offer.topics.map((t: any) => t.id)
    };
    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
    this.editingOffer = null;
    this.errorMessage = '';
    this.submitting = false;
    this.formData = { title: '', description: '', topicIds: [] };
  }

  private extractError(err: any): string {
    const body = err?.error;
    if (body?.message) {
      return Array.isArray(body.message) ? body.message.join(', ') : body.message;
    }
    return 'Something went wrong. Please try again.';
  }

  submitOffer() {
    this.errorMessage = '';
    this.submitting = true;
    if (this.editingOffer) {
      this.offersService.updateOffer(this.editingOffer.id, this.formData).subscribe({
        next: () => {
          this.closeModal();
          this.loadOffers();
        },
        error: (err: any) => {
          this.submitting = false;
          this.errorMessage = this.extractError(err);
        }
      });
    } else {
      this.offersService.createOffer(this.formData).subscribe({
        next: () => {
          this.closeModal();
          this.loadOffers();
        },
        error: (err: any) => {
          this.submitting = false;
          this.errorMessage = this.extractError(err);
        }
      });
    }
  }
}
