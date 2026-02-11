import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-header">
        <div class="logo-section">
          <h1 class="logo">ORANGE</h1>
          <p class="tagline">Internship & PFE Management</p>
        </div>
      </div>

      <div class="auth-content">
        <div class="auth-box">
          <div class="auth-header-box">
            <h2>Sign In</h2>
            <p>Access your internship platform</p>
          </div>

          <form class="auth-form" (ngSubmit)="onLogin()">
            <div *ngIf="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="input-wrapper">
                <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  class="form-input"
                  placeholder="your@email.com"
                  [(ngModel)]="email"
                  name="email"
                  required
                  [disabled]="loading"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrapper password-wrapper">
                <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  class="form-input password-input"
                  placeholder="••••••••"
                  [(ngModel)]="password"
                  name="password"
                  required
                  [disabled]="loading"
                />
                <button type="button" class="password-toggle" (click)="togglePasswordVisibility()" [disabled]="loading">
                  <svg *ngIf="!showPassword" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                  </svg>
                  <svg *ngIf="showPassword" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd"/>
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="form-actions">
              <a href="#" class="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" class="auth-button primary" [disabled]="loading">
              {{ loading ? 'Signing in...' : 'Sign In' }}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 10.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>

            <div class="divider">or</div>

            <p class="signup-prompt">
              Don't have an account?
              <a routerLink="/signup" class="signup-link">Create one</a>
            </p>
          </form>

          
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #FF7900 0%, #CD3C14 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .auth-header {
      padding: 40px 20px;
      text-align: center;
      color: white;
    }

    .logo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .logo {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 2px;
      margin: 0;
    }

    .tagline {
      font-size: 14px;
      opacity: 0.9;
      margin: 0;
      font-weight: 300;
    }

    .auth-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    .auth-box {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 40px;
      width: 100%;
      max-width: 420px;
    }

    .auth-header-box {
      margin-bottom: 30px;
      text-align: center;
    }

    .auth-header-box h2 {
      font-size: 28px;
      font-weight: 700;
      color: #333333;
      margin: 0 0 8px 0;
    }

    .auth-header-box p {
      color: #CCCCCC;
      font-size: 14px;
      margin: 0;
    }

    .auth-form {
      width: 100%;
    }

    .error-message {
      background-color: #FEE;
      border: 1px solid #CD3C14;
      color: #CD3C14;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 8px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .password-wrapper {
      position: relative;
    }

    .password-input {
      padding-right: 45px;
    }

    .password-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-color);
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .password-toggle:hover:not(:disabled) {
      opacity: 1;
    }

    .password-toggle:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    .input-icon {
      position: absolute;
      left: 14px;
      color: #FF7900;
      pointer-events: none;
      flex-shrink: 0;
    }

    .form-input {
      width: 100%;
      padding: 12px 12px 12px 44px;
      border: 2px solid #CCCCCC;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
      font-family: inherit;
    }

    .form-input:focus {
      outline: none;
      border-color: #FF7900;
      box-shadow: 0 0 0 3px rgba(255, 121, 0, 0.1);
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
    }

    .forgot-password {
      color: #FF7900;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }

    .forgot-password:hover {
      opacity: 0.8;
    }

    .auth-button {
      width: 100%;
      padding: 12px 16px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s ease;
      font-family: inherit;
    }

    .auth-button.primary {
      background: linear-gradient(135deg, #FF7900, #CD3C14);
      color: white;
    }

    .auth-button.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 121, 0, 0.3);
    }

    .auth-button.primary:active {
      transform: translateY(0);
    }

    .divider {
      text-align: center;
      margin: 24px 0;
      color: #CCCCCC;
      font-size: 13px;
      position: relative;
    }

    .divider::before,
    .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: calc(50% - 20px);
      height: 1px;
      background: #CCCCCC;
    }

    .divider::before {
      left: 0;
    }

    .divider::after {
      right: 0;
    }

    .signup-prompt {
      text-align: center;
      color: #333333;
      font-size: 14px;
      margin: 0;
    }

    .signup-link {
      color: #FF7900;
      text-decoration: none;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }

    .signup-link:hover {
      opacity: 0.8;
    }

    .demo-users {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #F6F6F6;
    }

    .demo-title {
      font-size: 12px;
      font-weight: 700;
      color: #CCCCCC;
      text-transform: uppercase;
      margin: 0 0 12px 0;
      letter-spacing: 0.5px;
    }

    .demo-card {
      background: #F6F6F6;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 13px;
    }

    .demo-card:last-child {
      margin-bottom: 0;
    }

    .demo-card strong {
      display: block;
      color: #333333;
      margin-bottom: 4px;
    }

    .demo-card p {
      color: #CCCCCC;
      margin: 0;
      font-family: 'Courier New', monospace;
    }

    @media (max-width: 600px) {
      .auth-box {
        padding: 24px;
      }

      .auth-header-box h2 {
        font-size: 24px;
      }

      .logo {
        font-size: 24px;
      }

      .auth-content {
        padding: 20px 16px;
      }
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Login error:', error);
        this.loading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}