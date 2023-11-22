import { People } from "../entities/People";
import AppDataSource from "../database/connection";

type PeopleRequest = {
  name: string;
  document: string;
  password: string
}

function transDocString(doc: string): string {
  const numericString = doc.replace(/\D/g, '');

  return numericString;
}

export class CreatePeopleService {
  async execute({ name, document, password }: PeopleRequest): Promise<People | Error> {
    document = transDocString(document);

    const peopleRepository = AppDataSource.getRepository(People);

    if (
      await peopleRepository.findOne({
        where: {
          document
        }
      })
    ) {
      return new Error("Esse documento já foi registrado.");
    }
    
    const person = peopleRepository.create({
      name,
      document,
      password
    })

    await peopleRepository.save(person);

    delete person.password;

    return person;
  }
}