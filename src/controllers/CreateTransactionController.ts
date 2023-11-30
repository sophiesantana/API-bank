import { Request, Response } from "express";
import { CreateTransactionService } from "../services/CreateTransactionService";

interface ExtendedRequest extends Request {
  user: string;
}

export class CreateTransactionController {
  async handle(req: ExtendedRequest, res: Response) {
    
    const { value, description } = req.body;

    const user_id = req.user;

    const { account_id } = req.params;

    const service = new CreateTransactionService();

    const result = await service.execute({ user_id, account_id, value, description });
    
    if (result instanceof Error) {
      return res.status(401).json(result.message);
    }

    return res.json(result);
  }
}