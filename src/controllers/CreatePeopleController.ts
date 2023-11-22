import { Request, Response } from "express";
import { CreatePeopleService } from "../services/CreatePeopleService";

export class CreatePeopleController {
  async handle(req: Request, res: Response) {
    const { name, document, password } = req.body;

    const service = new CreatePeopleService();

    const result = await service.execute({ name, document, password });
    
    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}