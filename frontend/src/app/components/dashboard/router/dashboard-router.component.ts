import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { CandidateDashboardComponent } from '../candidate-dashboard.component';
import { ChiefDashboardComponent } from '../chief-dashboard.component';
import { HrDashboardComponent } from '../hr-dashboard.component';

@Component({
  selector: 'app-dashboard-router',
  standalone: true,
  imports: [
    CommonModule,
    CandidateDashboardComponent,
    ChiefDashboardComponent,
    HrDashboardComponent
  ],
  template: `
    <app-candidate-dashboard *ngIf="role === 'CANDIDATE'"></app-candidate-dashboard>
    <app-chief-dashboard *ngIf="role === 'DEPT_CHIEF'"></app-chief-dashboard>
    <app-hr-dashboard *ngIf="role === 'HR_ADMIN' || role === 'SUPER_ADMIN'"></app-hr-dashboard>
    <div *ngIf="!role" class="loading">
      <p>Loading dashboard...</p>
    </div>
  `,
  styles: [`
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      color: #666;
      font-size: 1.1rem;
    }
  `]
})
export class DashboardRouterComponent implements OnInit {
  role = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.role = typeof user.role === 'string' ? user.role : (user as any).role?.name || '';
      }
    });
  }
}
