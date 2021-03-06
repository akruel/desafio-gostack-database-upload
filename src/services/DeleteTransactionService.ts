// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const findTransaction = await transactionsRepository.findOne(id);

    if (findTransaction) {
      await transactionsRepository.remove(findTransaction);
    } else {
      throw new AppError('Transaction not found.', 404);
    }
  }
}

export default DeleteTransactionService;
