import { NextPage } from 'next';

export interface ListItem {
  key: string | number;
  title: string;
  description?: string;
  observation?: string;
}

interface ListProps {
  itens: ListItem[];
}

const List: NextPage<ListProps> = ({ itens }) => {
  return (
    <div className="py-2 grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4">
      {itens?.map((item) => (
        <>
          <div
            key={item.key}
            className="col-span-4 sm:col-span-5 xl:col-span-5"
          >
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="text-gray-500">{item.description}</p>
          </div>
          <div className="col-span-2 sm:col-span-1 xl:col-span-1 italic text-right">
            {item.observation}
          </div>
        </>
      ))}
    </div>
  );
};

export default List;
