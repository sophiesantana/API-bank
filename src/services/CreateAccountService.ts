import AppDataSource from "../database/connection";
import { Account } from "../entities/Account";

type AccountRequest = {
  user_id: string
  branch: string;
  account: string;
}

function addHyphen(accountNum: string): string {
  const accWithHyphen = accountNum.slice(0, accountNum.length - 1) + '-' + accountNum.slice(-1);

  return accWithHyphen;
}

export class CreateAccountService {
  async execute({ user_id, branch, account }: AccountRequest): Promise<Account | Error> {
    account = addHyphen(account);

    const accountRepository = AppDataSource.getRepository(Account);

    if (
      await accountRepository.findOne({
        where: {
          account
        }
      })
    ) {
      return new Error("Essa conta já foi registrada.");
    }

    const createdAccount = accountRepository.create({
      user_id,
      branch,
      account,
    })

    await accountRepository.save(createdAccount);

    delete createdAccount.user_id;
    delete createdAccount.balance;

    return createdAccount;
  }
}