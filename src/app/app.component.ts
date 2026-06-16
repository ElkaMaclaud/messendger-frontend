import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatList } from './chat-list/chat-list';
import { ChatConversation } from './chat-conversation/chat-conversation';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatList, ChatConversation],
  template: `
    <div class="app-container">
      <!-- Шапка приложения -->
      <header class="app-header">
        <div class="header-content">
          <div class="logo">
            <h1>💬 {{ title }}</h1>
          </div>
          <div class="user-actions">
            @if (isLoggedIn) {
              <div class="user-info">
                <span class="username">{{ currentUsername }}</span>
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
              <p>Войдите в аккаунт, чтобы начать общение</p>
              <form class="login-form" (ngSubmit)="login()">
                <input
                  class="login-input"
                  type="text"
                  name="username"
                  placeholder="Имя пользователя"
                  autocomplete="username"
                  [(ngModel)]="username"
                  [disabled]="loading"
                  required
                />
                <input
                  class="login-input"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  autocomplete="current-password"
                  [(ngModel)]="password"
                  [disabled]="loading"
                  required
                />
                @if (loginError) {
                  <p class="login-error">{{ loginError }}</p>
                }
                <button
                  class="cta-button"
                  type="submit"
                  [disabled]="loading || !username || !password"
                >
                  {{ loading ? 'Вход…' : 'Войти' }}
                </button>
              </form>
            </div>
          </div>
        } @else {
          <!-- Интерфейс мессенджера -->
          <div class="messenger-interface">
            <div class="chat-container">
              <!-- Список чатов слева -->
              <div class="chat-list-container">
                <app-chat-list 
                  [selectedChatId]="selectedChatId"
                  (chatSelected)="onChatSelected($event)">
                </app-chat-list>
              </div>
              
              <!-- Переписка справа -->
              <div class="conversation-container">
                @if (selectedChatId) {
                  <app-chat-conversation 
                    [chatId]="selectedChatId">
                  </app-chat-conversation>
                } @else {
                  <div class="no-chat-selected">
                    <div class="empty-state">
                      <h2>💬</h2>
                      <h3>Выберите чат</h3>
                      <p>Выберите чат из списка слева, чтобы начать общение</p>
                    </div>
                  </div>
                }
              </div>
            </div>
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
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
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

    .cta-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .cta-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .login-input {
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 10px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .login-input:focus {
      border-color: #667eea;
    }

    .login-error {
      color: #e23b3b;
      margin: 0;
      font-size: 0.9rem;
    }

    /* Интерфейс мессенджера */
    .messenger-interface {
      height: calc(100vh - 120px);
      max-width: 1400px;
      margin: 0 auto;
      background: white;
    }

    .chat-container {
      display: flex;
      height: 100%;
      border: 1px solid #e0e0e0;
    }

    .chat-list-container {
      width: 35%;
      min-width: 300px;
      max-width: 400px;
      border-right: 1px solid #e0e0e0;
      overflow-y: auto;
      background: white;
    }

    .conversation-container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .no-chat-selected {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background: #f8f9fa;
    }

    .empty-state {
      text-align: center;
      color: #666;
    }

    .empty-state h2 {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #333;
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

      .chat-list-container {
        width: 100%;
        max-width: 100%;
      }

      .conversation-container {
        display: none;
      }

      .conversation-container.active {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
    }
  `]
})
export class AppComponent {
  private readonly authService = inject(AuthService);

  title = 'QuickChat';
  selectedChatId: string | null = null;

  username = '';
  password = '';
  loading = false;
  loginError = '';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUsername(): string {
    return this.authService.getCurrentUser()?.username ?? 'Пользователь';
  }

  login() {
    if (!this.username || !this.password) {
      return;
    }
    this.loading = true;
    this.loginError = '';
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.password = '';
      },
      error: () => {
        this.loading = false;
        this.loginError = 'Не удалось войти. Проверьте имя пользователя и пароль.';
      },
    });
  }

  logout() {
    this.authService.logout();
    this.selectedChatId = null;
    this.username = '';
    this.password = '';
  }

  onChatSelected(chatId: string) {
    this.selectedChatId = chatId;
  }
}