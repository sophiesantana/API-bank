import { Request, Response } from "express";
import { GetAccountsService } from "../services/GetAccountsService";

interface ExtendedRequest extends Request {
  user: string;
}

export class GetAccountsController {
  async handle(req: ExtendedRequest, res: Response) {

    const user_id = req.user;

    const service = new GetAccountsService();

    const result = await service.execute(user_id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}