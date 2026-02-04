import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <div class="logo-box">orange</div>
        </div>
        
        <nav class="nav-menu">
          <a href="#" class="nav-link">Appliquer</a>
          <a href="#" class="nav-link">Mes candidatures</a>
          <a href="#" class="nav-link">AI Feedback</a>
        </nav>

        <div class="header-actions">
          <button class="icon-btn user-btn" (click)="onLoginClick()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
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

    @media (max-width: 768px) {
      .nav-menu {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  onLoginClick() {
    // TODO: Navigate to login page
    console.log('Login clicked');
  }
}
