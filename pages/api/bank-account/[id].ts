import { NextApiRequest, NextApiResponse } from 'next';

import * as service from '../../../backend/services/bank-account/service';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    switch (req.method) {
      case 'DELETE':
        await deactivateBankAccount(req, res);
        break;

      case 'GET':
        await findBankAccount(req, res);
        break;

      case 'PUT':
        await makeTransaction(req, res);
        break;

      default:
        res.setHeader('Allow', ['DELETE', 'GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message });
  }
};

async function makeTransaction(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    query: { id },
  } = req;

  const { value } = req.body;

  const bankAccount = await service.makeTransaction(id as string, value);

  res.status(200).json(bankAccount.state);
}

async function deactivateBankAccount(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    query: { id },
  } = req;

  const bankAccount = await service.deactivate(id as string);

  res.status(200).json(bankAccount.state);
}

async function findBankAccount(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    query: { id },
  } = req;

  const bankAccount = await service.findById(id as string);

  res.status(200).json(bankAccount.state);
}
