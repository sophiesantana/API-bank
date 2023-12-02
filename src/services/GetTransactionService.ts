import { ILike, LessThan, MoreThan } from "typeorm";
import AppDataSource from "../database/connection";
import { Transaction, } from "../entities/Transaction";


export class GetTransactionService {
  async execute(account_id: string, type?: string, search?: string): Promise<Transaction[] | Error> {
    const transactionRepository = AppDataSource.getRepository(Transaction);

    let getAllTransactionsResult: Transaction[];

    if (!type || !search) {
      getAllTransactionsResult = await transactionRepository.findBy({ account_id });
    }

    if (type) {
      if (type === 'credit') {
        getAllTransactionsResult = await transactionRepository.find({
          where: {
            account_id,
            value: LessThan(0)
          }
        });
      } else if (type === 'debit') {
        getAllTransactionsResult = await transactionRepository.find({
          where: {
            account_id,
            value: MoreThan(0)
          }
        });
      } else {
        return new Error("O type deve ser apenas 'credit' ou 'debit'.")
      }
    }

    if (search) {
      getAllTransactionsResult = await transactionRepository.find({
        where: {
          account_id,
          description: ILike(`%${search}%`)
        }
      });
    }
    
    const formatResult = getAllTransactionsResult.map((transaction): Transaction => {
      return {
        'id': transaction.id,
        'value': transaction.value,
        'description': transaction.description,
        'created_at': transaction.created_at,
        'updated_at': transaction.updated_at
      }
    })

    return formatResult;
  }
}