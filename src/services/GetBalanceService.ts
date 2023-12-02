import AppDataSource from "../database/connection";
import { Account } from "../entities/Account";

export class GetBalanceService {
  async execute(account_id: string): Promise<object | Error> {
    const accountRepository = AppDataSource.getRepository(Account);

    const getAccount = await accountRepository.findBy({ id: account_id });

    const [formatResult] = getAccount.map((account): object => {
      return {
        'balance': account.balance
      };
    })

    return formatResult;
  }
}