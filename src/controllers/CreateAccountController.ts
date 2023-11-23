import { Request, Response } from "express";
import { CreateAccountService } from "../services/CreateAccountService";

interface ExtendedRequest extends Request {
  user: string;
}

export class CreateAccountController {
  async handle(req: ExtendedRequest, res: Response) {
    
    const { branch, account } = req.body;

    const user_id = req.user;

    const service = new CreateAccountService();

    const result = await service.execute({ user_id, branch, account });
    
    if (result instanceof Error) {
      return res.status(401).json(result.message);
    }

    return res.json(result);
  }
}