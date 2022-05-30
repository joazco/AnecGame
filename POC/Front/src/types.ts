export type RoomStorage = {
  lastRoomID: string;
  username: string;
  avatar: string;
};
export type UserSocket = {
  username: string;
  userID: string;
};

export type Step =
  | "gameStarted"
  | "speach"
  | "vote"
  | "resumeVotes"
  | "endGame"
  | "showScoring"
  | null;
export type Anecdote = {
  value: string;
  truthly: "true" | "false";
};
export type Gamer = Pick<UserSocket, "username" | "userID"> & {
  anecdote?: Anecdote;
  avatar: string;
  score: number;
};
export interface RequestType {
  user: UserSocket;
  save?: { event: Step; data?: any };
}
export interface RequestType {
  username: string;
}
export interface RequestType {
  userID: string;
  anecdote: string;
}
export interface RequestType {
  gamer: string;
}
export interface RequestType {
  winners: { username: string; avatar: string }[];
  truthly: "true" | "false";
  currentUserHadWinTo: { username: string; avatar: string } | null;
}
export interface RequestType {
  users: Gamer[];
}
export interface RequestType {
  vote: "true" | "false";
  allVoted: boolean;
}
export interface ResponseRest {
  userFind: "ko" | "ok";
}
export interface ResponseRest {
  id: string;
  title: string;
  themes: string[];
  admin: string;
}
export type SocketCallback = (...args: any[]) => void;
export type UseSocketProps = {
  onJoinRoomDone?: SocketCallback;
  onUpdateUsers?: SocketCallback;
  onGameStarted?: SocketCallback;
  onWaitPlayers?: SocketCallback;
  onAnecdoteValidated?: SocketCallback;
  onSpeach?: SocketCallback;
  onVote?: SocketCallback;
  onAllVoted?: SocketCallback;
  onResumeVotes?: SocketCallback;
  onEndGame?: SocketCallback;
  onShowScoring?: SocketCallback;
};
export type SignInProps = {
  onConnection: (pseudo: string, avatar: string) => void;
};

export type StateSignInReducer = {
  avatar: string | null;
  pseudo: string;
  loading: boolean;
  stopKeyUp: boolean;
  canSendPseudo: boolean;
  showError: boolean;
};
export type ActionSignInReducer = {
  type:
    | "setAvatar"
    | "setPseudo"
    | "setStopKeyUp"
    | "setLoading"
    | "getPseudoThen";
  value: any;
};

export type RoomInfo = Pick<ResponseRest, "id" | "title" | "themes" | "admin">;
export type StepgameStartedProps = {};

export type ConnectedProps = {
  save?: RequestType["save"];
};
export type StepSpeachProps = {
  data: RequestType;
};
export type StepVoteProps = StepSpeachProps;
export type StateConnectedReducer = {
  step: Step;
  data?: RequestType;
};
export type ActionConnectedReducer = {
  type: NonNullable<Step>;
  value?: RequestType;
};
export type StepShowScoringProps = StepSpeachProps;
