import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../../../frontend/components/button';

import Grid from '../../../frontend/components/grid';
import Loading from '../../../frontend/components/loading';
import api from '../../../frontend/utils/api';

const ViewAccountPage: NextPage = () => {
  const [account, setAccount] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('account'));

    if (!data) {
      router.replace('/account');
      return;
    }

    setAccount({
      id: data._id,
      identifier: data.userIdentifier,
      name: data.userName,
      birth: data.userBirthDate,
      creation: data.createdAt,
      deactivation: data.deactivatedAt,
      balance: data.balance,
    });
  }, []);

  async function handleClick() {
    const { data } = await api.delete(`/bank-account/${account.id}`);

    localStorage.setItem('account', JSON.stringify(data));

    setAccount({
      id: data._id,
      identifier: data.userIdentifier,
      name: data.userName,
      birth: data.userBirthDate,
      creation: data.createdAt,
      deactivation: data.deactivatedAt,
      balance: data.balance,
    });
  }

  if (!account) return <Loading></Loading>;

  return (
    <>
      <Grid title="Personal Information" data={account}></Grid>
      <Button
        label="Deactivate Account"
        buttonClick={handleClick}
        disabled={!!account.deactivatedAt}
      ></Button>
    </>
  );
};

export default ViewAccountPage;
