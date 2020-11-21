import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import * as fromRepository from '../../../repositories/account-repository';
import {
  ErrorApiResponse,
  SuccessApiResponse,
} from '../../../interfaces/api-responses';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessApiResponse | ErrorApiResponse>
): Promise<void> => {
  await authValidate(req, res);

  switch (req.method) {
    case 'GET':
      await findAccountByName(req, res);
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

async function findAccountByName(
  req: NextApiRequest,
  res: NextApiResponse<SuccessApiResponse | ErrorApiResponse>
): Promise<void> {
  const {
    query: { name },
  } = req;

  if (!name) {
    res.status(400).json({
      error: `Missing Account Name`,
    } as ErrorApiResponse);

    return;
  }

  const account = await fromRepository.findAccountByName(name as string);

  if (!account) {
    res.status(404).json({
      error: `Account not found`,
    } as ErrorApiResponse);

    return;
  }

  res.status(200).json({ data: account });
}
