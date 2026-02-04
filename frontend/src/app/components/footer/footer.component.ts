import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="logo-box">orange</div>
            <p class="footer-description">
              Le portail de stages Orange Digital Center connecte les talents de demain avec les défis technologiques d'aujourd'hui.
            </p>
          </div>

          <div class="footer-section">
            <h3>NAVIGATION</h3>
            <ul>
              <li><a href="#">Accueil</a></li>
              <li><a href="#">Toutes les offres</a></li>
              <li><a href="#">ODC Network</a></li>
              <li><a href="#">Actualités</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3>SUPPORT</h3>
            <ul>
              <li><a href="#">Contact</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Données personnelles</a></li>
              <li><a href="#">Mentions légales</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ORANGE 2024 - TOUS DROITS RÉSERVÉS.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #000;
      color: white;
      padding: 3rem 0 1rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 2rem;
    }

    .footer-section h3 {
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 1rem;
      letter-spacing: 0.5px;
    }

    .logo-box {
      background-color: #ff7900;
      color: white;
      padding: 0.5rem 1rem;
      font-weight: bold;
      font-size: 1.2rem;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 1rem;
    }

    .footer-description {
      color: #999;
      line-height: 1.6;
      font-size: 0.9rem;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.75rem;
    }

    .footer-section ul li a {
      color: #999;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s;
    }

    .footer-section ul li a:hover {
      color: #ff7900;
    }

    .footer-bottom {
      border-top: 1px solid #333;
      padding-top: 1.5rem;
      text-align: center;
      color: #666;
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  `]
})
export class FooterComponent {}
