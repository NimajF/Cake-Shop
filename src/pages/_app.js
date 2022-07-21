import { SessionProvider } from "next-auth/react";
import { DataProvider } from "../store/GlobalState";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </SessionProvider>
  );
}

export default MyApp;
