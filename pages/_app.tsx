import { AppProps } from 'next/app';

import Nav from '../components/nav';
import { AuthProvider } from '../utils/contexts/auth-context';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Nav />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
