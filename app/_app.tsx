import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { NotificationsProvider } from "@mantine/notifications";
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Layout>
        <NotificationsProvider position="top-center">
          <Component {...pageProps}></Component>
        </NotificationsProvider>
      </Layout>
  );
}

export default MyApp;
