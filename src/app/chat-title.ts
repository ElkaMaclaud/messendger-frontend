import { Chat } from './models/message.model';

export function chatDisplayName(chat: Chat, currentUserId: number | undefined): string {
  if (chat.type === 'group') {
    return chat.name ?? 'Группа';
  }
  const other = chat.participants.find((p) => p.id !== currentUserId);
  return other?.username ?? 'Диалог';
}
