import React, { ReactNode } from "react";
import { Config, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, midnightTheme as rainbowDarkTheme } from "@rainbow-me/rainbowkit";
import { XellarKitProvider, defaultConfig, darkTheme } from "@xellar/kit";

import "@rainbow-me/rainbowkit/styles.css";

const customRainbowTheme = rainbowDarkTheme({
  accentColor: '#808080', 
  accentColorForeground: 'white', 
  borderRadius: 'medium',
});

const config = defaultConfig({
  appName: "Telepathia-AI",
  walletConnectProjectId: "YOUR_WALLET_CONNECT_PROJECT_ID",
  xellarAppId: "YOUR_XELLAR_APP_ID",
  xellarEnv: "sandbox",
  ssr: true,
}) as Config;

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customRainbowTheme}>
          <XellarKitProvider
            theme={darkTheme}
            googleClientId="YOUR_GOOGLE_CLIENT_ID"
            telegramConfig={{
              botId: "YOUR_TELEGRAM_BOT_ID",
              botUsername: "YOUR_TELEGRAM_BOT_USERNAME",
            }}
            appleLoginConfig={{
              clientId: "YOUR_APPLE_CLIENT_ID",
              redirectUri: "YOUR_REDIRECT_URI",
            }}
            enableWhatsappLogin={true}
          >
            {children}
          </XellarKitProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};