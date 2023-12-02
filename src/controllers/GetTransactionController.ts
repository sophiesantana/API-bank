import { Request, Response } from "express";
import { GetTransactionService } from "../services/GetTransactionService";

export class GetTransactionController {
  async handle(req: Request, res: Response) {

    const { account_id } = req.params;

    const { type, search } = req.query;

    const service = new GetTransactionService();

    const result = await service.execute(account_id, type as string, search as string);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}