import prisma from "@repo/db/client";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", async (payload) => {
        const data = JSON.parse(payload.toString());
        switch (data.event) {
            case "hii":
                ws.send("Hello");
                break;
            case "user":
                try {
                    const user = await prisma.user.create({
                        data: {
                            username: data.payload.username,
                            password: data.payload.password
                        }
                    });
                    ws.send(JSON.stringify(user));
                } catch (error) {
                    console.log("Error: "+ error);
                }

                break;
            default:
                ws.send("Enter Valid event")
                break;
        }
    });
});