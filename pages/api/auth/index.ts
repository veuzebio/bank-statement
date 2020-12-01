import { NextApiRequest, NextApiResponse } from 'next';

import * as fromRepository from '../../../backend/repositories/user-repository';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      await getUserId(req, res);
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

async function getUserId(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
): Promise<void> {
  const { identifier } = req.body;

  if (!identifier) {
    res.status(400).json({
      error: `Missing IDENTIFIER param`,
    });

    return;
  }

  const { _id } = await fromRepository.getUserByIdentifier(identifier);

  res.status(200).json(_id);
}
