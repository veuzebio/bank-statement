import { NextPage } from 'next';

const Title: NextPage = ({ children }) => {
  return (
    <h1 className="mt-6 text-center text-3xl font-extrabold text-indigo-600">
      {children}
    </h1>
  );
};

export default Title;
