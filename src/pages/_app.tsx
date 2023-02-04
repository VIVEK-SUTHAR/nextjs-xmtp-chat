import WalletContextProvider from "@/context/WalletContext";
import XMTPContextProvider from "@/context/XmtpContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WalletContextProvider>
        <XMTPContextProvider>
          <Component {...pageProps} />
        </XMTPContextProvider>
      </WalletContextProvider>
    </ChakraProvider>
  );
}
