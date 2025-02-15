'use client'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import React from 'react';

export const config = getDefaultConfig({
    appName: 'Suprabhat_Mitro',
    projectId: process.env.APP_ID || 'default_project_id',
    chains: [sepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

export const queryClient = new QueryClient();

export default ({children}:{children : React.ReactNode}) => {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  };  