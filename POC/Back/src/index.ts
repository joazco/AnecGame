import http from "http";
import { Server } from "socket.io";
import SocketModule from "./socket";
import Rest from "./rest";
import normalizePort from "./utils/normalizePort";
import { connectDatabase } from "./database";

const { init: initSocket } = SocketModule();
const { request: requestRest } = Rest();

declare const global: any;

var port = normalizePort(process.env.PORT || "4000");
global.isProd = port !== 4000;
// Spinning the http server and the websocket server.
const httpServer = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Request-Method", "*");
  response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  response.setHeader("Access-Control-Allow-Headers", "*");
  if (request.method === "POST") {
    request.on("data", (data) => {
      try {
        const jsonBody = JSON.parse(Buffer.from(data).toString());
        requestRest(jsonBody, response);
      } catch (e) {
        response.statusCode = 500;
        response.end(`<html><body><h1>Anec Server</h1></body></html>`);
      }
    });
    return;
  }
  response.end(`<html><body><h1>Anec Server 1.0.0</h1></body></html>`);
});

global.rooms = [];

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

initSocket(io);

// connect to Database
connectDatabase()
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("database ko");
  });

httpServer.listen(port);
