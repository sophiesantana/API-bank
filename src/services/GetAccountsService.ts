import AppDataSource from "../database/connection";
import { Account } from "../entities/Account";

export class GetAccountsService {
  async execute(user_id: string): Promise<Account[] | Error> {
    const accountsRepository = AppDataSource.getRepository(Account);

    const getAccounts = accountsRepository.findBy({ user_id })

    return getAccounts;
  }
}