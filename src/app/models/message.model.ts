export interface Message {
  id: number;
  text: string;
  senderId: number;
  receiverId: number;
  timestamp: Date;
  isRead: boolean;
}

export interface Contact {
  id: number;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  isOnline: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
}