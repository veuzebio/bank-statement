import '../styles/main.css';
import { AppProps } from 'next/app';

import Nav from '../frontend/components/nav';
import PopupMessage from '../frontend/components/popup-message';
import { AccountProvider } from '../frontend/utils/contexts/account';
import { MessageProvider } from '../frontend/utils/contexts/message';

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
          <MessageProvider>
            <Nav
              links={[
                { name: 'Home', address: '/' },
                { name: 'Create Account', address: '/account' },
                { name: 'Enter Account', address: '/account/enter' },
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
                {
                  name: 'Transaction',
                  address: '/transaction',
                  validAuth: true,
                },
              ]}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <Component {...pageProps} />
              <PopupMessage></PopupMessage>
            </div>
          </MessageProvider>
        </AccountProvider>
      </div>
    </>
  );
}

export default MyApp;
