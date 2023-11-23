import AppDataSource from "../database/connection";
import { People } from "../entities/People";
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '10m',
  algorithm: 'HS256',
};

type PeopleRequest = {
  document: string;
  password: string
}

function transDocString(doc: string): string {
  const numericString = doc.replace(/\D/g, '');

  return numericString;
}

export class LoginService {
  async execute({ document, password }: PeopleRequest): Promise<People | Error> {
    document = transDocString(document);

    const loginRepository = AppDataSource.getRepository(People);

    const user = await loginRepository.findOne({ where: { document } });
    
    if (!user || user.password !== password) {
      return new Error("Usuário ou senha inválidos.");
    }

    const token = jwt.sign({ data: { user_id: user.id } }, secret, jwtConfig);

    return token;
  }
}