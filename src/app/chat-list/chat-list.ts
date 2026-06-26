import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Chat } from '../models/message.model';

@Component({
  selector: 'app-chat-list',
  imports: [],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.css',
})
export class ChatList implements OnInit {
  private readonly chatService = inject(ChatService);
  private readonly authService = inject(AuthService);

  selectedChatId = input<number | null>(null);
  chatSelected = output<number>();

  protected readonly chats = signal<Chat[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.chatService.getChats().subscribe({
      next: (chats) => {
        this.chats.set(chats);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Не удалось загрузить чаты');
        this.loading.set(false);
      },
    });
  }

  selectChat(chatId: number): void {
    this.chatSelected.emit(chatId);
  }

  protected chatTitle(chat: Chat): string {
    if (chat.type === 'group') {
      return chat.name ?? 'Группа';
    }
    const currentUserId = this.authService.getCurrentUser()?.sub;
    const other = chat.participants.find((p) => p.id !== currentUserId);
    return other?.username ?? 'Диалог';
  }

  protected lastMessageText(chat: Chat): string {
    return chat.messages?.at(-1)?.content ?? '';
  }
}
