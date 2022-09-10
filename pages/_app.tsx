import "../styles/globals.css";
import type { AppProps } from "next/app";
// https://next-auth.js.org/getting-started/example#configure-shared-session-state
function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
