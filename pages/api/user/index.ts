import { NextApiRequest, NextApiResponse } from 'next';

import * as fromRepository from '../../../repositories/user-repository';
import * as fromValidator from '../../../utils/validations/user-validator';
import { User } from '../../../interfaces/models';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string }>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      await createNewUser(req, res);
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

async function createNewUser(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string }>
): Promise<void> {
  const { identifier } = req.body;

  const payloadValidation = fromValidator.validate(identifier);

  if (!payloadValidation.isValid) {
    res.status(400).json({
      error: payloadValidation.messages.join(', '),
    });

    return;
  }

  const newAccount = await fromRepository.createUser(identifier);
  res.status(200).json(newAccount);
}
