import { Request, Response } from "express";
import { GetCardsByPersonService } from "../services/GetCardsByPersonService";

interface ExtendedRequest extends Request {
  user: string;
}

export class GetCardsByPersonController {
  async handle(req: ExtendedRequest, res: Response) {

    const user_id = req.user;

    const service = new GetCardsByPersonService();

    const result = await service.execute(user_id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}