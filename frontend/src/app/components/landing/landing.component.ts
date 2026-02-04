import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { OffersSectionComponent } from '../offers-section/offers-section.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    OffersSectionComponent,
    FooterComponent
  ],
  template: `
    <div class="landing-page">
      <app-header></app-header>
      <app-hero></app-hero>
      <app-offers-section></app-offers-section>
      
      <!-- FAQ Section -->
      <section class="faq-section">
        <div class="container">
          <h2 class="section-title">QUESTIONS & RÉPONSES</h2>
          
          <div class="faq-list">
            <div class="faq-item" *ngFor="let faq of faqs" (click)="toggleFaq(faq)">
              <div class="faq-question">
                <span>{{ faq.question }}</span>
                <svg 
                  class="chevron" 
                  [class.rotated]="faq.isOpen"
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M5 7l5 5 5-5H5z"/>
                </svg>
              </div>
              <div class="faq-answer" [class.open]="faq.isOpen">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .landing-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .faq-section {
      padding: 4rem 0;
      background-color: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-title {
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      color: #ff7900;
      margin-bottom: 3rem;
    }

    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .faq-item {
      border-bottom: 1px solid #ddd;
      cursor: pointer;
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 0;
      font-weight: 600;
      color: #000;
      transition: color 0.3s;
    }

    .faq-question:hover {
      color: #ff7900;
    }

    .chevron {
      transition: transform 0.3s;
      color: #ff7900;
    }

    .chevron.rotated {
      transform: rotate(180deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    .faq-answer.open {
      max-height: 500px;
      transition: max-height 0.5s ease-in;
    }

    .faq-answer p {
      padding-bottom: 1.5rem;
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class LandingComponent {
  faqs = [
    {
      question: 'Comment postuler à un stage chez Orange ?',
      answer: 'Pour postuler à un stage chez Orange, créez un compte sur notre plateforme, complétez votre profil avec votre CV et vos informations académiques, puis parcourez les offres disponibles et cliquez sur "Postuler" pour les opportunités qui vous intéressent.',
      isOpen: false
    },
    {
      question: 'Quels sont les avantages d\'un stage ODC ?',
      answer: 'Les stages à Orange Digital Center offrent une expérience professionnelle enrichissante, l\'accès à des technologies de pointe, un encadrement par des experts, des formations continues, et la possibilité de contribuer à des projets réels ayant un impact significatif.',
      isOpen: false
    },
    {
      question: 'Le stage PFE peut-il déboucher sur une embauche ?',
      answer: 'Oui, Orange valorise les stagiaires performants. De nombreux PFE ont été suivis de propositions d\'embauche. Votre engagement, vos compétences et votre capacité à vous intégrer dans l\'équipe sont des facteurs clés pour une éventuelle opportunité d\'emploi.',
      isOpen: false
    }
  ];

  toggleFaq(faq: any) {
    faq.isOpen = !faq.isOpen;
  }
}
