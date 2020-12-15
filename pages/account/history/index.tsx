import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import Loading from '../../../frontend/components/loading';
import Timeline, { TimelineEvent } from '../../../frontend/components/timeline';
import { useAccountContext } from '../../../frontend/utils/contexts/account';
import { DataEvent } from '../../../frontend/models';
import * as service from '../../../frontend/services/account';
import * as dateFormatter from '../../../frontend/utils/formatters/datetime';

const AccountHistoryPage: NextPage = () => {
  const [events, setEvents] = useState<TimelineEvent[]>(null);
  const { account } = useAccountContext();

  useEffect(() => {
    async function fetchEvents(accountId) {
      const events = await service.getEventList(accountId);

      setEvents(mapToTimelineEvent(events));
    }

    fetchEvents(account._id);
  }, []);

  function mapToTimelineEvent(data: DataEvent[]) {
    return data.map((item) => {
      return {
        id: item._id,
        date: dateFormatter.format(item.timestamp),
        name: item.name,
        obj: item.data,
      };
    });
  }

  if (!events) return <Loading></Loading>;

  return <Timeline events={events}></Timeline>;
};

export default AccountHistoryPage;
