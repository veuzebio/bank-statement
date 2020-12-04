import { NextPage } from 'next';

interface GridProps {
  title: string;
  data: { [key: string]: any };
}

const Grid: NextPage<GridProps> = ({ title, data }) => {
  const keys = Object.keys(data);

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg my-5">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-indigo-600">
            {title}
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {keys.map((key) => (
              <div key={key} className="px-4 py-5 sm:grid sm:grid-cols-3">
                <dt className="text-sm font-medium text-gray-900">
                  {key.toUpperCase()}
                </dt>
                <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
                  {data[key]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
};

export default Grid;
