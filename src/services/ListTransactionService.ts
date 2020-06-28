import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionResponse {
  transactions: Array<Transaction>;
  balance: Balance;
}

class ListTransactionService {
  private transactionsRepository = getCustomRepository(TransactionsRepository);

  public async execute(): Promise<TransactionResponse> {
    const transactions = await this.transactionsRepository.find();
    const balance = await this.transactionsRepository.getBalance();

    return { transactions, balance };
  }
}

export default ListTransactionService;
