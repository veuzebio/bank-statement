import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '../../frontend/components/button';
import InputText from '../../frontend/components/input-text';
import { useAccountContext } from '../../frontend/utils/contexts/account';
import * as service from '../../frontend/services/account';

const AccountPage: NextPage = () => {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const { storeAccount } = useAccountContext();
  const router = useRouter();

  async function createNewAccount() {
    const account = await service.create({
      name,
      identifier,
      birthDate: new Date('1990-10-10'),
    });

    storeAccount(account);

    router.push(`/account/view`);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-xl w-full">
        <InputText label="Name" value={name} valueChange={setName}></InputText>
        <InputText
          label="Identifier"
          value={identifier}
          valueChange={setIdentifier}
        ></InputText>
        <InputText
          label="Date of Birth"
          value="10/10/1990"
          valueChange={() => null}
          disabled={true}
        ></InputText>
        <Button
          label="Create Account"
          buttonClick={createNewAccount}
          disabled={!name.length || !identifier.length}
        ></Button>
      </div>
    </div>
  );
};

export default AccountPage;
