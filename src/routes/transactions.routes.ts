import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import ListTransactionService from '../services/ListTransactionService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const listTransacion = new ListTransactionService();
  const transactions = await listTransacion.execute();

  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  const createTransaction = new CreateTransactionService();
  const { title, type, value, category } = request.body;

  const transaction = await createTransaction.execute({
    title,
    type,
    value,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteTransaction = new DeleteTransactionService();
  await deleteTransaction.execute(id);

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactions = new ImportTransactionsService();

    const transactionsFilename = request.file.filename;

    const transactions = await importTransactions.execute({
      transactionsFilename,
    });

    return response.json(transactions);
  },
);

export default transactionsRouter;
