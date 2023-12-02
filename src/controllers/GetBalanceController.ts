import { Request, Response } from "express";
import { GetBalanceService } from "../services/GetBalanceService";

export class GetBalanceController {
  async handle(req: Request, res: Response) {

    const { account_id } = req.params;

    const service = new GetBalanceService();

    const result = await service.execute(account_id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}