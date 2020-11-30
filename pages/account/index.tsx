import { NextPage } from 'next';

import CreateAccount from '../../components/create-account';
import { useUserContext } from '../../utils/contexts/user-context';
import { useCurrency } from '../../utils/hooks';

const AccountPage: NextPage = () => {
  const { user, loaded } = useUserContext();

  return (
    <>
      {loaded && (
        <>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome!
          </h1>
          {user && (
            <>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg my-5">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Personal Information
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.name}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              {user.account && (
                <>
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Account
                      </h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Balance
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {useCurrency(user.account.balance)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AccountPage;
