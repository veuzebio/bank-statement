import { NextApiRequest, NextApiResponse } from 'next';

import * as service from '../../../../backend/services/bank-account/service';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await findBankAccountEvents(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

async function findBankAccountEvents(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    query: { id },
  } = req;

  const bankAccount = await service.find(id as string);

  res.status(200).json(bankAccount.events);
}
