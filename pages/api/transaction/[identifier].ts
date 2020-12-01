import { NextApiRequest, NextApiResponse } from 'next';
import { Transaction } from '../../../interfaces/models/Transaction';

import * as fromRepository from '../../../backend/repositories/transaction-repository';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Transaction | Transaction[] | { error: string }>
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await getTransactionsByIdentifier(req, res);
      break;

    case 'POST':
      await createNewTransaction(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

async function getTransactionsByIdentifier(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[] | { error: string }>
): Promise<void> {
  const {
    query: { identifier },
  } = req;

  if (!identifier) {
    res.status(400).json({
      error: `Missing IDENTIFIER param`,
    });

    return;
  }

  const transactions = await fromRepository.getTransactionsByIdentifier(
    identifier as string
  );

  res.status(200).json(transactions);
}

async function createNewTransaction(
  req: NextApiRequest,
  res: NextApiResponse<Transaction | { error: string }>
): Promise<void> {
  const {
    query: { identifier },
  } = req;

  if (!identifier) {
    res.status(400).json({
      error: `Missing IDENTIFIER param`,
    });

    return;
  }

  const { value } = req.body;

  const createTransactionPayload: Transaction = {
    userIdentifier: identifier as string,
    value: value as number,
  };

  const newTransaction = await fromRepository.createTransaction(
    createTransactionPayload
  );

  res.status(200).json(newTransaction);
}
