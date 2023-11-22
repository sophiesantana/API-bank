import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

export class LoginController {
  async handle(req: Request, res: Response) {
    const { document, password } = req.body;

    const service = new LoginService();

    const result = await service.execute({ document, password });
    
    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json({ "token": `Bearer ${result}` });
  }
}