import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="hero">
      <div class="hero-overlay">
        <div class="hero-content">
          <div class="search-container">
            <input 
              type="text" 
              class="search-input"
              placeholder="Rechercher un intitulé du poste ou PFE"
              [(ngModel)]="searchTitle"
            />
            <input 
              type="text" 
              class="search-input"
              placeholder="Rechercher un emplacement"
              [(ngModel)]="searchLocation"
            />
            <button class="search-btn" (click)="onSearch()">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z"/>
              </svg>
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(255,121,0,0.3)),
                  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23f5f5f5" width="1200" height="600"/></svg>');
      background-size: cover;
      background-position: center;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .hero-overlay {
      width: 100%;
      padding: 4rem 2rem;
    }

    .hero-content {
      max-width: 1000px;
      margin: 0 auto;
    }

    .search-container {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      gap: 1rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    .search-input {
      flex: 1;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      outline: none;
    }

    .search-input:focus {
      border-color: #ff7900;
    }

    .search-btn {
      background-color: #ff7900;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.3s;
      white-space: nowrap;
    }

    .search-btn:hover {
      background-color: #e66d00;
    }

    @media (max-width: 768px) {
      .search-container {
        flex-direction: column;
      }

      .search-btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeroComponent {
  searchTitle = '';
  searchLocation = '';

  onSearch() {
    console.log('Search:', this.searchTitle, this.searchLocation);
    // TODO: Implement search functionality
  }
}
