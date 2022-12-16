import { SessionProvider } from "next-auth/react";
import { DataProvider } from "../store/GlobalState";
import "../styles/globals.css";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </SessionProvider>
  );
}

export default MyApp;
