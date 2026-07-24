import { Component, ElementRef, effect, inject, input, signal, viewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Message } from '../models/message.model';
import { chatDisplayName } from '../chat-title';

@Component({
  selector: 'app-chat-conversation',
  imports: [DatePipe, FormsModule],
  templateUrl: './chat-conversation.html',
  styleUrl: './chat-conversation.css',
})
export class ChatConversation {
  private readonly chatService = inject(ChatService);
  private readonly authService = inject(AuthService);

  chatId = input.required<number>();

  protected readonly chatName = signal<string | null>(null);
  protected readonly messages = signal<Message[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly sending = signal(false);
  protected readonly sendError = signal<string | null>(null);
  protected newMessage = '';

  private readonly messagesBox = viewChild<ElementRef<HTMLElement>>('messagesBox');

  constructor() {
    // Перезагружаем переписку при каждой смене выбранного чата
    effect(() => {
      const chatId = this.chatId();
      this.loadChat(chatId);
      this.loadMessages(chatId);
    });
  }

  private loadChat(chatId: number): void {
    this.chatName.set(null);
    this.chatService.getChat(chatId).subscribe({
      next: (chat) => {
        if (chatId !== this.chatId()) return;
        this.chatName.set(chatDisplayName(chat, this.authService.getCurrentUser()?.sub));
      },
      // Имя чата некритично: при ошибке остаётся запасной заголовок «Чат #id»
      error: () => {},
    });
  }

  private loadMessages(chatId: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.sendError.set(null);
    this.messages.set([]);
    this.chatService.getMessages(chatId).subscribe({
      next: (messages) => {
        // Ответ мог прийти уже после переключения на другой чат
        if (chatId !== this.chatId()) return;
        this.messages.set([...messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
        this.loading.set(false);
        this.scrollToBottom();
      },
      error: () => {
        if (chatId !== this.chatId()) return;
        this.error.set('Не удалось загрузить сообщения');
        this.loading.set(false);
      },
    });
  }

  protected send(): void {
    const content = this.newMessage.trim();
    if (!content || this.sending()) return;

    const chatId = this.chatId();
    this.sending.set(true);
    this.sendError.set(null);
    this.chatService.sendMessage(chatId, content).subscribe({
      next: (message) => {
        if (chatId !== this.chatId()) return;
        this.messages.update((messages) => [...messages, message]);
        this.newMessage = '';
        this.sending.set(false);
        this.scrollToBottom();
      },
      error: () => {
        if (chatId !== this.chatId()) return;
        this.sendError.set('Не удалось отправить сообщение');
        this.sending.set(false);
      },
    });
  }

  protected isOwn(message: Message): boolean {
    return message.author.id === this.authService.getCurrentUser()?.sub;
  }

  private scrollToBottom(): void {
    // Ждём, пока Angular отрисует новые сообщения
    setTimeout(() => {
      const el = this.messagesBox()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }
}
