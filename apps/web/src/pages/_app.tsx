import Apollo from './_apollo';
import Auth from './_auth';

import type { AppType } from 'next/app';

import '../styles/globals.css';

const App: AppType = ({ Component, pageProps }) => {
  return (
    <Apollo>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Apollo>
  );
};

export default App;
