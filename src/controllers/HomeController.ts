import { Request, Response, NextFunction } from "express";
import { allClients } from "./WebsocketController";

export class HomeController {
  static startTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    try {
      console.log(req.body);
      const client = allClients.get(req.body.identity);
      if (!client) {
        throw Error("Client not found");
      }

      const response = client.send(
        JSON.stringify([
          2,
          "58d877f6-3284-4da4-9698-00035421c1f5",
          "RemoteStartTransaction",
          { connectorId: 1, idTag: "XXXXXXXX" },
        ])
      );

      if (response.status === "Accepted") {
        console.log("Remote start worked!");
        res.json({ message: "Remote start worked!" });
      } else {
        console.log("Remote start rejected.");
        res.json({ message: "Remote start rejected!" });
      }
    } catch (err) {
      next(err);
    }
  }
}
