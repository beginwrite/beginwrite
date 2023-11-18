import { AppProps } from "next/app"
import Apollo from "./_apollo"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Apollo>
      <Component {...pageProps} />
    </Apollo>
  )
}
