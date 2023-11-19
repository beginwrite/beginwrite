import type { AppType } from 'next/app';
import Apollo from "./_apollo"

const App: AppType = ({
  Component,
  pageProps,
}) => {
  return (
    <Apollo>
      <Component {...pageProps} />
    </Apollo>
  )
}

export default App;
