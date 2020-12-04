import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../../../frontend/components/loading';
import Timeline from '../../../frontend/components/timeline';
import api from '../../../frontend/utils/api';
import { useAccountContext } from '../../../frontend/utils/contexts/account';

const AccountHistoryPage: NextPage = () => {
  const [events, setEvents] = useState<any[]>(null);
  const { account } = useAccountContext();
  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.replace('/account');
      return;
    }

    async function fetchEvents(accountId) {
      const { data } = await api.get<any[]>(`bank-account/events/${accountId}`);

      setEvents(mapToTimelineEvent(data));
    }

    fetchEvents(account._id);
  }, []);

  function mapToTimelineEvent(data: any[]) {
    function formatDateTime(timestamp: string): string {
      const datetime = new Date(timestamp);
      return (
        datetime.getDate() +
        '/' +
        (datetime.getMonth() + 1) +
        '/' +
        datetime.getFullYear()
      );
    }

    return data.map((item) => {
      return {
        id: item._id,
        date: formatDateTime(item.timestamp),
        name: item.name,
        obj: item.data,
      };
    });
  }

  if (!events) return <Loading></Loading>;

  return <Timeline events={events}></Timeline>;
};

export default AccountHistoryPage;
