import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '../../../frontend/components/button';
import InputText from '../../../frontend/components/input-text';
import { useAccountContext } from '../../../frontend/utils/contexts/account';
import * as service from '../../../frontend/services/account';

const EnterAccountPage: NextPage = () => {
  const [identifier, setIdentifier] = useState('');
  const { storeAccount } = useAccountContext();
  const router = useRouter();

  async function enterAccount() {
    const account = await service.getByIdentifier(identifier);

    storeAccount(account);
    router.push(`/account/view`);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-xl w-full">
        <InputText
          label="Identifier"
          value={identifier}
          valueChange={setIdentifier}
        ></InputText>
        <Button
          label="Enter"
          buttonClick={enterAccount}
          disabled={!identifier.length}
        ></Button>
      </div>
    </div>
  );
};

export default EnterAccountPage;
