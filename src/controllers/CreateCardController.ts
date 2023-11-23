import { Request, Response } from "express";
import { CreateCardService } from "../services/CreateCardService";

interface ExtendedRequest extends Request {
  user: string;
}

export class CreateCardController {
  async handle(req: ExtendedRequest, res: Response) {
    
    const { type, number, cvv } = req.body;

    const user_id = req.user;

    const { account_id } = req.params;

    const service = new CreateCardService();

    const result = await service.execute({ user_id, account_id, type, number, cvv });
    
    if (result instanceof Error) {
      return res.status(401).json(result.message);
    }

    return res.json(result);
  }
}