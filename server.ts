// This server REQUIRES the Deno runtime, run it with
// deno run --allow-net --allow-read server.ts

import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";

interface Message {
  username: string,
  text: string,
  drawing: string,
};

var messages: Message[] = [];
var sockets: WebSocket[] = [];

async function handleWs(sock: WebSocket) {
  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        // when a new person joins send them the old messages
        if (ev === "joined") {
          console.log("new user joined");
          sockets.push(sock);
          sock.send(JSON.stringify(messages))
        } else {
          const msg = JSON.parse(ev);
          messages.push(msg);
          for (sock of sockets) {
            sock.send(ev);
          }
        }
      } else if (isWebSocketCloseEvent(ev)) {
        // close
        const { code, reason } = ev;
        console.log("ws:Close", code, reason);
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);

    if (!sock.isClosed) {
      await sock.close(1000).catch(console.error);
    }
  }
}

if (import.meta.main) {
  const port = Deno.args[0] || "8081";
  console.log(`websocket server is running on :${port}`);

  for await (const req of serve(`:${port}`)) {
    const { conn, r: bufReader, w: bufWriter, headers } = req;

    acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    })
      .then(handleWs)
      .catch(async (err) => {
        console.error(`failed to accept websocket: ${err}`);
        await req.respond({ status: 400 });
      });
  }
}
