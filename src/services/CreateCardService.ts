import { DeepPartial } from "typeorm";
import AppDataSource from "../database/connection";
import { Card } from "../entities/Card";

type CardRequest = {
  user_id: string;
  account_id: string;
  type: string;
  number: string;
  cvv: string;
}

function onlyNumbersCard(number: string) {
  const numericString = number.replaceAll(' ', '');

  return numericString;
}

export class CreateCardService {
  async execute({ user_id, account_id, type, number, cvv }: CardRequest): Promise<Card | Error> {
    number = onlyNumbersCard(number);

    const cardRepository = AppDataSource.getRepository(Card);

    const cardsCreated = await cardRepository.findBy({ account_id });

    if (cardsCreated.find((card) => card.type === 'physical' && type === 'physical')) {
      return new Error("Cartão físico já cadastrado.");
    }

    const createdCard = cardRepository.create({
      user_id,
      account_id,
      type,
      number,
      cvv,
    } as DeepPartial<Card>)

    await cardRepository.save(createdCard);

    delete createdCard.user_id;
    delete createdCard.account_id;

    createdCard.number.slice(-4);

    return createdCard;
  }
}