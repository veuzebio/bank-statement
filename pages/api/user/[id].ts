import { NextApiRequest, NextApiResponse } from 'next';

import * as fromRepository from '../../../backend/repositories/user-repository';
import { User } from '../../../interfaces/models';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string }>
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      await findUserById(req, res);
      break;

    case 'PUT':
      await openUserAccount(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

async function findUserById(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string }>
): Promise<void> {
  const {
    query: { id },
  } = req;

  if (!id) {
    res.status(400).json({
      error: `Missing ID param`,
    });

    return;
  }

  const user = await fromRepository.getUserById(id as string);

  if (!user) {
    res.status(404).json({
      error: `User not found`,
    });

    return;
  }

  res.status(200).json(user);
}

async function openUserAccount(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string }>
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

  const { name, openingBalance } = req.body;

  const user: User = {
    identifier: identifier as string,
    name: name,
    account: { balance: openingBalance },
  };

  await fromRepository.updateUser(user);

  if (!user) {
    res.status(404).json({
      error: `User not found`,
    });

    return;
  }

  res.status(200).end();
}
