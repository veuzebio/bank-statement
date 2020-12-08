import { NextApiRequest, NextApiResponse } from 'next';

import * as service from '../../../../backend/services/bank-account/service';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    switch (req.method) {
      case 'GET':
        await findBankAccount(req, res);
        break;

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    const { message } = error as Error;
    res.status(400).json({ message });
  }
};

async function findBankAccount(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    query: { identifier },
  } = req;

  const bankAccount = await service.findByIdentifier(identifier as string);

  res.status(200).json(bankAccount.state);
}
