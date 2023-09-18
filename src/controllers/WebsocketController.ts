import WebSocket from "ws";
import {Request} from "express";

export const allClients = new Map()

export class WebSocketServer {
  private wss: WebSocket.Server;

  public constructor() {
    this.wss = new WebSocket.Server({ port:3003 });
  }

  public handleConnections(): void {
    this.wss.on("connection", (ws,req:Request) => {
      console.log("WebSocket connection established");

      const identity = req.url.split('/')
      console.log('identity',identity)
      allClients.set(identity[3], ws)
      console.log(">>head", req.headers);
      ws.on("message", function incoming(message) {
        //Make incoming JSON into javascript object
        const msg = JSON.parse(message.toString());
    
        // Print whole message to console
        console.log(JSON.stringify(msg));
    
        // Print only message type to console. For example BootNotification, Heartbeat etc...
        console.log("Message type: " + msg[2]);
    
        // Send response depending on what the message type is
        if (msg[2] === "BootNotification") {
          ws.send(
            JSON.stringify([
              3,
              msg[1],
              { status: "Accepted", currentTime: new Date(), interval: 60 },
            ])
          );
          //Send correct response
        } // Add all the message types
        if (msg[2] === "Heartbeat") {
          ws.send(
            JSON.stringify([
              3,
              msg[1],
              {
                currentTime: new Date(),
              },
            ])
          );
        }
        if (msg[2] == "StatusNotification") {
          ws.send(
            JSON.stringify([
              3,
              msg[1],
              {
              },
            ])
          );
        }
        if (msg[2] == "StartTransaction") {
          // const client = allClients.get('CS-KEBA-00001');
          ws.send(
            JSON.stringify([
              3,
              msg[1],
              {
                idTagInfo: { status: "Accepted" },
                transactionId: "123",
              },
            ])
          );
        }
      });
    });
  }

  public handleBootNotifications():void{

  }

  public handleHeartbeat():void{

  }

  public handleStatusNotification():void{

  }
  
  public handleStartTransaction():void{
    
  }

}
