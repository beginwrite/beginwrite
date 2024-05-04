import Apollo from './_apollo';

import type { AppType } from 'next/app';

const App: AppType = ({ Component, pageProps }) => {
  return (
    <Apollo>
      <Component {...pageProps} />
    </Apollo>
  );
};

export default App;
