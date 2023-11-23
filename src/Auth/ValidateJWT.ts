import { NextFunction, Request, Response } from "express";
import AppDataSource from "../database/connection";
import { People } from "../entities/People";
import jwt from 'jsonwebtoken';
require('dotenv').config();

type JwtPayload = {
  data: {
    user_id: string
  }
}

interface ExtendedRequest extends Request {
  user: string;
}

const secret = process.env.JWT_SECRET;

module.exports = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const bearerToken = req.header('Authorization');
  
  if (!bearerToken) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const validateRepository = AppDataSource.getRepository(People);

    const { data } = jwt.verify(token, secret) as JwtPayload;

    const user = await validateRepository.findOneBy({ id: data.user_id });
    
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}