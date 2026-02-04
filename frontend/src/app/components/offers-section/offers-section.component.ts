import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Offer {
  id: number;
  title: string;
  description: string;
  type: string;
  location: string;
  category?: string;
}

@Component({
  selector: 'app-offers-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="offers-section">
      <div class="container">
        <div class="section-header">
          <h2>Offres d'emploi recommandées</h2>
          <div class="underline"></div>
        </div>

        <div class="offers-grid">
          <div class="offer-card" *ngFor="let offer of recommendedOffers">
            <span class="offer-badge" *ngIf="offer.category">{{ offer.category }}</span>
            <h3>{{ offer.title }}</h3>
            <p>{{ offer.description }}</p>
            <div class="offer-meta">
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 2v2H3a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-5V2a1 1 0 00-1-1H9a1 1 0 00-1 1z"/>
                </svg>
                {{ offer.type }}
              </span>
              <span class="meta-item">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2c-2.76 0-5 2.24-5 5 0 3.13 3.35 7.39 4.45 8.65.31.35.89.35 1.2 0C11.65 14.39 15 10.13 15 7c0-2.76-2.24-5-5-5zm0 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
                {{ offer.location }}
              </span>
            </div>
            <button class="bookmark-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 2h10a1 1 0 011 1v16l-6-4-6 4V3a1 1 0 011-1z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="section-header" style="margin-top: 4rem;">
          <h2>Opportunités disponibles</h2>
          <div class="underline"></div>
        </div>

        <div class="opportunities-grid">
          <div class="opportunity-card" *ngFor="let opp of opportunities">
            <span class="category-badge">{{ opp.category }}</span>
            <h3>{{ opp.title }}</h3>
            <p>{{ opp.description }}</p>
            <div class="opportunity-footer">
              <div class="location-info">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2c-2.76 0-5 2.24-5 5 0 3.13 3.35 7.39 4.45 8.65.31.35.89.35 1.2 0C11.65 14.39 15 10.13 15 7c0-2.76-2.24-5-5-5zm0 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
                <span>{{ opp.location }}</span>
              </div>
              <button class="apply-btn">POSTULER</button>
            </div>
            <button class="bookmark-btn-small">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 2h10a1 1 0 011 1v16l-6-4-6 4V3a1 1 0 011-1z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="cta-section">
          <button class="discover-btn">
            DÉCOUVRIR TOUTES LES OFFRES
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 4l-1.41 1.41L13.17 10l-4.58 4.59L10 16l6-6-6-6z"/>
            </svg>
          </button>
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
    }

    .offer-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
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
    }

    .offer-meta {
      display: flex;
      gap: 1.5rem;
      color: #666;
      font-size: 0.9rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .bookmark-btn {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #999;
      transition: color 0.3s;
    }

    .bookmark-btn:hover {
      color: #ff7900;
    }

    .opportunities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .opportunity-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      position: relative;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .opportunity-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .category-badge {
      display: inline-block;
      background-color: #000;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .opportunity-card h3 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #000;
    }

    .opportunity-card p {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }

    .opportunity-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .location-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      font-size: 0.85rem;
    }

    .apply-btn {
      background-color: #000;
      color: white;
      border: none;
      padding: 0.5rem 1.25rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .apply-btn:hover {
      background-color: #ff7900;
    }

    .bookmark-btn-small {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #999;
      transition: color 0.3s;
    }

    .bookmark-btn-small:hover {
      color: #ff7900;
    }

    .cta-section {
      text-align: center;
      margin-top: 3rem;
    }

    .discover-btn {
      background-color: #000;
      color: white;
      border: none;
      padding: 1rem 2.5rem;
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.3s;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .discover-btn:hover {
      background-color: #ff7900;
    }

    @media (max-width: 768px) {
      .offers-grid,
      .opportunities-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class OffersSectionComponent {
  recommendedOffers: Offer[] = [
    {
      id: 1,
      title: 'Stage Développeur Web & Mobile (PFE)',
      description: 'Rejoignez notre équipe pour développer des solutions innovantes.',
      type: 'Stage',
      location: 'Lieu',
      category: 'WEB DEVELOPMENT'
    },
    {
      id: 2,
      title: 'Consultant Junior Cybersécurité',
      description: 'Rejoignez notre équipe pour développer des solutions innovantes.',
      type: 'Stage',
      location: 'Lieu',
      category: 'CYBERSECURITY'
    },
    {
      id: 3,
      title: 'Designer UX/UI (Alternance)',
      description: 'Rejoignez notre équipe pour développer des solutions innovantes.',
      type: 'Stage',
      location: 'Lieu',
      category: 'DESIGN'
    }
  ];

  opportunities: Offer[] = [
    {
      id: 4,
      title: 'Stage PFE - IA & Deep Learning pour l\'optimisation réseau',
      description: 'Rejoignez l\'équipe de recherche pour développer des modèles prédictifs innovants basés sur les données réseaux d\'Orange.',
      type: 'Stage',
      location: 'TUNIS, TN',
      category: 'DATA SCIENCE'
    },
    {
      id: 5,
      title: 'Développeur Fullstack React/Node - Cloud Services',
      description: 'Participation au développement de la nouvelle plateforme de gestion des services Cloud pour les entreprises partenaires.',
      type: 'Stage',
      location: 'CASABLANCA, MA',
      category: 'WEB DEVELOPMENT'
    },
    {
      id: 6,
      title: 'Analyste SOC Junior (Stage d\'Immersion)',
      description: 'Rejoignez l\'équipe sécurité pour l\'analyse des menaces et l\'automatisation des réponses aux incidents critiques via SOAR.',
      type: 'Stage',
      location: 'DAKAR, SN',
      category: 'CYBERSECURITY'
    }
  ];
}
