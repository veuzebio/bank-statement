import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Loading from '../../../frontend/components/loading';
import Timeline from '../../../frontend/components/timeline';
import { useAccountContext } from '../../../frontend/utils/contexts/account';
import * as service from '../../../frontend/services/account';
import { DataEvent } from '../../../frontend/models';

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
      const events = await service.getEventList(accountId);

      setEvents(mapToTimelineEvent(events));
    }

    fetchEvents(account._id);
  }, []);

  function mapToTimelineEvent(data: DataEvent[]) {
    function formatDateTime(timestamp: string | Date): string {
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
