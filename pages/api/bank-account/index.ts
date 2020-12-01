import { NextApiRequest, NextApiResponse } from 'next';

import * as service from '../../../backend/services/bank-account/service';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      await createBankAccount(req, res);
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

async function createBankAccount(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const bankAccount = await service.create(req.body);

  res
    .status(200)
    .json({ state: bankAccount.state, events: bankAccount.events });
}
