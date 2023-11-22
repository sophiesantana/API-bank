import { People } from "../entities/People";
import AppDataSource from "../database/connection";

type PeopleRequest = {
  name: string;
  document: string;
  password: string
}

export class PeopleService {
  async execute({ name, document, password }: PeopleRequest): Promise<People | Error> {
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
    return person;
  }
}