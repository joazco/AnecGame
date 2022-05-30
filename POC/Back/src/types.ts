import { Socket } from "socket.io";

export interface ISocket extends Socket {
  username: string;
  roomID?: string;
  // other additional attributes here, example:
  // surname?: string;
}

export type EventsEmit =
  | "join room done"
  | "update users"
  | "game started"
  | "wait players"
  | "anecdote validate"
  | "speach"
  | "vote"
  | "update user"
  | "all voted"
  | "update users"
  | "resume votes"
  | "end game"
  | "speach"
  | "show scoring";

export type Vote = {
  anecdote: string;
  value: boolean;
};

export type AvatarType =
  | "administrator"
  | "hacker"
  | "woman"
  | "man"
  | "kitty"
  | "cat"
  | "rainbowFlag"
  | "lgbtIcon"
  | "dinosaur";

export type User = {
  userID: string;
  username: string;
  connected: boolean;
  passed?: boolean;
  anecdote?: {
    value: string;
    truthly: "true" | "false";
  };
  vote?: "true" | "false";
  score: number;
  avatar: AvatarType;
};

export type Save = {
  event: string;
  data: any;
};

export type Room = {
  id: string;
  users: User[];
  admin: string;
  themes: string[];
  title: string;
  autoConnect: boolean;
  save?: Save;
};

export type Anecdote = {
  value: string;
  truthly: "true" | "false";
};

export interface Response {
  room: string;
}
export interface Response {
  anecdote: Anecdote;
}
export interface Response extends User {}
export interface Response {
  vote: "true" | "false";
}
export interface Response {
  gamer: string;
}

export interface ArgsRequest {
  gameName: string;
  pseudo: string;
  themes: string[];
  room: string;
}

export type DataRequest = {
  function: "createGame" | "autoConnect" | "getPseudo" | "getRoomInfo";
  args: ArgsRequest;
};
