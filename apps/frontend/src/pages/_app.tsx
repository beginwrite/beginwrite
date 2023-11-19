import type { AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import Apollo from "./_apollo"

const App: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <Apollo>
        <Component {...pageProps} />
      </Apollo>
    </SessionProvider>
  )
}

export default App;
