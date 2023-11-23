import AppDataSource from "../database/connection";
import { Card } from "../entities/Card";

type ReturnCard = {
  id: string;
  type: string;
  number: string;
  cvv: string;
  created_at: Date;
  updated_at: Date;
}

export class GetCardsByPersonService {
  async execute(user_id: string): Promise<ReturnCard[] | Error> {
    const cardsRepository = AppDataSource.getRepository(Card);

    const getCards = cardsRepository.findBy({ user_id });

    const formatResult = (await getCards).map((card): ReturnCard => {
      return {
        'id': card.id,
        'type': card.type,
        'number': card.number.slice(-4),
        'cvv': card.cvv,
        'created_at': card.created_at,
        'updated_at': card.updated_at
      }
    })

    return formatResult;
  }
}