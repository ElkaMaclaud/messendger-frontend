import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], 
  template: `
    <div class="app-container">
      <!-- Шапка приложения -->
      <header class="app-header">
        <div class="header-content">
          <div class="logo">
            <h1>💬 {{ title }}</h1>
          </div>
          <div class="user-actions">
            @if (!isLoggedIn) {
              <button class="login-btn" (click)="login()">Войти</button>
            } @else {
              <div class="user-info">
                <span class="username">Пользователь</span>
                <button class="logout-btn" (click)="logout()">Выйти</button>
              </div>
            }
          </div>
        </div>
      </header>

      <!-- Основной контент -->
      <main class="main-content">
        @if (!isLoggedIn) {
          <div class="welcome-section">
            <div class="welcome-card">
              <h2>Добро пожаловать в мессенджер!</h2>
              <p>Войдите в систему, чтобы начать общение</p>
              <button class="cta-button" (click)="login()">Начать общение</button>
            </div>
          </div>
        } @else {
          <!-- Здесь будет интерфейс мессенджера -->
          <div class="messenger-interface">
            <router-outlet></router-outlet>
          </div>
        }
      </main>

      <!-- Подвал -->
      <footer class="app-footer">
        <p>&copy; 2024 {{ title }}. Все права защищены.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .user-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .login-btn, .cta-button {
      background: rgba(255,255,255,0.2);
      border: 2px solid white;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .login-btn:hover, .cta-button:hover {
      background: white;
      color: #667eea;
    }

    .logout-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid white;
      color: white;
      padding: 0.3rem 1rem;
      border-radius: 15px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .logout-btn:hover {
      background: rgba(255,255,255,0.2);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .username {
      font-weight: 500;
    }

    .main-content {
      flex: 1;
      background: #f8f9fa;
    }

    .welcome-section {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70vh;
      padding: 2rem;
    }

    .welcome-card {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
      width: 100%;
    }

    .welcome-card h2 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    .welcome-card p {
      color: #666;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }

    .cta-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .messenger-interface {
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .app-footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: auto;
    }

    /* Адаптивность */
    @media (max-width: 768px) {
      .header-content {
        padding: 0 1rem;
      }
      
      .welcome-card {
        padding: 2rem;
        margin: 1rem;
      }
      
      .welcome-card h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'QuickChat';
  isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
    console.log('Пользователь вошел в систему');
  }

  logout() {
    this.isLoggedIn = false;
    console.log('Пользователь вышел из системы');
  }
}