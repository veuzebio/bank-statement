import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <div>
      <div className="text-center py-32">
        <div className="text-6xl font-bold text-gray-900 leading-none">
          Welcome!
        </div>
        <div className="mt-6 text-xl text-gray-500 antialiased">
          This is a study application for Event Sourcing and Event Modeling
        </div>
      </div>
    </div>
  );
};

export default HomePage;
