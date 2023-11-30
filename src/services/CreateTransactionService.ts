import AppDataSource from "../database/connection";
import { Account } from "../entities/Account";
import { Transaction } from "../entities/Transaction";

type TransactionRequest = {
  user_id: string;
  account_id: string;
  value: number;
  description: string;
}

/* async function manageAccauntBalance(account_id: string, value: number) {
  const accountRepository = AppDataSource.getRepository(Account);

  const getAccountBalance = accountRepository.findBy({ id: account_id });

  if (value < 0 && (getAccountBalance[0].balance - value) > 0) {
    const decrementBalance = getAccountBalance[0].balance - value;
    await accountRepository.save({
      balance: decrementBalance
    })
  }

  if (value < 0 && (getAccountBalance[0].balance - value) < 0) {
    return new Error("Saldo insuficiente.");
  }

  await accountRepository.save({
    balance: getAccountBalance[0].balance + value
  })
} */


export class CreateTransactionService {
  async execute({ user_id, account_id, value, description}: TransactionRequest): Promise<Transaction | Error> {

    const transactionRepository = AppDataSource.getRepository(Transaction);
    const accountRepository = AppDataSource.getRepository(Account);

    const getAccountBalance = await accountRepository.findBy({ id: account_id });

    if (value < 0 && (getAccountBalance[0].balance + value) < 0) {
      return new Error("Saldo insuficiente, conta não pode ficar negativa.");
    }

    if (value < 0 && (getAccountBalance[0].balance + value) > 0) {
      const decrementBalance = getAccountBalance[0].balance + value;
      await accountRepository.update({ id: account_id}, { balance: decrementBalance });
    }

    const createdTransaction = transactionRepository.create({
      user_id,
      account_id,
      value,
      description,
    })

    await accountRepository.update({ id: account_id}, { balance: getAccountBalance[0].balance + value });

    await transactionRepository.save(createdTransaction);

    delete createdTransaction.user_id;
    delete createdTransaction.account_id;

    return createdTransaction;
  }
}