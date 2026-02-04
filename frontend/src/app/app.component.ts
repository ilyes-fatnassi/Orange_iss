import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header>
        <h1>🎓 ISS Orange</h1>
        <p>Internship & PFE Management Platform</p>
      </header>
      <main>
        <router-outlet></router-outlet>
        <div class="welcome-message">
          <h2>Welcome to ISS Orange!</h2>
          <p>The development environment is ready. Start building features! 🚀</p>
          <div class="info">
            <p><strong>Backend API:</strong> <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
            <p><strong>API Docs:</strong> <a href="http://localhost:3000/api/docs" target="_blank">http://localhost:3000/api/docs</a></p>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    header {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
      margin-bottom: 30px;
    }

    header h1 {
      color: var(--orange-primary, #FF7900);
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    header p {
      color: #666;
      font-size: 1.1rem;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-message {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
    }

    .welcome-message h2 {
      color: #333;
      margin-bottom: 20px;
    }

    .welcome-message p {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 15px;
    }

    .info {
      margin-top: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .info p {
      margin: 10px 0;
    }

    .info a {
      color: var(--orange-primary, #FF7900);
      text-decoration: none;
      font-weight: 500;
    }

    .info a:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {
  title = 'iss-orange-frontend';
}
