"use client";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { NotificationsProvider } from "@mantine/notifications";
function MyApp({ children }) {
  return (
    <html lang="en">
      <body>
      <Layout>
        <NotificationsProvider position="top-center">
          {children}
        </NotificationsProvider>
      </Layout>
    </body>
    </html>
  );
}

export default MyApp;
