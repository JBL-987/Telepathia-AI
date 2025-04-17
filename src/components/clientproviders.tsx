'use client';
import React from 'react';
import { Web3Provider } from "@/config/web3provider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      {children}
    </Web3Provider>
  );
}