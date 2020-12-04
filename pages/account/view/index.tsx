import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Button from '../../../frontend/components/button';

import Grid from '../../../frontend/components/grid';
import Loading from '../../../frontend/components/loading';
import { useAccountContext } from '../../../frontend/utils/contexts/account';
import * as service from '../../../frontend/services/account';

const ViewAccountPage: NextPage = () => {
  const [view, setView] = useState(null);
  const { account, storeAccount } = useAccountContext();

  useEffect(() => {
    setView(mapToView(account));
  }, []);

  async function deactivateAccount() {
    const data = await service.deactivate(view.id);

    storeAccount(data);

    setView(mapToView(data));
  }

  function mapToView(data: any) {
    return {
      id: data._id,
      identifier: data.userIdentifier,
      name: data.userName,
      birth: data.userBirthDate,
      creation: data.createdAt,
      deactivation: data.deactivatedAt,
      balance: data.balance,
    };
  }

  if (!view) return <Loading></Loading>;

  return (
    <>
      <Grid title="Personal Information" data={view}></Grid>
      <Button
        label="Deactivate Account"
        buttonClick={deactivateAccount}
        disabled={!!account.deactivatedAt}
      ></Button>
    </>
  );
};

export default ViewAccountPage;
