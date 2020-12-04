import '../styles/main.css';
import { AppProps } from 'next/app';

import Nav from '../frontend/components/nav';
import { AccountProvider } from '../frontend/utils/contexts/account';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css"
        integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM="
        crossOrigin="anonymous"
      />
      <div className="relative bg-gray-50 min-h-screen">
        <AccountProvider>
          <Nav
            links={[
              { name: 'Home', address: '/' },
              { name: 'Create Account', address: '/account' },
              {
                name: 'View Account',
                address: '/account/view',
                validAuth: true,
              },
              {
                name: 'Account History',
                address: '/account/history',
                validAuth: true,
              },
              { name: 'Transaction', address: '/transaction', validAuth: true },
            ]}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Component {...pageProps} />
          </div>
        </AccountProvider>
      </div>
    </>
  );
}

export default MyApp;
