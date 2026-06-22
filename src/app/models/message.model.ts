// Модели данных, согласованные с бэкендом 
export interface User {
  id: number;
  username: string;
}

export type ChatType = 'private' | 'group';


export interface Message {
  id: number;
  content: string;
  author: User;
  isEdited: boolean;
  replyToId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: number;
  type: ChatType;
  name: string | null;
  avatar: string | null;
  participants: User[];
  messages?: Message[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
