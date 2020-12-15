import { NextPage } from 'next';

export interface TimelineEvent {
  id: string;
  name: string;
  date: Date | string;
  obj: { [key: string]: any };
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: NextPage<TimelineProps> = ({ events }) => {
  return (
    <div className="relative w-1/2 m-8">
      <div className="border-r-2 border-dotted border-indigo-600 absolute h-full top-0 left-4"></div>
      <ul className="list-none m-0 p-0 z-10">
        {events?.map((event) => (
          <li key={event.id} className="mb-2">
            <div className="flex items-center mb-1">
              <div className="bg-indigo-600 rounded-full h-8 w-8"></div>
              <div className="flex-1 ml-4 font-medium">
                <span className="text-indigo-600 mr-5">{event.date}</span>
                <span className="text-gray-900">{event.name}</span>
              </div>
            </div>
            <div className="ml-12">{JSON.stringify(event.obj)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
