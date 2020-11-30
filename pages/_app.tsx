import '../styles/main.css';
import { AppProps } from 'next/app';

import Nav from '../components/nav';
import { AuthProvider } from '../utils/contexts/auth-context';
import { UserProvider } from '../utils/contexts/user-context';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AuthProvider>
          <UserProvider>
            <Nav />
            <Component {...pageProps} />
          </UserProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default MyApp;
