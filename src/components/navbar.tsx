"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect} from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const Navbar = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
    
  useEffect(() => {
    if (isConnected) {
      Cookies.set('wallet-connected', 'true', { expires: 1 });
    } else {
      Cookies.remove('wallet-connected');
      if (window.location.pathname.startsWith('/chatting')) {
        router.push('/');
      }
    }
  }, [isConnected, router]);

  return (
    <nav className="bg-black border-white fixed w-full z-20 top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Telepathia AI
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="hidden md:block">
            <ConnectButton 
              showBalance={false}
              accountStatus="address"
              chainStatus="icon"
              label="Connect Wallet"
            />
         </div>
        </div>
      </div>
    </nav>
  );
};