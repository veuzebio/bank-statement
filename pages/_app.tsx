import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import Nav from '../components/nav';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider session={pageProps.session}>
      <Nav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
