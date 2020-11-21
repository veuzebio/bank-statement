import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import * as fromRepository from '../../../repositories/account-repository';
import { Account } from '../../../interfaces/models';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Account | { error: string }>
): Promise<void> => {
  //await authValidate(req, res);

  switch (req.method) {
    case 'GET':
      await findAccountByEmail(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

async function authValidate(
  req: NextApiRequest,
  res: NextApiResponse<SuccessApiResponse | ErrorApiResponse>
) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({
      error: 'Authentication error',
    } as ErrorApiResponse);

    return;
  }
}

async function findAccountByEmail(
  req: NextApiRequest,
  res: NextApiResponse<Account | { error: string }>
): Promise<void> {
  const {
    query: { email },
  } = req;

  if (!email) {
    res.status(400).json({
      error: `Missing EMAIL param`,
    });

    return;
  }

  const account = await fromRepository.findAccountByEmail(email as string);

  if (!account) {
    res.status(404).json({
      error: `Account not found`,
    });

    return;
  }

  res.status(200).json(account);
}
