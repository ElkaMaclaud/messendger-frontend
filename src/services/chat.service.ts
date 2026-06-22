import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Chat, Message } from '../app/models/message.model';

// Обёртка над REST-эндпоинтами чатов и сообщений.
// JWT в заголовок подставляет authInterceptor - здесь его трогать не нужно
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/chats`;

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl);
  }

  getChat(chatId: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.baseUrl}/${chatId}`);
  }

  getMessages(chatId: number, page = 1, limit = 50): Observable<Message[]> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Message[]>(`${this.baseUrl}/${chatId}/messages`, { params });
  }

  sendMessage(chatId: number, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/${chatId}/messages`, { content });
  }
}
