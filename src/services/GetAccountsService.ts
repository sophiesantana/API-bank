import AppDataSource from "../database/connection";
import { Account } from "../entities/Account";

export class GetAccountsService {
  async execute(user_id: string): Promise<Account[] | Error> {
    const accountsRepository = AppDataSource.getRepository(Account);

    const getAccounts = accountsRepository.findBy({ user_id });

    const formatResult = (await getAccounts).map((account) => {
      delete account.user_id;
      delete account.balance;
      return account;
    })

    return formatResult;
  }
}