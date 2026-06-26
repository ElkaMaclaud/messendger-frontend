import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chat-conversation',
  imports: [],
  templateUrl: './chat-conversation.html',
  styleUrl: './chat-conversation.css',
})
export class ChatConversation {
  chatId = input.required<number>();
}
