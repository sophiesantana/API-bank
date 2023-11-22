import { Request, Response } from "express";
import { PeopleService } from "../services/PeopleService";

export class PeopleController {
  async handle(req: Request, res: Response) {
    const { name, document, password } = req.body;

    const service = new PeopleService();

    const result = await service.execute({ name, document, password });
    
    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}