import uniqid from "uniqid";

import { EventsEmit, Room } from "../types";

declare const global: any;

const camelize = (str: string) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");

const getRandomInt = (n: number) => {
  return Math.floor(Math.random() * n);
};
const shuffle = (s: string) => {
  let str = s;
  const arr = str.split(""); // Convert String to array
  const n = arr.length; // Length of the array

  for (var i = 0; i < n - 1; ++i) {
    const j = getRandomInt(n); // Get random of [0, n-1]

    const temp = arr[i]; // Swap arr[i] and arr[j]
    arr[i] = arr[j];
    arr[j] = temp;
  }

  str = arr.join(""); // Convert Array to string
  return str; // Return shuffled string
};

export const createRoom = (id: string) => {
  const newRoom: Room = {
    id,
    users: [],
    themes: [],
    admin: "",
    title: "",
    autoConnect: false,
  };
  global.rooms.push(newRoom);
  return newRoom;
};

export const removeRoom = (id: string) =>
  (global.rooms = global.rooms.filter((room: Room) => room.id !== id));

export const findRoom = (id: string) => {
  const rooms: Room[] = global.rooms;
  return rooms.find((r) => r.id === id);
};

export const findUser = (room: Room, userID: string) =>
  room.users.find((u) => u.userID === userID);
export const findUserByUsername = (room: Room, username: string) =>
  room.users.find((u) => u.username.toLowerCase() === username.toLowerCase());

export const generateRoomId = (): string => {
  let id = uniqid();
  const date = new Date();
  // current date
  // adjust 0 before single digit date
  const day = ("0" + date.getDate()).slice(-2);
  // current month
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  // current year
  const year = date.getFullYear().toString();
  // current hours
  const hours = date.getHours().toString();
  // current minutes
  const minutes = date.getMinutes().toString();
  // current seconds
  const seconds = date.getSeconds().toString();
  id = shuffle(`${id}${day}${month}${year}${hours}${minutes}${seconds}`);

  return id;
};

export const saveGame = (room: Room, event: EventsEmit, data?: any) => {
  switch (event) {
    case "game started":
    case "speach":
    case "resume votes":
    case "vote":
    case "end game":
    case "show scoring":
      room.save = { event: camelize(event), data };
    default:
      return;
  }
};
