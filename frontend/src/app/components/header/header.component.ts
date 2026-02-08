import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <a routerLink="/" class="logo-box">orange</a>
        </div>
        
        <nav class="nav-menu" *ngIf="isAuthenticated">
          <a [routerLink]="['/dashboard']" routerLinkActive="active" class="nav-link">Dashboard</a>
          <a href="#" class="nav-link">Mes candidatures</a>
          <a href="#" class="nav-link">AI Feedback</a>
        </nav>

        <div class="header-actions">
          <ng-container *ngIf="isAuthenticated; else notAuthenticated">
            <div class="user-info">
              <a routerLink="/profile" class="user-name-link">
                <span class="user-name">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>
              </a>
            </div>
            <button class="icon-btn user-btn" (click)="onLogoutClick()" title="Logout">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
              </svg>
            </button>
          </ng-container>
          <ng-template #notAuthenticated>
            <button class="icon-btn user-btn" (click)="onLoginClick()" title="Login">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </button>
          </ng-template>
          <button class="icon-btn language-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm7.93 9H14.9c-.1-1.63-.49-3.16-1.13-4.54 1.93.86 3.47 2.48 4.16 4.54zM10 2.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM2.26 12C2.1 11.36 2 10.69 2 10s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H2.26zm.81 2h3.03c.1 1.63.49 3.16 1.13 4.54-1.93-.86-3.47-2.48-4.16-4.54zm3.03-8H3.07c.69-2.06 2.23-3.68 4.16-4.54-.64 1.38-1.03 2.91-1.13 4.54zM10 17.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM12.34 12H7.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.54c.64-1.38 1.03-2.91 1.13-4.54h3.03c-.69 2.06-2.23 3.68-4.16 4.54zM14.36 12c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #000;
      color: white;
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo-box {
      background-color: #ff7900;
      color: white;
      padding: 0.5rem 1rem;
      font-weight: bold;
      font-size: 1.2rem;
      border-radius: 4px;
    }

    .nav-menu {
      display: flex;
      gap: 2rem;
      flex: 1;
      justify-content: center;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-size: 1rem;
      transition: color 0.3s;
    }

    .nav-link:hover {
      color: #ff7900;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .icon-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-btn:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .user-info {
      display: flex;
      align-items: center;
      margin-right: 1rem;
    }

    .user-name-link {
      text-decoration: none;
      transition: opacity 0.3s;
    }

    .user-name-link:hover {
      opacity: 0.8;
    }

    .user-name {
      color: white;
      font-size: 0.9rem;
    }

    .logo-box {
      background-color: #ff7900;
      color: white;
      padding: 0.5rem 1rem;
      font-weight: bold;
      font-size: 1.2rem;
      border-radius: 4px;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .logo-box:hover {
      background-color: #e66d00;
    }

    .nav-link.active {
      color: #ff7900;
      font-weight: bold;
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  currentUser: any = null;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Subscribe to current user to update header
    this.authService.currentUser$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = !!user;
    });

    // Initialize authentication state
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  onLogoutClick() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Logout error:', error);
        // Still navigate even if logout fails
        this.router.navigate(['/']);
      }
    });
  }
}
