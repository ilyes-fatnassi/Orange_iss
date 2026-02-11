import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="profile-container">
      <div class="profile-header">
        <h1>My Account</h1>
        <p>View and manage your account information</p>
      </div>

      <div class="profile-content" *ngIf="user">
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-circle">
              {{ getInitials() }}
            </div>
          </div>

          <div class="profile-info-grid" [class.single-col]="isCandidate()">
            <!-- Personal Information — always shown -->
            <div class="info-section">
              <h2>Personal Information</h2>

              <div class="info-row">
                <div class="info-label">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                  </svg>
                  First Name
                </div>
                <div class="info-value">{{ user.firstName }}</div>
              </div>

              <div class="info-row">
                <div class="info-label">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                  </svg>
                  Last Name
                </div>
                <div class="info-value">{{ user.lastName }}</div>
              </div>

              <div class="info-row">
                <div class="info-label">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Email Address
                </div>
                <div class="info-value">{{ user.email }}</div>
              </div>
            </div>

            <!-- Role & Department — only for DEPT_CHIEF and HR_ADMIN -->
            <div class="info-section" *ngIf="!isCandidate()">
              <h2>Role & Department</h2>

              <div class="info-row">
                <div class="info-label">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.5 1.5H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6.5a2 2 0 00-2-2h-6V1.5z"/>
                  </svg>
                  Role
                </div>
                <div class="info-value">
                  <span class="role-badge" [class.hr]="getUserRole() === 'HR_ADMIN'" [class.chief]="getUserRole() === 'DEPT_CHIEF'">
                    {{ getRoleName() }}
                  </span>
                </div>
              </div>

              <!-- Department — only for DEPT_CHIEF -->
              <div class="info-row" *ngIf="isDeptChief() && getDepartmentName()">
                <div class="info-label">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                  Department
                </div>
                <div class="info-value">{{ getDepartmentName() }}</div>
              </div>
            </div>
          </div>

          <!-- Edit mode -->
          <div class="edit-form" *ngIf="editing">
            <h2>Edit Profile</h2>
            <div class="edit-row">
              <label>First Name</label>
              <input type="text" [(ngModel)]="editData.firstName" />
            </div>
            <div class="edit-row">
              <label>Last Name</label>
              <input type="text" [(ngModel)]="editData.lastName" />
            </div>
            <div class="edit-row">
              <label>Email</label>
              <input type="email" [(ngModel)]="editData.email" />
            </div>
            <div class="edit-actions">
              <button class="btn-secondary" (click)="cancelEdit()">Cancel</button>
              <button class="btn-primary" (click)="saveProfile()" [disabled]="saving">{{ saving ? 'Saving...' : 'Save Changes' }}</button>
            </div>
            <div class="edit-error" *ngIf="editError">{{ editError }}</div>
          </div>

          <div class="profile-actions">
            <button class="btn-secondary" (click)="startEdit()" *ngIf="!editing">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
              Edit Profile
            </button>
            <button class="btn-danger" (click)="logout()">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div class="loading" *ngIf="!user">
        <div class="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    .profile-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #FF7900 0%, #CD3C14 100%);
      padding: 2rem;
    }

    .profile-header {
      text-align: center;
      color: white;
      margin-bottom: 2rem;
    }

    .profile-header h1 {
      font-size: 2.5rem;
      margin: 0 0 0.5rem 0;
      font-weight: 700;
    }

    .profile-header p {
      font-size: 1.1rem;
      opacity: 0.9;
      margin: 0;
    }

    .profile-content {
      max-width: 1000px;
      margin: 0 auto;
    }

    .profile-card {
      background: white;
      border-radius: 16px;
      padding: 3rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }

    .profile-avatar {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .avatar-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FF7900 0%, #CD3C14 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 3rem;
      font-weight: 700;
      box-shadow: 0 4px 20px rgba(255, 121, 0, 0.3);
    }

    .profile-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .profile-info-grid.single-col {
      grid-template-columns: 1fr;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .info-section h2 {
      font-size: 1.3rem;
      color: #333;
      margin: 0 0 1.5rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #FF7900;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .info-row:last-child {
      border-bottom: none;
    }

    .info-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      font-weight: 500;
    }

    .info-label svg {
      color: #FF7900;
    }

    .info-value {
      color: #333;
      font-weight: 600;
      text-align: right;
    }

    .role-badge {
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .role-badge.hr {
      background: #e3f2fd;
      color: #1976d2;
    }

    .role-badge.chief {
      background: #fff3e0;
      color: #f57c00;
    }

    .profile-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid #f0f0f0;
    }

    .btn-primary,
    .btn-secondary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary {
      background: #FF7900;
      color: white;
    }

    .btn-primary:hover {
      background: #e66d00;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 121, 0, 0.3);
    }

    .btn-secondary {
      background: #f5f5f5;
      color: #333;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
      transform: translateY(-2px);
    }

    .btn-danger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      background: #c62828;
      color: white;
    }

    .btn-danger:hover {
      background: #b71c1c;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(198, 40, 40, 0.3);
    }

    .edit-form {
      background: #fafafa;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 1.5rem;
    }

    .edit-form h2 {
      margin: 0 0 1.5rem 0;
      font-size: 1.3rem;
      color: #333;
    }

    .edit-row {
      margin-bottom: 1rem;
    }

    .edit-row label {
      display: block;
      font-weight: 600;
      color: #666;
      margin-bottom: 0.4rem;
      font-size: 0.9rem;
    }

    .edit-row input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .edit-row input:focus {
      border-color: #FF7900;
      outline: none;
    }

    .edit-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .edit-error {
      color: #c62828;
      margin-top: 1rem;
      font-size: 0.9rem;
    }

    .loading {
      text-align: center;
      color: white;
      padding: 3rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .profile-card {
        padding: 1.5rem;
      }

      .profile-info-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .profile-header h1 {
        font-size: 2rem;
      }

      .profile-actions {
        flex-direction: column;
      }

      .btn-primary,
      .btn-secondary {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any = null;
  editing = false;
  saving = false;
  editError = '';
  editData = { firstName: '', lastName: '', email: '' };
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.authService.currentUser$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      this.user = user;
      if (!user) {
        const storedUser = localStorage.getItem('current_user');
        if (storedUser) {
          this.user = JSON.parse(storedUser);
        } else {
          this.router.navigate(['/login']);
        }
      }
    });

    if (this.authService.isAuthenticated()) {
      this.authService.getCurrentUser().subscribe({
        next: (profile: any) => {
          this.user = profile;
        },
        error: (error: any) => {
          console.error('Error fetching profile:', error);
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getInitials(): string {
    if (!this.user) return '';
    const firstInitial = this.user.firstName?.charAt(0)?.toUpperCase() || '';
    const lastInitial = this.user.lastName?.charAt(0)?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }

  getUserRole(): string {
    if (!this.user) return '';
    if (typeof this.user.role === 'string') return this.user.role;
    return this.user.role?.name || '';
  }

  isCandidate(): boolean {
    return this.getUserRole() === 'CANDIDATE';
  }

  isDeptChief(): boolean {
    return this.getUserRole() === 'DEPT_CHIEF';
  }

  isHrAdmin(): boolean {
    return this.getUserRole() === 'HR_ADMIN';
  }

  getDepartmentName(): string {
    if (!this.user) return '';
    if (typeof this.user.department === 'string') return this.user.department;
    return this.user.department?.name || '';
  }

  getRoleName(): string {
    const role = this.getUserRole();
    switch (role) {
      case 'HR_ADMIN':
        return 'HR Admin';
      case 'DEPT_CHIEF':
        return 'Department Chief';
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'CANDIDATE':
        return 'Candidate';
      default:
        return role;
    }
  }

  startEdit() {
    this.editing = true;
    this.editError = '';
    this.editData = {
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      email: this.user.email || ''
    };
  }

  cancelEdit() {
    this.editing = false;
    this.editError = '';
  }

  saveProfile() {
    this.saving = true;
    this.editError = '';
    this.http.patch<any>(`${environment.apiUrl}/auth/profile`, this.editData).subscribe({
      next: (updated: any) => {
        this.user = { ...this.user, ...this.editData };
        localStorage.setItem('current_user', JSON.stringify(this.user));
        this.editing = false;
        this.saving = false;
      },
      error: (err: any) => {
        this.saving = false;
        const msg = err?.error?.message;
        this.editError = Array.isArray(msg) ? msg.join(', ') : (msg || 'Update failed. Please try again.');
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Logout error:', error);
        this.router.navigate(['/']);
      }
    });
  }
}
