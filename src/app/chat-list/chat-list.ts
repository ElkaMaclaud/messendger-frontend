import { Component, input, output } from '@angular/core';

interface ChatListItem {
  id: string;
  name: string;
  lastMessage: string;
}

@Component({
  selector: 'app-chat-list',
  imports: [],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.css',
})
export class ChatList {
  selectedChatId = input<string | null>(null);
  chatSelected = output<string>();
  protected readonly chats: ChatListItem[] = [
    { id: '1', name: 'Алиса', lastMessage: 'Привет!' },
    { id: '2', name: 'Боб', lastMessage: 'Увидимся завтра' },
    { id: '3', name: 'Команда', lastMessage: 'Готов релиз' },
  ];

  selectChat(chatId: string): void {
    this.chatSelected.emit(chatId);
  }
}
