export enum InputType {
  search = "search",
  message = "message"
}

export enum DataType {
  contacts = 'contacts',
  messages = 'messages'
}

export enum MessageType {
  in = 'in',
  out = 'out'
}

export interface UserResponseInfo {
  name: {
    title: string;
    first: string;
    last: string;
  };

  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  }
}

export interface UsersResponseInfo {
  results: UserResponseInfo[];

  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface User {
  name: string;
  picture: string;
}

export interface MessageText {
  text: string;
  date: Date;
}

export interface Message {
  mailer: User;
  receiver: User;
  messageText: MessageText;
  type:  MessageType;
}

export interface Answer {
  value: string;
}
