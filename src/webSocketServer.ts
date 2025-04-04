import { WebSocketServer, WebSocket } from "ws";
import { PrismaClient } from "@prisma/client";

const wss = new WebSocketServer({ port: 8080 });
const prisma = new PrismaClient();

const clients = new Map(); // Maps usernames to WebSocket connections

wss.on("connection", (ws) => {
  console.log("New client connected.");

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === "register") {
        const { username } = data;
        clients.set(username, ws);
        console.log(`${username} registered successfully.`);
        ws.send(JSON.stringify({ msg: "Registered successfully" }));
      }

      if (data.type === "message") {
        const { sender, receiver, content } = data;

        // Save the message to the database
        const savedMessage = await prisma.message.create({
          data: {
            content,
            sender: { connect: { username: sender } },
            receiver: { connect: { username: receiver } }
          }
        });

        console.log(`Message from ${sender} to ${receiver}: ${content}`);

        // Send message to the receiver if online
        const receiverSocket = clients.get(receiver);
        if (receiverSocket) {
          receiverSocket.send(JSON.stringify({
            type: "message",
            from: sender,
            content,
            timestamp: savedMessage.timestamp
          }));
        }

        ws.send(JSON.stringify({ msg: "Message sent successfully" }));
      }
    } catch (error) {
      console.error("Error handling message:", error);
      ws.send(JSON.stringify({ error: "Internal Server Error" }));
    }
  });

  ws.on("close", () => {
    for (const [username, socket] of clients.entries()) {
      if (socket === ws) {
        clients.delete(username);
        console.log(`${username} disconnected.`);
        break;
      }
    }
  });
});

console.log("WebSocket server running on ws://localhost:8080");
